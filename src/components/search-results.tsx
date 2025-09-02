"use client";

import { useState, useEffect } from "react";
import { Genre } from "@/lib/types";
import api from "@/lib/api";
import Link from "next/link";

const SearchResults = () => {
  const [data, setData] = useState<{ genres: Genre[] }>({ genres: [] });
  const [loader, setLoader] = useState(true);

  const GenreUrl = async () => {
    try {
      setLoader(true);
      const resdata = await api.getGenres();
      setData(resdata);
    } catch (error) {
      console.error("Error fetching genre data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    GenreUrl();
  }, []);

  return (
    <div className="flex md:w-[550px] md:h-[320px] overflow-scroll sm:w-[350px] sm:h-[520px] absolute bg-white flex-col shadow-2xl items-start gap-4 rounded-2xl z-50">
      <div id="genre-title" className="flex flex-col  h-[80px] p-5">
        <h1 className=" flex font-bold text-2xl">Genres</h1>
        <h4 className=" flex  ">See lists of movies by genre</h4>
      </div>
      <p className=" flex  bg-gray-200 sm:w-[330px] md:w-[530px] h-[1px] ml-2 "></p>
      {loader ? (
        <div className=" flex justify-center items-center flex-col pt-15 pl-30">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          id="genres"
          className="flex flex-wrap gap-2 justify-start items-start  h-[400px]  p-2"
        >
          {data.genres.map((genre) => (
            <Link
              href={`/genre/${genre.id}`}
              key={genre.id}
              className="border flex border-gray-300 rounded-2xl  h-7 p-1 hover:bg-gray-50"
            >
              <button className="flex font-bold  text-sm items-center gap-1 p-2">
                {genre.name}
                <img
                  src="/images/right-arrow.svg"
                  alt=""
                  className=" flex w-3 h-3 justify-center items-center"
                />
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
