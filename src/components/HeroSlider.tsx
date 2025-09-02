"use client";
import { useState, useEffect } from "react";
import { Movie } from "@/lib/types";
import Link from "next/link";

type HeroSliderProps = {
  movies: Movie[];
};

const HeroSlider = ({ movies }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (movies?.length || 1));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + (movies?.length || 1)) % (movies?.length || 1)
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || !movies || movies.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, movies]);

  if (!movies || movies.length === 0) {
    return (
      <div
        className="relative h-[600px] overflow-hidden"
        style={{ backgroundColor: "#4338CA" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-white text-xl">No movies available</div>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentSlide];

  const getFallbackImage = (index: number) => {
    // Use slide movie images as backgrounds
    const slideImages = ["/images/slidemov1.jpeg", "/images/slidemov2.webp"];
    return slideImages[index % slideImages.length];
  };

  // Force Feature images to show
  const fallbackImage = getFallbackImage(currentSlide);

  // Force test with direct image path
  const testImage = "/images/slidemov1.jpeg";

  console.log("Hero Slider Debug:", {
    currentSlide,
    movieTitle: currentMovie.title,
    backdropPath: currentMovie.backdrop_path,
    fallbackImage,
    testImage,
    fullImageUrl: `http://localhost:3000${testImage}`,
    backgroundImage: `url("${testImage}")`,
    timestamp: new Date().toISOString(),
  });

  return (
    <div
      className="relative h-[600px] overflow-hidden transition-all duration-1000"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src={`http://localhost:3000${fallbackImage}`}
          alt="Hero Background"
          className="w-full h-full object-cover transition-all duration-1000"
          style={{ zIndex: 0 }}
          onLoad={() =>
            console.log("✅ Image loaded successfully:", fallbackImage)
          }
          onError={(e) =>
            console.log("❌ Image failed to load:", fallbackImage, e)
          }
        />
      </div>

      {/* Overlay Layer - Temporarily removed to test */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-20 z-1"></div> */}

      {/* Content Layer */}
      <div className="relative h-full flex items-center" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="mb-4">
              <span className="text-white text-lg font-medium">
                Now Playing:
              </span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              {currentMovie.title}
            </h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-white text-xl ml-2 font-medium">
                {currentMovie.vote_average.toFixed(1)}/10
              </span>
            </div>
            <p className="text-white text-lg mb-6 leading-relaxed line-clamp-3">
              {currentMovie.overview}
            </p>
            <Link
              href={`/movie/${currentMovie.id}`}
              className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors hover:opacity-90"
              style={{ backgroundColor: "#4338CA" }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Watch Trailer
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-all duration-200"
        style={{
          zIndex: 20,
          backgroundColor: "rgba(67, 56, 202, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-all duration-200"
        style={{
          zIndex: 20,
          backgroundColor: "rgba(67, 56, 202, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
        style={{ zIndex: 20 }}
      >
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-white"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
