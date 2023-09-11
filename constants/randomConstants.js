export const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

export const YEARS = [
  2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
  2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998,
  1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985,
  1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972,
  1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961,
];

export const AVERAGE_SCORES = [
  {
    greater: 0,
    lesser: 9,
  },
  {
    greater: 10,
    lesser: 19,
  },
  {
    greater: 20,
    lesser: 29,
  },
  {
    greater: 30,
    lesser: 39,
  },
  {
    greater: 40,
    lesser: 49,
  },
  {
    greater: 50,
    lesser: 59,
  },
  {
    greater: 60,
    lesser: 69,
  },
  {
    greater: 70,
    lesser: 79,
  },
  {
    greater: 80,
    lesser: 89,
  },
  {
    greater: 90,
  },
];

export const POPULARITY = [
  {
    greater: 0,
    lesser: 29999,
  },
  {
    greater: 30000,
    lesser: 59999,
  },
  {
    greater: 60000,
    lesser: 89999,
  },
  {
    greater: 90000,
    lesser: 119999,
  },
  {
    greater: 120000,
    lesser: 149999,
  },
  {
    greater: 150000,
    lesser: 179999,
  },
  {
    greater: 180000,
    lesser: 209999,
  },
  {
    greater: 210000,
    lesser: 239999,
  },
  {
    greater: 240000,
    lesser: 269999,
  },
  {
    greater: 270000,
    lesser: 299999,
  },
  {
    greater: 300000,
    lesser: 329999,
  },
  {
    greater: 330000,
    lesser: 359999,
  },
  {
    greater: 360000,
    lesser: 389999,
  },
  {
    greater: 390000,
    lesser: 419999,
  },
  {
    greater: 420000,
    lesser: 449999,
  },
  {
    greater: 450000,
    lesser: 479999,
  },
  {
    greater: 480000,
    lesser: 509999,
  },
  {
    greater: 510000,
    lesser: 539999,
  },
  {
    greater: 540000,
    lesser: 569999,
  },
  {
    greater: 570000,
    lesser: 599999,
  },
  {
    greater: 600000,
    lesser: 629999,
  },
  {
    greater: 630000,
    lesser: 659999,
  },
  {
    greater: 660000,
    lesser: 689999,
  },
  {
    greater: 690000,
  },
];

export const FORMATS = [
  "TV",
  "TV_SHORT",
  "MOVIE",
  "SPECIAL",
  "MANGA",
  "OVA",
  "ONA",
];

export const TYPES = ["ANIME", "MANGA"];

export const SORT = [
  {
    title: "Popularity",
    query: "POPULARITY_DESC",
  },
  {
    title: "Top Rated",
    query: "SCORE_DESC",
  },
  {
    title: "Latest",
    query: "START_DATE_DESC",
  },
  {
    title: "Favorited",
    query: "FAVOURITES_DESC",
  },
  {
    title: "Trending",
    query: "TRENDING_DESC",
  },
];

export const STATUS = [
  {
    title: "Releasing",
    query: "RELEASING",
  },
  {
    title: "Finished",
    query: "FINISHED",
  },
  {
    title: "Upcoming",
    query: "NOT_YET_RELEASED",
  },
  {
    title: "Cancelled",
    query: "CANCELLED",
  },
];

export const SEASONS = [
  {
    title: "fall",
    query: "FALL",
  },
  {
    title: "Winter",
    query: "WINTER",
  },
  {
    title: "Spring",
    query: "SPRING",
  },
  {
    title: "Summer",
    query: "SUMMER",
  },
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const statusColors = [
  "#FF9900",
  "#87CEEB",
  "#FF69B4",
  "#00FF00",
  "#9400D3",
];

export const strokeColors = [
  "hsl(10,75%,50%)",
  "hsl(20,75%,50%)",
  "hsl(30,75%,50%)",
  "hsl(40,75%,50%)",
  "hsl(50,75%,50%)",
  "hsl(60,75%,50%)",
  "hsl(70,75%,50%)",
  "hsl(80,75%,50%)",
  "hsl(90,75%,50%)",
  "hsl(100,75%,50%)",
];

export function capitalizeWords(str) {
  if (!str) {
    return "";
  }

  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const url = "https://graphql.anilist.co";

export function formatTime(seconds) {
  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);

  let formattedTime = "";
  if (days > 0) {
    formattedTime += `${days}d `;
  }
  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes}m`;
  }
  return formattedTime.trim();
}
