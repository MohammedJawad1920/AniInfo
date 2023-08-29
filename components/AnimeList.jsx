import Link from "next/link";
import CardLoading from "./CardLoading";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { MONTHS, capitalizeWords } from "../constants/page";
import Image from "next/image";

const AnimeList = ({ animes, loading, page, isTopRankingPage }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {loading ? (
        // Loading card
        <CardLoading />
      ) : (
        // Result cards
        <div className="grid grid-cols-2 xs:grid-cols-3  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-7 sm:gap-5">
          {animes?.media?.map((anime, index) => {
            const {
              id,
              coverImage,
              episodes,
              format,
              title,
              duration,
              averageScore,
              genres,
              status,
              source,
              startDate,
              endDate,
            } = anime;

            const formattedStatus = capitalizeWords(status);

            const lgIndexes = [3, 4, 5];
            const xlIndexes = [4, 5, 6];

            const isLgLastThree = lgIndexes.includes(index % 6);
            const isXlLastThree = xlIndexes.includes(index % 7);

            const shouldPositionLeft =
              windowWidth >= 1280 ? isXlLastThree : isLgLastThree;

            return (
              <div
                key={id}
                className={"relative flex flex-col cursor-pointer group"}
              >
                {isTopRankingPage && (
                  <div
                    className={
                      "absolute grid place-content-center -top-3 -left-3 bg-amber-400 text-black text-xs md:text-sm font-bold rounded-full w-8 h-8 md:w-9 md:h-9"
                    }
                    style={{ background: `${coverImage?.color}` }}
                  >
                    {index + 1 + (page - 1) * 30}
                  </div>
                )}
                <Link href={`/anime/${id}`}>
                  <div className="flex flex-col min-w-[110px] ">
                    <div className="">
                      <Image
                        src={coverImage?.extraLarge}
                        alt="Anime Image"
                        width={150}
                        height={150}
                        className="w-full h-48 lg:h-56 rounded-lg  overflow-hidden"
                      />
                    </div>
                    <div>
                      <h2 className=" line-clamp-1 text-xs md:text-sm lg:text-base mt-1 hover:text-amber-400">
                        {title?.english || title?.romaji}
                      </h2>
                    </div>
                  </div>
                  {/* deatils */}
                  <div
                    className={` bg-prussianBlueDarkest bg-opacity-80 backdrop-blur-sm rounded absolute ${
                      shouldPositionLeft ? "right-[150%]" : "left-[150%]"
                    } w-96 z-10 -top-20 h-auto  text-white text-sm space-y-2 p-4 hidden pointer-events-none lg:group-hover:block lg:group-hover:pointer-events-auto`}
                  >
                    {" "}
                    <div className="flex justify-between items-center">
                      <h3 className=" font-bold text-base mb-2  ">
                        {title?.english || title?.romaji}
                      </h3>
                      <div className="flex   gap-0.5">
                        <StarIcon className="w-5 h-5 text-yellow-500" />{" "}
                        <span className=" my-auto">
                          {averageScore ? averageScore : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      <div className="bg-green-500 px-1 py-0.5 text-xs rounded">
                        {format}
                      </div>
                      <div className="dot" />
                      {episodes && format !== "MOVIE" ? (
                        <div className="bg-blue-800 my-auto px-1 py-0.5 text-xs rounded">
                          {`EP ${episodes}`}
                        </div>
                      ) : null}
                      <div className="dot" />
                      <div>{duration}m</div>
                    </div>
                    {(format === "TV" || format === "TV_SHORT") && (
                      <p className=" text-gray-300">
                        <span className="font-bold">Status:</span>{" "}
                        {formattedStatus}
                      </p>
                    )}
                    <p className=" text-gray-300">
                      <span className="font-bold">Source:</span> {source}
                    </p>
                    <p className=" text-gray-300">
                      <span className="font-bold">Genres:</span>{" "}
                      {genres.join(", ")}
                    </p>
                    <p className=" text-gray-300">
                      <span className="font-bold">Aired in:</span>{" "}
                      {MONTHS[startDate.month - 1]} {startDate.day},{" "}
                      {startDate.year}
                    </p>
                    {formattedStatus === "Finished" &&
                      (format === "TV" || format === "TV_SHORT") && (
                        <p className=" text-gray-300">
                          <span className="font-bold">Finished at:</span>{" "}
                          {MONTHS[endDate.month - 1]} {endDate.day},{" "}
                          {endDate.year}
                        </p>
                      )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AnimeList;
