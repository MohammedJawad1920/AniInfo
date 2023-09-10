"use client";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useWatchlist } from "../../../context/watchListContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";
import { useAuthPage } from "../../../context/authContext";

const WatchlistPage = () => {
  const { watchlist, isAuthenticated } = useWatchlist();
  const { setLoginPage } = useAuthPage();
  const [selectedCategory, setSelectedCategory] = useState("current");

  useEffect(() => {
    if (!isAuthenticated) {
      setLoginPage(true);
    }
  }, []);

  return (
    <main className="text-white">
      {isAuthenticated && (
        <div className="container space-y-5 p-3">
          <div className="flex items-center gap-1">
            <HeartIcon className="w-5 text-red-500" />
            <h2 className=" text-amber-400 font-bold d:text-lg lg:text-xl">
              Watch List
            </h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              className={`categoryItems ${
                selectedCategory == "current" ? "bg-amber-400" : "bg-white"
              }`}
              onClick={() => setSelectedCategory("current")}
            >
              Current
            </button>
            <button
              className={`categoryItems ${
                selectedCategory == "planning" ? "bg-amber-400" : "bg-white"
              }`}
              onClick={() => setSelectedCategory("planning")}
            >
              Planning
            </button>
            <button
              className={`categoryItems ${
                selectedCategory == "completed" ? "bg-amber-400" : "bg-white"
              }`}
              onClick={() => setSelectedCategory("completed")}
            >
              Completed
            </button>
            <button
              className={`categoryItems ${
                selectedCategory == "dropped" ? "bg-amber-400" : "bg-white"
              }`}
              onClick={() => setSelectedCategory("dropped")}
            >
              Dropped
            </button>
            <button
              className={`categoryItems ${
                selectedCategory == "paused" ? "bg-amber-400" : "bg-white"
              }`}
              onClick={() => setSelectedCategory("paused")}
            >
              Paused
            </button>
          </div>
          <div className="grid items-center grid-cols-2 xs:grid-cols-3  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-7  sm:gap-5">
            {selectedCategory === "current" &&
              watchlist?.current?.map((anime) => (
                <div
                  key={anime?.id}
                  className="min-w-[110px] max-w-[150px] h-48 lg:h-56"
                >
                  <Link href={`/anime/${anime?.id}`}>
                    <Image
                      src={anime?.image}
                      width={400}
                      height={600}
                      className="h-[90%]"
                    />
                    <h3 className="text-xs lg:text-sm line-clamp-2 mt-1">
                      {anime?.title}
                    </h3>
                  </Link>
                </div>
              ))}
            {selectedCategory === "planning" &&
              watchlist?.planning?.map((anime) => (
                <div
                  key={anime?.id}
                  className="min-w-[110px] max-w-[150px] h-48 lg:h-56"
                >
                  <Link href={`/anime/${anime?.id}`}>
                    <Image
                      src={anime?.image}
                      width={400}
                      height={600}
                      className="h-[90%]"
                    />
                    <h3 className="text-xs lg:text-sm line-clamp-2 mt-1">
                      {anime?.title}
                    </h3>
                  </Link>
                </div>
              ))}
            {selectedCategory === "completed" &&
              watchlist?.completed?.map((anime) => (
                <div
                  key={anime?.id}
                  className="min-w-[110px] max-w-[150px] h-48 lg:h-56"
                >
                  <Link href={`/anime/${anime?.id}`}>
                    <Image
                      src={anime?.image}
                      width={400}
                      height={600}
                      className="h-[90%]"
                    />
                    <h3 className="text-xs lg:text-sm line-clamp-2 mt-1">
                      {anime?.title}
                    </h3>
                  </Link>
                </div>
              ))}
            {selectedCategory === "dropped" &&
              watchlist?.dropped?.map((anime) => (
                <div
                  key={anime?.id}
                  className="min-w-[110px] max-w-[150px] h-48 lg:h-56"
                >
                  <Link href={`/anime/${anime?.id}`}>
                    <Image
                      src={anime?.image}
                      width={400}
                      height={600}
                      className="h-[90%]"
                    />
                    <h3 className="text-xs lg:text-sm line-clamp-2 mt-1">
                      {anime?.title}
                    </h3>
                  </Link>
                </div>
              ))}
            {selectedCategory === "paused" &&
              watchlist?.paused?.map((anime) => (
                <div
                  key={anime?.id}
                  className="min-w-[110px] max-w-[150px] h-48 lg:h-56"
                >
                  <Link href={`/anime/${anime?.id}`}>
                    <Image
                      src={anime?.image}
                      width={400}
                      height={600}
                      className="h-[90%]"
                    />
                    <h3 className="text-xs lg:text-sm line-clamp-2 mt-1">
                      {anime?.title}
                    </h3>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default WatchlistPage;
