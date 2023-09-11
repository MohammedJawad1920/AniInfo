import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const AnimeList = ({ data, title, path, loading }) => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      const itemWidth =
        containerRef.current.querySelector(".anime-item").offsetWidth;
      containerRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const itemWidth =
        containerRef.current.querySelector(".anime-item").offsetWidth;
      containerRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-5 text-amber-400  ">
        <h2 className="text-base md:text-lg xl:text-xl font-bold">{title}</h2>
        <Link href={`/anime/${path}`}>
          <p className="text-[10px] md:text-xs xl:text-sm">View All</p>
        </Link>
      </div>
      <div className="flex relative ">
        <div
          className="absolute top-0 bottom-0 left-0  hidden md:flex flex-col justify-center gap-3 "
          onClick={scrollLeft}
        >
          <button
            onClick={scrollLeft}
            className="  flex items-center bg-gray-700 hover:bg-gray-900 opacity-80 rounded-full p-3"
          >
            <ChevronLeftIcon className="w-5 h-5 lg:w-7 lg:h-7  " />
          </button>
        </div>
        <div
          className="flex  overflow-x-auto  noscroll-bar "
          ref={containerRef}
        >
          <div className="grid grid-flow-col gap-8 h-full">
            {data?.media?.map((anime, index) => {
              return (
                <>
                  {loading ? (
                    <div className="flex flex-col h-full gap-3 min-w-[110px] md:min-w-[170px] lg:min-w-[170px] animate-pulse">
                      <div className=" bg-prussianBlueAccent h-[150px] md:h-[180px] lg:h-[230px] rounded-lg"></div>
                      <div className=" bg-prussianBlueAccent rounded w-[90%] h-4"></div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="anime-item flex flex-col min-w-[90px] md:min-w-[110px] lg:min-w-[150px] cursor-pointer group"
                    >
                      <Link href={`/anime/${anime?.id}`}>
                        <div className="h-[130px] md:h-[160px] lg:h-[210px]">
                          <Image
                            src={anime?.coverImage?.extraLarge}
                            alt="Anime Image"
                            width={150}
                            height={250}
                            className="w-full h-full rounded-lg  overflow-hidden"
                          />
                        </div>
                        <div>
                          <h2 className=" line-clamp-2 text-xs lg:text-sm mt-1 group-hover:text-amber-400">
                            {anime?.title?.english || anime?.title?.romaji}
                          </h2>
                        </div>
                      </Link>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className="absolute top-0 bottom-0 right-0  hidden md:flex flex-col justify-center gap-3 ">
          <button
            onClick={scrollRight}
            className="  flex items-center  bg-gray-700 hover:bg-gray-900 opacity-80 rounded-full p-3"
          >
            <ChevronRightIcon className="w-5 h-5 lg:w-7 lg:h-7  " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeList;
