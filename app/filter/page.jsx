"use client";
import { useEffect, useRef, useState } from "react";
import { BROWSE_ANIMES_QUERY } from "../../constants/apiQuery";
import {
  GENRES,
  YEARS,
  AVERAGE_SCORES,
  POPULARITY,
  FORMATS,
  SORT,
  STATUS,
  SEASONS,
} from "../../constants/randomConstants";
import FilterDropDown from "../../components/FilterDropDown";
import SecondFilterDropDown from "../../components/SecondFilterDropDown";
import Pagination from "../../components/Pagination";
import AnimeList from "../../components/AnimeList";
import { useSearchContext } from "../../context/searchContext";
import { getAnimeByFilter } from "../../axios/getAnimeData";

const Page = () => {
  const query = BROWSE_ANIMES_QUERY;

  const { search, setSearch } = useSearchContext();

  const [genre, setGenre] = useState(undefined);
  const [format, setFormat] = useState(undefined);
  const [sort, setSort] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [season, setSeason] = useState(undefined);
  const [seasonYear, setSeasonYear] = useState(undefined);
  const [averageScoreGreater, setAverageScoreGreater] = useState(undefined);
  const [averageScoreLesser, setAverageScoreLesser] = useState(undefined);
  const [popularityGreater, setPopularityGreater] = useState(undefined);
  const [popularityLesser, setPopularityLesser] = useState(undefined);
  const [page, setPage] = useState(1);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);

  const variables = {
    genre,
    search,
    format,
    sort,
    status,
    seasonYear,
    season,
    averageScore_greater: averageScoreGreater,
    averageScore_lesser: averageScoreLesser,
    popularity_greater: popularityGreater,
    popularity_lesser: popularityLesser,
    page,
    perPage: 30,
  };

  const FILTER_ITEMS = [
    {
      title: "Genre",
      variable: genre,
      setVariable: setGenre,
      items: GENRES,
      isSecond: false,
    },
    {
      title: "Format",
      variable: format,
      setVariable: setFormat,
      items: FORMATS,
      isSecond: false,
    },
    {
      title: "Year",
      variable: seasonYear,
      setVariable: setSeasonYear,
      items: YEARS,
      isSecond: false,
    },
    {
      title: "Popularity",
      greater: popularityGreater,
      setGreater: setPopularityGreater,
      lesser: popularityLesser,
      setLesser: setPopularityLesser,
      items: POPULARITY,
      isSecond: true,
    },
    {
      title: "Score",
      greater: averageScoreGreater,
      setGreater: setAverageScoreGreater,
      lesser: averageScoreLesser,
      setLesser: setAverageScoreLesser,
      items: AVERAGE_SCORES,
      isSecond: true,
    },
    {
      title: "Status",
      variable: status,
      setVariable: setStatus,
      items: STATUS,
      isSecond: false,
    },
    {
      title: "Season",
      variable: season,
      setVariable: setSeason,
      items: SEASONS,
      isSecond: false,
    },
    {
      title: "Sort",
      variable: sort,
      setVariable: setSort,
      items: SORT,
      isSecond: false,
    },
  ];

  const fetchResults = async () => {
    setLoading(true);
    const data = await getAnimeByFilter(query, variables);
    setAnimes(data);
    setLoading(false);
  };

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [page, search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const resetFilters = () => {
    setSearch(undefined);
    setGenre(undefined);
    setSeason(undefined);
    setSeasonYear(undefined);
    setStatus(undefined);
    setAverageScoreGreater(undefined);
    setAverageScoreLesser(undefined);
    setPopularityGreater(undefined);
    setPopularityLesser(undefined);
    setFormat(undefined);
    setSort(undefined);
    fetchResults();
  };

  return (
    <main className="text-white">
      <div className=" container p-4">
        {/* Filter */}
        <h2 className="text-base md:text-xl font-semibold mb-2">Filter</h2>
        <div className=" bg-prussianBlueMediumDark  p-6 rounded text-xs md:text-base">
          <div
            ref={dropdownRef}
            className="grid grid-cols-2 xs:grid-cols-3  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5 "
          >
            {FILTER_ITEMS.map((filter, index) => {
              const DropdownComponent = filter.isSecond
                ? SecondFilterDropDown
                : FilterDropDown;
              return (
                <DropdownComponent
                  key={index}
                  title={filter.title}
                  filterItems={filter.items}
                  variable={filter.variable}
                  setVariable={filter.setVariable}
                  greater={filter.greater}
                  setGreater={filter.setGreater}
                  lesser={filter.lesser}
                  setLesser={filter.setLesser}
                  isOpen={openDropdown === index}
                  toggleDropdown={() => toggleDropdown(index)}
                />
              );
            })}
          </div>
          <div className="space-x-3">
            <button
              className="bg-amber-400 px-3 mt-10 rounded font-bold py-1 text-black"
              onClick={() => fetchResults()}
            >
              Filter
            </button>
            <button
              className="bg-amber-400 px-3 mt-10 rounded font-bold py-1 text-black"
              onClick={() => resetFilters()}
            >
              Reset
            </button>
          </div>
        </div>
        {/* Result */}

        <div className="flex justify-between mt-10 mb-4">
          {!search ? (
            <h2 className="text-sm md:text-base font-semibold">
              Filter Result:
            </h2>
          ) : (
            <h2 className="text-sm md:text-base font-semibold">
              Search result of : <span className=" italic">{search}</span>
            </h2>
          )}
          <p className="text-xs md:text-sm">
            {animes?.pageInfo?.total === 1
              ? "1 Result"
              : animes?.pageInfo?.total > 1
              ? `${animes?.pageInfo?.total} Results`
              : "No Result"}
          </p>
        </div>
        <AnimeList
          animes={animes}
          loading={loading}
        />

        {/* Pagination */}
        {animes?.media?.length ? (
          <Pagination
            setPage={setPage}
            animes={animes}
            page={page}
          />
        ) : null}
      </div>
    </main>
  );
};

export default Page;
