import useMoviesData from '../hooks/useMoviesData';
import { styled, alpha } from '@mui/material/styles';
import {Container, CircularProgress, AppBar, Toolbar, InputBase, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import MovieList from '../components/MovieList';
import GenresFilter from '../components/GenresFilter';

const MIN_LENGTH_SEARCH = 3;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));

const SearchPage = ():JSX.Element => {

    const {genres, searchMovies, filteredMovies, filterMoviesByGenre, loading} = useMoviesData();

    const handleChangeSelectedFilter = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
        let value:number = parseInt(e.target.value)
        filterMoviesByGenre(value)
    } 

    var delayTimer: ReturnType<typeof setTimeout>;

    const handleChangeSearchInput = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
        let value:string = e.target.value;
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => {
            if (value.length >= MIN_LENGTH_SEARCH) {
                searchMovies(value);
            }
        }, 1000);

    }

    return (
        <section className="search">
            <AppBar position="static" sx={{marginBottom: '20px'}}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Buscar pelicula"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleChangeSearchInput}
                            />
                        </Search>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="xl">
                {!loading ? 
                    <Grid container columnSpacing={3} columns={{ xs: 4, sm: 8, md: 12 }} mb={5} justifyContent="space-between">
                        {filteredMovies.length ? 
                            <>
                                <Grid item xs={10} sm={10} md={10} order={{ xs: 2, sm: 2, md: 1, lg: 1 }}>
                                    <MovieList movies={filteredMovies} />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} mb={4} order={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
                                    <GenresFilter genres={genres} handleChangeSelectedFilter={handleChangeSelectedFilter}  />
                                </Grid>
                            </>
                        : null}
                    </Grid>
                : 
                    <CircularProgress />
                }
            </Container>
        </section>
    )
}

export default SearchPage;