import { url } from "../constants/randomConstants";
import { FaceSmileIcon } from "@heroicons/react/24/solid";
import {
  POPULAR_ANIMES_QUERY,
  TOP_AIRING_ANIMES_QUERY,
  TOP_RANKING_ANIMES_QUERY,
  TRENDING_ANIMES_QUERY,
  SPOTLIGHT_ANIMES_QUERY,
} from "../constants/apiQuery";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import AnimeList from "../components/AnimeScrollList";
import Carousel from "../components/Spotlight";

const fetchAnimes = async () => {
  try {
    const variables = {
      page: 1,
      perPage: 15,
    };

    const requests = [
      axios.post(url, { query: SPOTLIGHT_ANIMES_QUERY }),
      axios.post(url, { query: POPULAR_ANIMES_QUERY, variables }),
      axios.post(url, { query: TRENDING_ANIMES_QUERY, variables }),
      axios.post(url, { query: TOP_RANKING_ANIMES_QUERY, variables }),
      axios.post(url, { query: TOP_AIRING_ANIMES_QUERY, variables }),
    ];

    const responses = await Promise.all(requests);
    const data = responses.map((response) => response.data.data);

    return data;
  } catch (error) {
    console.error("Error fetching anime data:", error);

    throw error;
  }
};

const Main = async () => {
  const data = await fetchAnimes();
  const spotlight = data[0]?.Page;
  const mostPopularAnimes = data[1]?.Page;
  const trendingAnimes = data[2]?.Page;
  const topRankingAnimes = data[3]?.Page;
  const topAiringAnimes = data[4]?.Page;
  return (
    <main className="space-y-5">
      {/* spot-light */}
      <Carousel spotlight={spotlight} />

      <div className="container mx-auto p-3 space-y-5">
        <AnimeList
          data={trendingAnimes}
          title={"TRENDING NOW"}
          path={"trending"}
        />
        <AnimeList
          data={topAiringAnimes}
          title={"TOP AIRING"}
          path={"top-airing"}
        />
        <AnimeList
          data={mostPopularAnimes}
          title={"MOST POPULAR"}
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

                  <div className="grid place-content-center tex-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-400 w-16 md:w-20 lg:w-28">
                    #{index + 1}
                  </div>

                  <div className="flex gap-3  p-3 w-full">
                    {/* image */}
                    <div className="flex gap-3">
                      <Link href={`/anime/${anime?.id}`}>
                        <div className=" h-[60px] md:h-[70px]  min-w-[40px]">
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
                        <div className="text-slate-300">{totalUser} users</div>
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
                        <div className="text-slate-300">{totalUser} users</div>
                      </div>
                      <div className="flex flex-col gap-3 items-center">
                        <div className="font-bold text-sm">{anime?.format}</div>
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
