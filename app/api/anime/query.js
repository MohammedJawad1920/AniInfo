const POPULAR_ANIME_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(type: ANIME, sort: [POPULARITY_DESC]) {
      id
      title {
        romaji
        english
        native
      }
      trending
      type
      format
      status
      episodes
      duration
      averageScore
      popularity
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
      genres
      studios(isMain: true) {
        nodes {
          name
        }
      }
      trailer {
        id
        site
      }
      coverImage {
        large
        medium
        color
        extraLarge
      }
      description
    }
  }
}
`;

const ANIME_RANKING_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(type: ANIME, sort: [POPULARITY_DESC]) {
      id
      title {
        romaji
        english
        native
      }
      type
      format
      status
      episodes
      duration
      averageScore
      popularity
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
      genres
      studios(isMain: true) {
        nodes {
          name
        }
      }
      trailer {
        id
        site
      }
      coverImage {
        large
        medium
        color
        extraLarge
      }
      description
    }
  }
}
`;

const BROWSE_ANIME_QUERY = `
query (
  $page: Int,
  $perPage: Int,
  $seasonYear: Int,
  $averageScore_greater: Int,
  $averageScore_lesser: Int,
  $popularity_greater: Int,
  $popularity_lesser: Int,
  $genre: String,
  $format: MediaFormat,
  $type: MediaType,
  $sort: [MediaSort],
  $status: MediaStatus,
  $season: MediaSeason,
) {
  Page (page: $page, 
        perPage: $perPage,
  ) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media (
      type: $type,
      seasonYear: $seasonYear,
      genre: $genre,
      averageScore_greater: $averageScore_greater,
      averageScore_lesser: $averageScore_lesser,
      popularity_greater: $popularity_greater,
      popularity_lesser: $popularity_lesser,
      format: $format,
      sort: $sort,
      status: $status,
      season: $season,
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
      volumes
      genres
      averageScore
      popularity
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

export { POPULAR_ANIME_QUERY, ANIME_RANKING_QUERY, BROWSE_ANIME_QUERY };
