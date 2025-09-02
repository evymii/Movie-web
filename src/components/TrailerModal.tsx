"use client";
import { Video } from "@/lib/types";

type TrailerModalProps = {
  trailer: Video | undefined;
  movieTitle: string;
  isOpen: boolean;
  onClose: () => void;
};

const TrailerModal = ({
  trailer,
  movieTitle,
  isOpen,
  onClose,
}: TrailerModalProps) => {
  if (!isOpen || !trailer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl mx-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">
              {movieTitle}: {trailer.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
