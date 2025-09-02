"use client";
import { useState } from "react";
import { Video } from "@/lib/types";
import TrailerModal from "./TrailerModal";

type TrailerButtonProps = {
  trailer: Video;
  movieTitle: string;
};

const TrailerButton = ({ trailer, movieTitle }: TrailerButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg hover:opacity-90"
        style={{ backgroundColor: "#4338CA" }}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
        Play Trailer
      </button>

      <TrailerModal
        trailer={trailer}
        movieTitle={movieTitle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TrailerButton;
