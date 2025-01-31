import { useState } from "react";
import { FaSearch, FaPlay } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  const featuredPlaylists = [
    { id: 1, title: "Top Hits 2024", image: "https://picsum.photos/260/260" },
    { id: 2, title: "Mood Boosters", image: "https://picsum.photos/270/270" },
    { id: 3, title: "Chill Vibes", image: "https://picsum.photos/380/380" },
    { id: 4, title: "Workout Energy", image: "https://picsum.photos/290/290" },
    { id: 5, title: "Focus Flow", image: "https://picsum.photos/300/300" },
  ];
  const TrendingPlaylists = [
    { id: 1, title: "Top Hits 2024", image: "https://picsum.photos/220/220" },
    { id: 2, title: "Mood Boosters", image: "https://picsum.photos/210/210" },
    { id: 3, title: "Chill Vibes", image: "https://picsum.photos/250/250" },
    { id: 4, title: "Workout Energy", image: "https://picsum.photos/230/230" },
    { id: 5, title: "Focus Flow", image: "https://picsum.photos/240/240" },
  ];

  return (
    <div className="home-container">
      <div className="search-wrapper">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for songs, artists, or playlists..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <section className="featured-playlists-section">
        <h2 className="section-title">Featured Playlists</h2>
        <Slider {...sliderSettings}>
          {featuredPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-item">
              <div className="playlist-image-wrapper">
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="playlist-image"
                />
                <div className="overlay">
                  <button className="play-button">
                    <FaPlay />
                  </button>
                </div>
                <h3 className="playlist-title">{playlist.title}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="trending-section">
        <h2 className="section-title">Trending Now</h2>
        <Slider {...sliderSettings}>
          {TrendingPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-item">
              <div className="playlist-image-wrapper">
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="playlist-image"
                />
                <div className="overlay">
                  <button className="play-button">
                    <FaPlay />
                  </button>
                </div>
                <h3 className="playlist-title">{playlist.title}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}

export default Home;
