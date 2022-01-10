import {FormControl, FormLabel, FormControlLabel, RadioGroup, Radio} from '@mui/material';
import {genreType} from '../../types';

type GenresFilterProps = {
  genres: genreType[];
  handleChangeSelectedFilter: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

const GenresFilter = ({genres, handleChangeSelectedFilter}: GenresFilterProps):JSX.Element => (
  <section className="genres-filter">
    <FormControl component="fieldset">
      <FormLabel component="legend">Filtrar</FormLabel>
      <RadioGroup
        aria-label="genre"
        defaultValue="0"
        name="radio-buttons-group"
        onChange={handleChangeSelectedFilter}
      >
        {genres && genres.map((genre: genreType) => (
            <FormControlLabel key={`genre-${genre.id}`} data-testid={`genre-${genre.id}`} value={genre.id} control={<Radio />} label={`${genre.name} (${genre.amount})`} />
        ))}
      </RadioGroup>
    </FormControl>
  </section>
);
  
export default GenresFilter;