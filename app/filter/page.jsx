"use client"
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import FilterDropDown from '../../components/FilterDropDown';
import SecondFilterDropDown from '../../components/SecondFilterDropDown';
import { GENRES, YEARS, AVERAGE_SCORES, url, POPULARITY, FORMATS, TYPES, SORT, STATUS, SEASONS } from '../../constants/page';
import { BROWSE_ANIME_QUERY } from '../api/anime/query';
import CustomButton from '../../components/CustomButton';
import FilterResults from '../../components/FilterResults';



const Page = () => {
  const [type, setType] = useState(undefined)
  const [genre, setGenre] = useState(undefined)
  const [format, setFormat] = useState(undefined)
  const [sort, setSort] = useState(undefined)
  const [status, setStatus] = useState(undefined)
  const [season, setSeason] = useState(undefined)
  const [seasonYear, setSeasonYear] = useState(undefined)
  const [averageScoreGreater, setAverageScoreGreater] = useState(undefined)
  const [averageScoreLesser, setAverageScoreLesser] = useState(undefined)
  const [popularityGreater, setPopularityGreater] = useState(undefined)
  const [popularityLesser, setPopularityLesser] = useState(undefined)
  const [page, setPage] = useState(1)
  const [animes, setAnimes] = useState([])

  const variables = {
      type,
      genre,
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
      perPage: 15,
  };

  const query = BROWSE_ANIME_QUERY;

  const fetchResults = async () => {
    try {
      const response = await axios.post(url, {
        query,
        variables,
      });
  
      const responseData = response.data.data.Page.media;
      setAnimes(responseData)
  
    } catch (error) {
      console.error("Error fetching anime data :", error);
      setAnimes([]);
    }

  }

useEffect(() => {  
  fetchResults();
},[])
  
  return(
    <div className="mt-14 md:mt-20  text-white">
      <div className='md:mx-12 p-4'>

        {/* Filter */}
        <h2 className='text-lg md:text-xl font-semibold mb-2'>Filter</h2>
        <div className=' bg-slate-800  p-6 rounded'>
          <div className='flex flex-wrap md:gap-5 gap-x-10 gap-y-5 mb-6 '>
           <FilterDropDown
              title={'Type'}
              filterItems={TYPES}
              setVariable={setType} />

           <FilterDropDown
              title={'Genre'}
              filterItems={GENRES}
              setVariable={setGenre} />

           <FilterDropDown
              title={'Format'}
              filterItems={FORMATS}
              setVariable={setFormat} />

           <FilterDropDown
              title={'Year'}
              filterItems={YEARS}
              setVariable={setSeasonYear} />

           <SecondFilterDropDown
              title={'Popularity'}
              filterItems={POPULARITY}
              greater={popularityGreater}
              setGreater={setPopularityGreater}
              lesser={popularityLesser}
              setLesser={setPopularityLesser}
           />

           <SecondFilterDropDown
              title={'Score'}
              filterItems={AVERAGE_SCORES}
              greater={averageScoreGreater}
              setGreater={setAverageScoreGreater}
              lesser={averageScoreLesser}
              setLesser={setAverageScoreLesser} />

           <FilterDropDown
              title={'Status'}
              filterItems={STATUS}
              setVariable={setStatus} />

           <FilterDropDown
              title={'Season'}
              filterItems={SEASONS}
              setVariable={setSeason} />

           <FilterDropDown
              title={'Sort'}
              filterItems={SORT}
              setVariable={setSort} />


          </div>
          <div>
            <CustomButton
              className={'bg-amber-400 px-3 mt-10 rounded font-bold py-1 text-black'}
              title={'Filter'}
              handleClick={fetchResults} />
          </div>
        </div>
        
        {/* Result */}
        <FilterResults animes={animes} />
      </div>
    </div>
  )
};

export default Page;


