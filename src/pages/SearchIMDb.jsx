import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import getPopular from '../utils/movie/getPopular';
// import getTvPopular from '../utils/tvShows/getTvPopular';
import '../component/shared/layout/navbar.css'

const SearchIMDb = (prop) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  // const [tvs , setTvs] = useState([]); 
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const {t} = useTranslation();

  useEffect(() =>{
    const fetchPopularMovies = async () => {
      const movies = await getPopular(); 
      setMovies(movies);
      // const tvs = await getTvPopular();
      // setTvs(tvs);
      // console.log(tvs);
      
      console.log(movies);
    };
    
    fetchPopularMovies();
  },[])
  
  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Update query based on user input
    setSearched(true); // Set searched to true when user types in the search input
  };


  const handelSelecyed = () => {

  }

  const handleBlur = () => {
    const result = document.getElementById('search-reault');
    result.style.display = 'none';
    const input = document.querySelector('input');
    input.style.marginBottom = '1rem';
    input.style.marginTop = '0rem';
  };
    

  const handelFocus = () => {
    const result = document.getElementById('search-reault');
    result.style.display = 'block !important';
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
  // const filteredTV = tvs.filter((tv) =>
  //   tv.title.toLowerCase().includes(query.toLowerCase())
  // );

  return (
    <div className='mt-3'>
     <div className=' d-flex'>
        {/* Search input */}
        <select className ={`search-category btn  mx-1 ${prop.theme === 'dark' ? 'btn-outline-warning': 'btn-dark'}`}
          onChange={handelSelecyed()}
        >
          <option  onClick={()=>{navigate('/')}}>{t('All')}</option>
          <option  onClick={()=>{navigate('/tv/top_rated')}}>{t('Top Rated')}</option>
          <option  onClick={()=>{navigate('/movie/top rated')}}>{t('Celebrities')}</option>
          <option  onClick={()=>{navigate('/movie/popular')}}>{t('Most Popular')}</option>
        </select>
        <input
          type="search"
          placeholder={t('Search IMDb')}
          className={`search-input form-control ${prop.theme ==='dark' ? 'outline' : 'shadow-black'}`}
          value={query}
          style={{position : 'relative'}}
          onChange={handleSearchChange}
          // onBlur={()=>{if(!searched){handleBlur()}}}
          onFocus={handelFocus}

          // Add onBlur handler
          
        />
     </div>

      {/* Show loading indicator while fetching */}
      { (
        <ul id='search-reault' className=' position-absolute z-2  w-25 h-75 overflow-auto'>
          {/* Display filtered movies or a message if none are found only if searched */}
          {/* || filteredTV.length > 0 */}
          {searched && (filteredMovies.length > 0  ? (
            <>
              {filteredMovies.map((movie) => (
                <p key={movie.id} onClick={() => {
                  navigate(`/showmovie/${movie.id}`);
                  handleBlur();
                }} 
                className='bg-warning rounded-2 text-black p-1 w-100'>{movie.title}</p>
              ))}
              {/* {filteredTV.map((tv) => (
                <p key={tv.id} onClick={() => {
                  navigate(`/showtv/${tv.id}`);
                  handleBlur();
                }} 
                className='bg-warning rounded-2 text-black p-1 w-100'>{tv.title}</p>
              ))} */}
            </>
          ) : (
            <p>{t('No results found')}</p>
          ))}
        </ul>
      )}
 
    </div>
  );
};

export default SearchIMDb;

