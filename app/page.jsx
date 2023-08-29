"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";
import { MONTHS, formatTime, url } from "../constants/page";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  PlayCircleIcon,
  CalendarIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import {
  POPULAR_ANIMES_QUERY,
  TOP_AIRING_ANIMES_QUERY,
  TOP_RANKING_ANIMES_QUERY,
  TRENDING_ANIMES_QUERY,
  SPOTLIGHT_ANIMES_QUERY,
} from "./api/apiQuery/page";
import ReactHtmlParser from "html-react-parser";
import axios from "axios";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import AnimeList from "../components/AnimeScrollList";

const Main = () => {
  const [spotlight, setSpotlight] = useState([]);
  const [topAiringAnimes, setTopAiringAnimes] = useState([]);
  const [topRankingAnimes, setTopRankingAnimes] = useState([]);
  const [mostPopularAnimes, setMostPopularAnimes] = useState([]);
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const variables = {
    page: 1,
    perPage: 10,
  };

  const isBannerImage = windowWidth >= 768;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requests = [
          axios.post(url, { query: SPOTLIGHT_ANIMES_QUERY }),
          axios.post(url, { query: POPULAR_ANIMES_QUERY, variables }),
          axios.post(url, { query: TRENDING_ANIMES_QUERY, variables }),
          axios.post(url, { query: TOP_RANKING_ANIMES_QUERY, variables }),
          axios.post(url, { query: TOP_AIRING_ANIMES_QUERY, variables }),
        ];

        const responses = await Promise.all(requests);
        const data = responses.map((response) => response.data.data);

        setSpotlight(data[0]?.Page);
        setMostPopularAnimes(data[1]?.Page);
        setTrendingAnimes(data[2]?.Page);
        setTopRankingAnimes(data[3]?.Page);
        setTopAiringAnimes(data[4]?.Page);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="space-y-5">
      {/* spot-light */}
      <div className=" relative  text-white max-w-[1700px] bg-black bg-opacity-10  mx-auto">
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
                <button className=" bg-gray-700 hover:bg-gray-900 p-3 rounded-full">
                  <ChevronLeftIcon className="w-7 h-7 text-white" />
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
                <button className=" bg-gray-700 hover:bg-gray-900 p-3 rounded-full">
                  <ChevronRightIcon className="w-7 h-7 text-white" />
                </button>
              </div>
            );
          }}
        >
          {spotlight?.media?.map((anime, index) => {
            const parsedDescription = ReactHtmlParser(anime?.description);
            const remainingTimeInSeconds =
              anime?.nextAiringEpisode?.timeUntilAiring;
            const formattedTime = formatTime(remainingTimeInSeconds);
            return (
              <>
                {loading ? (
                  <div
                    key={index}
                    className="w-full h-[260px] md:h-[240px] lg:h-[295px] xl:h-[384px] bg-prussianBlueAccent animate-pulse"
                  ></div>
                ) : (
                  <div
                    key={index}
                    className={`w-full h-full text-xs md:text-sm lg:text-base`}
                  >
                    <Link href={`/anime/${anime?.id}`}>
                      {isBannerImage ? (
                        <div
                          className="realtive w-full h-60 lg:h-80  xl:h-96 "
                          style={{
                            backgroundImage: `url(${anime?.bannerImage})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-transparent opacity-90" />
                          <div className="absolute h-full  flex flex-col justify-end w-[600px] text-start space-y-1 lg:space-y-2 px-20 pb-10 ">
                            <p className="text-amber-400 ">
                              #{index + 1} spotlight
                            </p>
                            <h2 className=" text-2xl lg:text-3xl line-clamp-2 font-bold ">
                              {anime?.title?.english || anime?.title?.romaji}
                            </h2>
                            <div className="flex gap-1 md:gap-3 ">
                              <div className="flex gap-2 items-center">
                                <div>
                                  <PlayCircleIcon className="w-4 h-4" />
                                </div>
                                <div>{anime?.format}</div>
                              </div>
                              <div className="flex gap-2 items-center">
                                <div>
                                  <ClockIcon className="w-4 h-4" />
                                </div>
                                <div>{anime?.duration} m</div>
                              </div>
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
                            </div>
                            <p>
                              Episode {anime?.nextAiringEpisode?.episode} airing
                              in:{" "}
                              <span className="text-sky-500">
                                {formattedTime}
                              </span>
                            </p>
                            <p className="hidden lg:line-clamp-3 xl:line-clamp-5 text-justify">
                              {parsedDescription}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex h-full p-5 mb-5 gap-3 z-10"
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
                            />
                          </div>
                          <div className="text-start  space-y-1 lg:space-y-3 text-xs z-10">
                            <p className="text-amber-400 ">
                              #{index + 1} spotlight
                            </p>
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
                                  {anime?.startDate?.day},{" "}
                                  {anime?.startDate?.year}
                                </div>
                              </div>
                            </div>
                            <p>
                              Episode {anime?.nextAiringEpisode?.episode} airing
                              in:{" "}
                              <span className="text-sky-500">
                                {formattedTime}
                              </span>
                            </p>
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>
                )}
              </>
            );
          })}
        </Carousel>
      </div>

      <div className="container mx-auto p-3 space-y-5">
        <AnimeList
          data={trendingAnimes}
          title={"TRENDING NOW"}
          loading={loading}
          path={"trending"}
        />
        <AnimeList
          data={topAiringAnimes}
          title={"TOP AIRING"}
          loading={loading}
          path={"top-airing"}
        />
        <AnimeList
          data={mostPopularAnimes}
          title={"MOST POPULAR"}
          loading={loading}
          path={"most-popular"}
        />
        {/* top ranking anime */}
        <div>
          <div className="flex justify-between items-center mb-5 text-amber-400  ">
            <h2 className="text-base md:text-lg xl:text-xl font-bold">
              TOP RANKED
            </h2>
            <Link href={`/anime/top-ranking`}>
              <p className="text-[10px] md:text-xs xl:text-sm">View All</p>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 ">
            {topRankingAnimes?.media?.map((anime, index) => {
              const totalUser = anime?.stats?.scoreDistribution?.reduce(
                (total, distribution) => total + distribution.amount,
                0
              );

              const durationInMinutes = anime?.duration;
              const hours = Math.floor(durationInMinutes / 60);
              const minutes = durationInMinutes % 60;

              return (
                <div
                  key={index}
                  className="relative flex bg-prussianBlueMediumDark rounded-lg md:pr-5 lg:pr-10"
                >
                  {/* {ranking} */}

                  <div className="grid place-content-center tex-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-400 w-16 md:w-20 lg:w-28">
                    #{index + 1}
                  </div>
                  {!loading ? (
                    <div className="flex gap-3  p-3 w-full">
                      {/* image */}
                      <div className="flex gap-3">
                        <Link href={`/anime/${anime?.id}`}>
                          <div className=" h-[60px] md:h-[80px] lg:h-[100px] min-w-[40px]">
                            <Image
                              src={anime?.coverImage?.extraLarge}
                              alt="Anime Image"
                              width={150}
                              height={250}
                              className="w-full h-full rounded  overflow-hidden"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="md:grid md:grid-flow-col md:grid-cols-4 gap-5 w-full text-xs md:text-sm lg:text-md">
                        {/* First Coloumn */}
                        <div className="flex flex-col gap-y-3 md:items-start justify-center px-0 col-span-2">
                          <Link href={`/anime/${anime?.id}`}>
                            <h3 className=" text-md sm:text-base  md:text-lg lg:text-xl line-clamp-2  md:line-clamp-1 font-bold">
                              {anime?.title?.english || anime?.title?.romaji}
                            </h3>
                          </Link>

                          <ul className="hidden md:flex  gap-3 ">
                            {anime?.genres?.map((genre, index) => {
                              return (
                                <p
                                  key={index}
                                  className={`px-[4px] bg-amber-400 text-black font-bold text-[10px] rounded-md ${
                                    index >= 2 ? "md:hidden" : "md:block"
                                  } ${
                                    index >= 4
                                      ? "lg:hidden xl:block"
                                      : "lg:block xl:block "
                                  }
                                    `}
                                >
                                  {genre}
                                </p>
                              );
                            })}
                          </ul>

                          <div className="flex items-center gap-1 text-xs md:text-sm md:hidden">
                            {anime?.episodes ? (
                              <div className="flex items-center gap-1">
                                {anime?.format === "TV" && (
                                  <>
                                    <div className="bg-blue-800  px-1 py-0.5 text-[10px] rounded">
                                      {`EP ${anime?.episodes}`}
                                    </div>
                                    <div className="dot" />
                                  </>
                                )}
                              </div>
                            ) : null}

                            <div>{anime?.format}</div>
                          </div>
                        </div>
                        {/* Second Coloumn */}
                        <div className="hidden md:flex flex-col gap-3 justify-center px-0 col-span-1 lg:w-28">
                          <div className="flex items-center font-bold text-sm md:text-md lg:text-base gap-x-1">
                            <FaceSmileIcon className="w-5 h-5 text-yellow-300" />{" "}
                            <span>{anime?.averageScore}%</span>
                          </div>
                          <div className="text-slate-300">
                            {totalUser} users
                          </div>
                        </div>
                        {/* Third Coloumn */}
                        <div className="hidden md:flex flex-col gap-3 justify-center px-0 col-span-1 lg:w-28">
                          <div className="font-bold text-sm md:text-md lg:text-base">
                            {anime?.format}
                          </div>
                          <div className="text-slate-300">
                            {anime?.format === "TV" ||
                            "SPECIAL" ||
                            "OVA" ||
                            "0NA" ||
                            "TV_SHORT" ? (
                              <div>{anime?.episodes} episodes</div>
                            ) : (
                              <div>{`${hours} hours, ${minutes} mins`}</div>
                            )}
                          </div>
                        </div>
                        {/* Fourth Coloumn */}
                        <div className="hidden md:flex flex-col gap-3 justify-center px-0 w-28">
                          <div className="flex gap-1 last:font-bold text-sm md:text-md lg:text-base">
                            <div>{anime?.season}</div>
                            <div>{anime?.seasonYear}</div>
                          </div>
                          <div className="text-slate-300">{anime?.status}</div>
                        </div>
                      </div>
                      <div className="hidden  gap-3 text-xs items-center min-w-fit">
                        <div className="flex flex-col gap-3 items-center">
                          <div className="flex items-center font-bold text-sm gap-x-1">
                            <FaceSmileIcon className="w-5 h-5 text-yellow-300" />{" "}
                            <span>{anime?.averageScore}%</span>
                          </div>
                          <div className="text-slate-300">
                            {totalUser} users
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 items-center">
                          <div className="font-bold text-sm">
                            {anime?.format}
                          </div>
                          <div className="text-slate-300">
                            {anime?.format === "TV" ||
                            "SPECIAL" ||
                            "OVA" ||
                            "0NA" ||
                            "TV_SHORT" ? (
                              <div>{anime?.episodes} episodes</div>
                            ) : (
                              <div>{`${hours} hours, ${minutes} mins`}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 items-center">
                          <div className="flex gap-1 last:font-bold text-sm">
                            <div>{anime?.season}</div>
                            <div>{anime?.seasonYear}</div>
                          </div>
                          <div className="text-slate-300">{anime?.status}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // loading page
                    <div className="flex items-center h-28 gap-3 w-full animate-pulse">
                      <div className=" h-24 w-16 bg-prussianBlueAccent "></div>
                      <div className="grid grid-flow-col md:grid-cols-4 w-full gap-1">
                        <div className="col-span-2 flex flex-col gap-3 justify-center">
                          <div className="h-3 w-32 xs:w-52 sm:w-60 md:h-4 md:w-44 xl:w-56 bg-prussianBlueAccent  rounded"></div>
                          <div className="h-3 w-28 xs:w-36 sm:w-40 md:h-4 md:w-32 xl:w-44 bg-prussianBlueAccent  rounded"></div>
                        </div>
                        {Array.from({ length: 3 }).map((_, index) => {
                          return (
                            <div
                              key={index}
                              className="col-span-1 hidden md:flex flex-col gap-3 justify-center"
                            >
                              <div className="h-4 w-28 xl:w-44 bg-prussianBlueAccent  rounded"></div>
                              <div className="h-4 w-28 xl:w-44 bg-prussianBlueAccent  rounded"></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
