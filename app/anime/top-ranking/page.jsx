"use client";
import { useEffect } from "react";
import { TOP_RANKING_ANIMES_QUERY } from "../../../constants/apiQuery";
import { getAnimeBySort } from "../../../axios/getAnimeData";
import { useState } from "react";
import Pagination from "../../../components/Pagination";
import AnimeList from "../../../components/AnimeList";

const page = () => {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 30;

  const variables = {
    page,
    perPage,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAnimeBySort(TOP_RANKING_ANIMES_QUERY, variables);
      setAnimes(data);
      setLoading(false);
    };
    fetchData();
  }, [page]);
  console.log(animes);
  return (
    <main>
      <div className="container p-4">
        <div>
          <h1 className="text-amber-400 font-bold py-5">TOP RANKED ANIME</h1>
        </div>
        <AnimeList
          animes={animes}
          loading={loading}
          page={page}
          isTopRankingPage={true}
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

export default page;
