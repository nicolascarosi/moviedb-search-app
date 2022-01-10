import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid';
import {movieType} from '../../types';

const MovieList = ({movies}: {movies: movieType[]} ):JSX.Element => {

  return (
    <div className="movie-list">
      <Grid container rowSpacing={2} columnSpacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {movies && movies.map((movie: movieType) => (
          <Grid item xs={4} sm={8} md={6} key={`movie-${movie.id}`}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MovieList;