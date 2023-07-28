import { createContext } from "react";

export const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [type, setType] = useState(undefined);
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

  return (
    <QueryContext.Provider value={{ type, setType }}>
      {children}
    </QueryContext.Provider>
  );
};
