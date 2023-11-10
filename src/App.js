import './App.css';
import React, { Fragment, useState } from 'react';
import MoviesList from './components/MoviesList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    serError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');

      // response 바디 부분 파싱 전, response가 ok인지 확인.
      if(!response.ok) {
        throw new Error('Something  went wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(transformedMovies);
    } catch(error) {
      serError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies.</p>;

  if(movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if(error) {
    content = <p>{error}</p>;
  }

  if(isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </Fragment>
  );
}

export default App;
