import Image from "next/image";
import { getAnimeById } from "../../axios/getAnimeData";

import {
  MONTHS,
  statusColors,
  strokeColors,
  capitalizeWords,
  formatTime,
} from "../../../constants/page";
import ReactHtmlParser from "html-react-parser";
import Link from "next/link";
import AddToList from "../../../components/AddToList";

const AnimeItemPage = async ({ params: { id } }) => {
  const anime = await getAnimeById(id);

  const parsedDescription =
    anime?.description && typeof anime.description === "string"
      ? ReactHtmlParser(anime.description)
      : null;
  const formattedStatus = capitalizeWords(anime?.status);
  const formattedSource = capitalizeWords(anime?.source);
  const formattedSeason = capitalizeWords(anime?.season);
  const mainStudios = anime?.studios?.edges.filter((edge) => edge?.isMain);

  const remainingTimeInSeconds = anime?.nextAiringEpisode?.timeUntilAiring;
  const formattedTime = formatTime(remainingTimeInSeconds);

  return (
    <main>
      <div className="container mx-auto  ">
        {/* image, overview and detail */}
        <div className="flex flex-col md:flex-row">
          <div className="space-y-5 pt-12 w-full ">
            <div className="flex flex-row justify-start md:items-start gap-3  px-3 md:px-5">
              <div className=" max-w-[110px] md:min-w-[140px]">
                <Image
                  src={anime?.coverImage?.extraLarge}
                  alt="Anime Image"
                  width={150}
                  height={150}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-y-3 md:items-start ">
                <h3 className=" text-base sm:text-lg  md:text-2xl font-bold">
                  {anime?.title?.english || anime?.title?.romaji}
                </h3>

                <div className="flex items-center gap-1 text-xs md:text-sm">
                  {anime?.episodes && anime?.format !== "MOVIE" && (
                    <div className="flex items-center gap-1">
                      <div className="bg-blue-800  px-1 py-0.5 text-[10px] rounded">
                        {`EP ${anime?.episodes}`}
                      </div>
                      <div className="dot" />
                    </div>
                  )}
                  {anime?.format && <div>{anime?.format}</div>}
                  {anime?.duration && (
                    <>
                      <div className="dot" />
                      <div>{anime?.duration}m</div>
                    </>
                  )}
                </div>
                <AddToList anime={anime} />
                {/* overview */}
                <div className=" hidden md:block   pb-3">
                  <div className="space-y-3 text-slate-300  max-h-[280px] mt-3 pr-3  overflow-auto text-justify  customScroll text-sm ">
                    {parsedDescription}
                  </div>
                </div>
              </div>
            </div>
            {/* overview */}
            <div className="md:hidden bg-prussianBlueMediumDark px-5 pb-3">
              <h3 className="text-amber-400 font-extrabold pt-3 ">
                Overview:{" "}
              </h3>
              <div className="space-y-3 text-slate-300  max-h-[240px] mt-3 pr-3  overflow-auto text-justify  customScroll text-xs">
                {parsedDescription}
              </div>
            </div>
          </div>
          <div className="p-5   space-y-3 text-xs bg-prussianBlueMediumDark md:text-sm  md:pt-16 md:px-5 md:bg-prussianBlueAccent md:w-[400px]">
            <p>
              <span className="font-bold">Title:</span>{" "}
              {anime?.title?.english || anime?.title?.romaji}
            </p>
            {anime?.nextAiringEpisode && (
              <p>
                <span className="font-bold">
                  Episode {anime?.nextAiringEpisode?.episode} airing in:{" "}
                </span>{" "}
                <span className="text-sky-500">{formattedTime}</span>
              </p>
            )}
            {anime?.format && (
              <p>
                <span className="font-bold">Format:</span> {anime?.format}
              </p>
            )}
            {anime?.duration && (
              <p>
                <span className="font-bold">Duration:</span> {anime?.duration}{" "}
                mins
              </p>
            )}
            {formattedSource && (
              <p>
                <span className="font-bold">Source:</span> {formattedSource}
              </p>
            )}
            {anime?.formattedSeason && (
              <p>
                <span className="font-bold">Season:</span> {formattedSeason}
              </p>
            )}
            {anime?.averageScore && (
              <p>
                <span className="font-bold">Average Score: </span>
                {anime?.averageScore}%
              </p>
            )}
            {anime?.meanScore && (
              <p>
                <span className="font-bold">Mean Score: </span>
                {anime?.meanScore}%
              </p>
            )}
            {anime?.popularity && (
              <p>
                <span className="font-bold">Popularity: </span>
                {anime?.popularity}
              </p>
            )}
            {anime?.favourites && (
              <p>
                <span className="font-bold">Favourites: </span>
                {anime?.favourites}
              </p>
            )}
            {anime?.mainStudios && (
              <p>
                <span className="font-bold">Studio: </span>
                {mainStudios?.map((studio) => (
                  <span key={studio.id}>{studio.node.name}</span>
                ))}
              </p>
            )}

            {anime?.format !== "MOVIE" && (
              <p>
                <span className="font-bold">Status:</span> {formattedStatus}
              </p>
            )}
            {anime?.startDate?.year && (
              <p>
                <span className="font-bold">Aired in:</span>{" "}
                {MONTHS[anime?.startDate?.month - 1]} {anime?.startDate?.day},{" "}
                {anime?.startDate?.year}
              </p>
            )}
            {formattedStatus === "Finished" && anime?.format !== "MOVIE" && (
              <p>
                <span className="font-bold">Finished at:</span>{" "}
                {MONTHS[anime?.endDate.month - 1]} {anime?.endDate.day},{" "}
                {anime?.endDate.year}
              </p>
            )}
            <div className="flex gap-2">
              <div className="font-bold">Genres:</div>
              <div className="flex gap-3 flex-wrap">
                {anime?.genres?.map((genre, index) => {
                  return (
                    <p
                      key={index}
                      className="px-[4px] bg-amber-400 text-black font-semibold text-[10px] rounded-md"
                    >
                      {genre}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-prussianBlueMediumDark md:bg-prussianBlueDarkest">
        {/* score and stats distribution */}
        <div className="container mx-auto flex flex-col text-xs gap-5 md:text-sm md:flex-row p-5  pt-10  ">
          {/* status distribution */}

          <div className="flex bg-prussianBlueAccent flex-col justify-between pt-3 gap-5 rounded md:pt-5  md:w-[65%]  ">
            <h3 className="px-3 text-base text-amber-400 font-bold">
              Status Distribution
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center px-3 lg:px-5  sm:grid-cols-5">
              {anime?.stats?.statusDistribution
                ?.sort((a, b) => b.amount - a.amount)
                .map((item, index) => {
                  const formattedStatus = capitalizeWords(item.status);

                  const statusColor = statusColors[index];

                  return (
                    <div
                      key={index}
                      className="space-y-1 "
                    >
                      <div
                        className={`px-3 py-1 md:px-0 text-whte `}
                        style={{ background: `${statusColor} ` }}
                      >
                        {formattedStatus}
                      </div>
                      <p>
                        <span style={{ color: `${statusColor}` }}>
                          {item?.amount}
                        </span>{" "}
                        Users
                      </p>
                    </div>
                  );
                })}
            </div>
            {/* graph */}
            <div className="flex h-3  rounded-b overflow-hidden  ">
              {anime?.stats?.statusDistribution?.map((item, index) => {
                const statusColor = statusColors[index];
                const totalUser = anime?.stats?.statusDistribution?.reduce(
                  (total, item) => total + item.amount,
                  0
                );

                const width = (item.amount / totalUser) * 100;

                return (
                  <div
                    key={index}
                    className={` h-full `}
                    style={{ width: `${width}%`, background: `${statusColor}` }}
                  ></div>
                );
              })}
            </div>
          </div>

          {/*score distribution  */}
          <div className="p-3 flex flex-col justify-between bg-prussianBlueAccent rounded lg:p-5 md:w-[35%] ">
            <h3 className="text-amber-400 font-bold text-base">
              Score Distribution
            </h3>
            <div className="flex justify-between ">
              {anime?.stats?.scoreDistribution.map((item, index) => {
                const maxAmount = Math.max(
                  ...anime?.stats?.scoreDistribution?.map((item) => item.amount)
                );

                const statusColor = strokeColors[index];

                const barHeight = (item.amount / maxAmount) * 100;
                return (
                  <div
                    key={index}
                    className="text-xs flex flex-col justify-end items-center h-32 gap-1 md:h-24 "
                  >
                    <div
                      className="w-3 p-1 rounded-full  sm:w-4 md:w-3 lg:w-4"
                      style={{
                        height: `${barHeight}%`,
                        background: `${statusColor}`,
                      }}
                    ></div>
                    <p className="text-center">{item.score}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* recommendation */}
        <div className="container mx-auto p-5  space-y-5">
          {anime?.recommendations?.edges.length >= 1 && (
            <h3 className="text-amber-400 text-lg font-bold ">
              Recommended for you
            </h3>
          )}
          <div className="grid grid-cols-2 xs:grid-cols-3  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-7  sm:gap-5">
            {anime?.recommendations?.edges?.map((item) => {
              const recommendedAnimes = item?.node?.mediaRecommendation;

              const { id, coverImage, title } = recommendedAnimes;

              return (
                <div
                  key={id}
                  className={"relative flex flex-col  cursor-pointer group"}
                >
                  <Link href={`/anime/${id}`}>
                    <div className="flex flex-col min-w-[110px] ">
                      <div className="">
                        <Image
                          src={coverImage?.large}
                          alt="Anime Image"
                          width={150}
                          height={150}
                          className="w-full h-48 lg:h-56 rounded-lg  overflow-hidden"
                        />
                      </div>
                      <div>
                        <h2 className=" line-clamp-1 text-sm lg:text-base mt-1 hover:text-amber-400">
                          {title?.english || title?.romaji}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnimeItemPage;
