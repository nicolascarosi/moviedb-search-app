import {Box, Stack, Chip, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {castType, genreType, movieType} from '../../types';

const MovieCard = ({movie}: {movie: movieType}):JSX.Element => (
  <article className="default-card" title={movie.original_title}>
    <Card sx={{ display: 'flex', position: 'relative' }}>
      {movie.poster_path ?
      <CardMedia
        sx={{ maxWidth: '160px'}}
        component="img"
        image={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
        alt={`${movie.original_title}`}
      />
      :
      <Box sx={{ maxWidth: '160px', minHeight: '240px', backgroundColor: 'primary.dark', width: '100%'}}/>
      }
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {movie.original_title} - ({movie.release_date.split('-')[0]})
        </Typography>
        {movie.credits.crew[0] &&
        <>
          <Typography gutterBottom variant="subtitle2">
            Dirigida por:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>{movie.credits.crew[0].name}</Typography>
        </>
        }
        {movie.credits.cast.length ? 
        <>
          <Typography gutterBottom variant="subtitle2">
            Actores:
          </Typography>
          <Typography variant="caption" display="block" className="cast-item" gutterBottom>
            {movie.credits.cast.map((cast:castType) => <span key={`cast-${cast.id}`}>{cast.name}</span>)}
          </Typography>
        </>
        : null}
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: '15px' }}>
          {movie.genres.map((genre: genreType) => <Chip label={genre.name} size="small" key={`genre-movie-${genre.id}`}/>)}
        </Stack>
      </CardContent>
    </Card>
  </article>
);

export default MovieCard;