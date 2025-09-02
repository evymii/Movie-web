"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchResults from "../search-results";
import SearchResultsModal from "../SearchResultsModal";

const Navigation = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const router = useRouter();
  const genresRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleToggleGenres = () => {
    setShowGenres((prev) => !prev);
  };

  const handleSearchInputToggle = () => {
    setShowInput((prev) => !prev);
    if (showInput) {
      setShowSearchModal(false);
      setSearchQuery("");
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchModal(value.trim() !== "");
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowSearchModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genresRef.current &&
        !genresRef.current.contains(event.target as Node)
      ) {
        setShowGenres(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchModal(false);
      }
    };

    if (showGenres || showSearchModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGenres, showSearchModal]);
  return (
    <div className="flex flex-row bg-white h-16 sm:w-[] md:w-full p-4 items-center justify-between shadow-md">
      <Link href="/" className="flex justify-start">
        <img src="/images/Logo.png" className="flex w-24 h-6" alt="Logo" />
      </Link>

      <div className=" md:flex justify-center  gap-2  hidden ">
        <button
          type="button"
          onClick={handleToggleGenres}
          className="flex gap-3 flex-row items-center border border-gray-300 w-[120px] justify-center rounded-lg px-4 h-10 hover:bg-gray-50"
        >
          <img
            src="/images/down.png"
            className="w-5 h-5 rounded justify-center items-center"
          />
          <span className="font-medium">Genre</span>
        </button>
        <div className="flex-row flex w-[350px] border border-gray-300 rounded-lg items-center gap-2 px-3 h-10">
          <button
            type="button"
            onClick={handleSearch}
            className="w-6 h-6 flex rounded justify-center items-center hover:bg-gray-100"
          >
            <img
              src="/images/Search.png"
              className="flex w-4 h-4 justify-center items-center"
              alt="Search"
            />
          </button>

          <input
            type="text"
            placeholder="Search ..."
            className="flex-1 px-2 py-1 text-base"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      </div>

      <div className=" flex justify-end gap-2">
        <button
          type="button"
          onClick={handleSearchInputToggle}
          className="w-10 h-10 md:hidden border border-gray-300 rounded-lg justify-center items-center flex hover:bg-gray-100"
        >
          <img src="/images/Search.png" className="flex w-4 h-4" alt="Search" />
        </button>
        {showInput && (
          <input
            type="text"
            placeholder="Search ..."
            className="border border-gray-300 rounded-lg w-full px-3 py-2 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        )}

        <button className="w-10 h-10 flex border border-gray-300 rounded-lg justify-center items-center hover:bg-gray-100">
          <img
            src="/images/moon.png"
            className="flex w-4 h-4"
            alt="Theme Toggle"
          />
        </button>
      </div>

      <div
        className="flex absolute md:w-[550px] md:mt-[40] justify-center mt-26 sm:w-[350px] z-50"
        ref={genresRef}
      >
        <div className="flex absolute">{showGenres && <SearchResults />}</div>
      </div>

      <div
        className="flex absolute top-20 left-1/2 transform -translate-x-[175px] z-50"
        ref={searchRef}
      >
        <div className="flex absolute">
          {showSearchModal && (
            <SearchResultsModal
              query={searchQuery}
              onClose={() => setShowSearchModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
