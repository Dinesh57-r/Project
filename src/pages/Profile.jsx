import { useEffect, useState } from "react";
import { FaPlay, FaPause, FaPlus, FaTrash, FaPlusCircle,FaTimes} from "react-icons/fa";
import { MdMood } from "react-icons/md";
import axios from "axios";
import "./Profile.css";

function Profile({ user, setUser }) {
  const [currentMood, setCurrentMood] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playingSongUrl, setPlayingSongUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState("");
  const [selectedPlaylistForSong, setSelectedPlaylistForSong] = useState("");

  useEffect(() => {
    fetchSpotifyToken();
    fetchPlaylists();
  }, [user.username]);

  // Fetch OAuth Token for Spotify API
  const fetchSpotifyToken = async () => {
    try {
      const clientId = "4c137135730b4311bb2b84cabe85789c";
      const clientSecret = "52c240d789b24c28a3aaa3d283d93564";
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setSpotifyToken(response.data.access_token);
    } catch (error) {
      console.error("Error fetching Spotify token:", error);
    }
  };

  // Fetch Playlists from Database
  const fetchPlaylists = async () => {
    if (!user.username) return;
    try {
      const response = await fetch(
        `https://tunesphere-backend-1.onrender.com/playlist/${user.username}`
      );
      if (!response.ok) throw new Error("Failed to fetch playlists");

      const data = await response.json();
      setPlaylists(data.playlists || []);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  // Search Songs using Spotify API
  const searchSpotifySongs = async () => {
    if (!searchQuery) return;
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?type=track&limit=5&q=${searchQuery}`,
        {
          headers: { Authorization: `Bearer ${spotifyToken}` },
        }
      );
      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.error("Error searching Spotify:", error);
    }
  };

  // Create a New Playlist
  const handleCreatePlaylist = async () => {
    if (!newPlaylistName) return alert("Enter a playlist name.");

    try {
      const response = await fetch(
        "https://tunesphere-backend-1.onrender.com/playlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username, playlistName: newPlaylistName }),
        }
      );

      if (!response.ok) throw new Error("Failed to create playlist");
      alert("Playlist created successfully!");

      setPlaylists([...playlists, { name: newPlaylistName, songs: [] }]);
      setNewPlaylistName("");
      setIsCreatingPlaylist(false);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };
//delete Playlist
  const handleDeletePlaylist = async (playlistName) => {
    try {
      await fetch(
        `https://tunesphere-backend-1.onrender.com/playlist/${user.username}/${playlistName}`,
        { method: "DELETE" }
      );

      alert("Playlist deleted successfully!");
      setPlaylists(playlists.filter((playlist) => playlist.name !== playlistName));
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  // Add a Song to a Playlist
  const handleAddSong = async (playlistName, song) => {
    try {
      const response = await fetch(
        `https://tunesphere-backend-1.onrender.com/playlist/${user.username}/${playlistName}/songs`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: song.name, url: song.external_urls.spotify }),
        }
      );

      if (!response.ok) throw new Error("Failed to add song");
      alert("Song added successfully!");

      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.name === playlistName
            ? { ...playlist, songs: [...playlist.songs, { title: song.name, url: song.external_urls.spotify }] }
            : playlist
        )
      );
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  // Delete a Song from Playlist
  const handleDeleteSong = async (playlistName, songTitle) => {
    try {
      await fetch(
        `https://tunesphere-backend-1.onrender.com/playlist/${user.username}/${playlistName}/songs/${songTitle}`,
        { method: "DELETE" }
      );

      alert("Song deleted successfully!");
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.name === playlistName
            ? { ...playlist, songs: playlist.songs.filter((song) => song.title !== songTitle) }
            : playlist
        )
      );
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };
  const closePlaylistModal = () => {
    setSelectedPlaylist(null);
  };

  return (
    <div className="profile-container">
      <div className="user-details">
        <h2>Welcome, {user.username}</h2>
        <p>Email: {user.email}</p>
      </div>

      <div className="mood-section">
        <h2>Your Mindset Today</h2>
        <MdMood size={40} />
        <p>{currentMood || "Select a mood"}</p>
      </div>

      <div className="playlist-section">
        <h2>Your Playlists</h2>
        <button onClick={() => setIsCreatingPlaylist(!isCreatingPlaylist)}>
          <FaPlus /> Create Playlist
        </button>

        {isCreatingPlaylist && (
          <div className="create-playlist-form">
            <input type="text" placeholder="Enter Playlist Name" value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)} />
            <button onClick={handleCreatePlaylist}>Create</button>
          </div>
        )}

        {playlists.map((playlist) => (
          <div key={playlist.name} className="playlist-card">
            <h3>{playlist.name}</h3>
            <button onClick={() => setSelectedPlaylist(playlist)}>View</button>
            <button onClick={() => handleDeletePlaylist(playlist.name)} className="delete-button">
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>

      {selectedPlaylist && (
        <div className="playlist-modal">
           <button className="close-button" onClick={closePlaylistModal}>
            <FaTimes />
          </button>
          {selectedPlaylist.songs.map((song) => (
            <div key={song.title}>
              <p>{song.title}</p>
              <button onClick={() => handleDeleteSong(selectedPlaylist.name, song.title)}>
                <FaTrash />
              </button>
              <iframe
                src={`https://open.spotify.com/embed/track/${song.url.split('/').pop()}`}
                width="300"
                height="80"
                frameBorder="0"
                allow="encrypted-media"
              ></iframe>
            </div>
          ))}
        </div>
      )}

      <div className="search-section">
        <input type="text" placeholder="Search Spotify" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={searchSpotifySongs}>Search</button>

        {searchResults.map((track) => (
          <div key={track.id}>
            <p>{track.name} - {track.artists[0].name}</p>
            
            <select onChange={(e) => setSelectedPlaylistForSong(e.target.value)}>
              <option value="">Select Playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.name} value={playlist.name}>{playlist.name}</option>
              ))}
            </select>

            <button onClick={() => selectedPlaylistForSong && handleAddSong(selectedPlaylistForSong, track)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
