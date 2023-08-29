const TRENDING_ANIMES_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      lastPage
      hasNextPage
    }
    media(isAdult: false, type: ANIME, sort: [TRENDING_DESC]) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
      }
      type
      format
      episodes
      chapters
      source
      genres
      averageScore
      duration
      description
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      rankings {
        id
        context
        rank
      }
    }
  }
}
`;
const POPULAR_ANIMES_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      lastPage
      hasNextPage
    }
    media(isAdult: false, type: ANIME, sort: [POPULARITY_DESC]) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
      }
      type
      format
      episodes
      chapters
      source
      genres
      averageScore
      duration
      description
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      rankings {
        id
        context
        rank
      }
    }
  }
}
`;

const TOP_AIRING_ANIMES_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      lastPage
      hasNextPage
    }
    media(isAdult: false, type: ANIME, sort: [POPULARITY_DESC], status: RELEASING) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
      }
      type
      format
      episodes
      chapters
      source
      genres
      averageScore
      duration
      description
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      rankings {
        id
        context
        rank
      }
    }
  }
}
`;

const TOP_RANKING_ANIMES_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      lastPage
      hasNextPage
    }
    media(isAdult: false, type: ANIME, sort: [SCORE_DESC]) {
      id
      title {
        romaji
        english
        native
      }
      episodes
      format
      duration
      season
      seasonYear
      averageScore
      status
      genres
      nextAiringEpisode {
        timeUntilAiring
        episode
      }
      stats{
        scoreDistribution{
          amount
        }
      }
      coverImage {
        color
        extraLarge
      }
      rankings {
        id
        context
        rank
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
    }
  }
}
`;

const BROWSE_ANIMES_QUERY = `
query (
  $page: Int,
  $perPage: Int,
  $seasonYear: Int,
  $averageScore_greater: Int,
  $averageScore_lesser: Int,
  $popularity_greater: Int,
  $popularity_lesser: Int,
  $genre: String,
  $search: String,
  $format: MediaFormat,
  $sort: [MediaSort],
  $status: MediaStatus,
  $season: MediaSeason,
) {
  Page (page: $page, 
        perPage: $perPage,
  ) {
    pageInfo {
      total
      lastPage
      hasNextPage
    }
    media (
      type: ANIME,
      seasonYear: $seasonYear,
      genre: $genre,
      averageScore_greater: $averageScore_greater,
      averageScore_lesser: $averageScore_lesser,
      popularity_greater: $popularity_greater,
      popularity_lesser: $popularity_lesser,
      format: $format,
      sort: $sort,
      search: $search,
      status: $status,
      season: $season,
      isAdult: false,
    ) {
      id
      title {
        romaji
        english
        native
      }
      type
      format
      episodes
      chapters
      source
      genres
      averageScore
      duration
      description
      status
      coverImage{
        color
        extraLarge
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
    }
  }
}  
`;

const ANIME_QUERY_BY_ID = `
query ($id: Int) {
  Page {
    media (
      id: $id,
    ) {
      id
      title {
        romaji
        english
        native
      }
      type
      format
      episodes
      chapters
      recommendations {
        edges {
          node {
            mediaRecommendation {
              id
              title {
                romaji
                english
                native
              }
              type
              format
              episodes
              chapters
              source
              genres
              averageScore
              duration
              description
              status
              coverImage{
                large
              }
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              season
            }
          }
        }
      }
      volumes
      genres
      synonyms
      averageScore
      favourites
      meanScore
      popularity
      duration
      description
      status
      stats{
        scoreDistribution {
          score
          amount
        }
        statusDistribution {
          status
          amount
        }
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      source
      studios {
        edges {
          id
          isMain
          node {
            id
            name
          }
        }
      }
      bannerImage
      coverImage{
        extraLarge
        large
        medium
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
    }
  }
} 
`;

const SPOTLIGHT_ANIMES_QUERY = `
query {
  Page(page: 1, perPage:8,) {
    media(isAdult: false, sort: [POPULARITY_DESC], status: RELEASING, type: ANIME ) {
      id
      title {
        romaji
        english
        native
      }
      startDate {
        year
        month
        day
      }
      bannerImage
      coverImage {
        extraLarge
      }
      format
      duration
      description
      startDate {
        year
        month
        day
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
    }
  }
}
`;

const ANIMES_SEARCH_QUERY = `
query ($search: String) {
  Page (page: 1, perPage: 5,)  {
    media(type:ANIME, search: $search) {
      id
      title {
        romaji
        english
        native
      }
      episodes
      format
      duration
      coverImage {
        extraLarge
      }
    }
  }
}
`;

export {
  TRENDING_ANIMES_QUERY,
  POPULAR_ANIMES_QUERY,
  TOP_RANKING_ANIMES_QUERY,
  BROWSE_ANIMES_QUERY,
  ANIME_QUERY_BY_ID,
  SPOTLIGHT_ANIMES_QUERY,
  TOP_AIRING_ANIMES_QUERY,
  ANIMES_SEARCH_QUERY,
};
