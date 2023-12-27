"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MONTHS, formatTime } from "../constants/randomConstants";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  PlayCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import ReactHtmlParser from "html-react-parser";

const Spotlight = ({ spotlight }) => {
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

  const isBannerImage = windowWidth >= 768;

  return (
    <div className=" relative  text-white max-w-[2560px] bg-black bg-opacity-10  mx-auto">
      <Carousel
        showThumbs={false}
        infiniteLoop
        showStatus={false}
        autoPlay
        interval={10000}
        stopOnHover
        swipeable
        className="w-full bg-prussianBlueDarkest"
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={`${
                hasPrev ? "absolute" : "hidden"
              } hidden top-0 bottom-0 rounded-full left-4 md:flex justify-center items-center   cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <button className="bg-gray-900 p-3 rounded-full">
                <ChevronLeftIcon className="w-5 lg:w-7 h-5 lg:h-7 text-white" />
              </button>
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              className={`${
                hasNext ? "absolute" : "hidden"
              } hidden top-0 bottom-0 rounded-full right-4 md:flex justify-center items-center  cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <button className="bg-gray-900 p-3 rounded-full">
                <ChevronRightIcon className="w-5 lg:w-7 h-5 lg:h-7 text-white" />
              </button>
            </div>
          );
        }}
      >
        {spotlight?.media?.map((anime, index) => {
          const parsedDescription =
            anime?.description && typeof anime.description === "string"
              ? ReactHtmlParser(anime.description)
              : null;
          const remainingTimeInSeconds =
            anime?.nextAiringEpisode?.timeUntilAiring;
          const formattedTime = formatTime(remainingTimeInSeconds);
          return (
            <>
              <div
                key={index}
                className={`w-full h-full text-xs md:text-sm lg:text-base`}
              >
                <Link href={`/anime/${anime?.id}`}>
                  <div
                    className="realtive hidden md:block w-full h-56 lg:h-72  xl:h-80 xxl:h-[500px] "
                    style={{
                      backgroundImage: `url(${anime?.bannerImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black  to-transparent opacity-80" />
                    <div className="container h-full flex items-center ">
                      <div className=" max-h-fit z-10 bg-black bg-opacity-60  flex flex-col justify-center items-start ml-20 rounded-lg  p-5 w-[400px] xl:w-[600px] text-start space-y-1 lg:space-y-2 ">
                        <p className="text-amber-400 ">
                          #{index + 1} spotlight
                        </p>
                        <h2 className=" text-2xl lg:text-3xl line-clamp-1 font-bold ">
                          {anime?.title?.english || anime?.title?.romaji}
                        </h2>
                        <div className="flex gap-1 md:gap-3 ">
                          {anime?.format && (
                            <div className="flex gap-2 items-center">
                              <div>
                                <PlayCircleIcon className="w-4 h-4" />
                              </div>
                              <div>{anime?.format}</div>
                            </div>
                          )}
                          {anime?.duration && (
                            <div className="flex gap-2 items-center">
                              <div>
                                <ClockIcon className="w-4 h-4" />
                              </div>
                              <div>{anime?.duration} m</div>
                            </div>
                          )}
                          {anime?.startDate?.year && (
                            <div className="flex gap-2 items-center">
                              <div>
                                <CalendarIcon className="w-4 h-4" />
                              </div>
                              <div>
                                {MONTHS[anime?.startDate.month - 1]}{" "}
                                {anime?.startDate?.day},{" "}
                                {anime?.startDate?.year}
                              </div>
                            </div>
                          )}
                        </div>
                        <p>
                          Episode {anime?.nextAiringEpisode?.episode} airing in:{" "}
                          <span className="text-sky-500">{formattedTime}</span>
                        </p>
                        <p className="hidden lg:line-clamp-2 xl:line-clamp-3 xxl:line-clamp-4  text-justify ">
                          {parsedDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex md:hidden h-full p-5 mb-5 gap-3 z-10"
                    style={{
                      backgroundImage: `url(${anime?.bannerImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-lg " />
                    <div className=" min-w-[130px] sm:min-w-[150px]  overflow-hidden z-10">
                      <Image
                        src={anime?.coverImage?.extraLarge}
                        alt="Anime Image"
                        width={150}
                        height={150}
                        className="w-full h-48 overflow-hidden"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-start  space-y-1 lg:space-y-3 text-xs z-10">
                      <p className="text-amber-400 ">#{index + 1} spotlight</p>
                      <h2 className=" text-base sm:text-lg  md:text-xl line-clamp-2 md:line-clamp-2 font-bold ">
                        {anime?.title?.english || anime?.title?.romaji}
                      </h2>
                      <div className="flex items-center flex-wrap gap-1">
                        <div>{anime?.format}</div>
                        <div className="dot" />
                        <div>{anime?.duration}m</div>
                        <div className="dot" />
                        <div className="flex gap-1 items-center">
                          <div>
                            {MONTHS[anime?.startDate.month - 1]}{" "}
                            {anime?.startDate?.day}, {anime?.startDate?.year}
                          </div>
                        </div>
                      </div>
                      <p>
                        Episode {anime?.nextAiringEpisode?.episode} airing in:{" "}
                        <span className="text-sky-500">{formattedTime}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Spotlight;
