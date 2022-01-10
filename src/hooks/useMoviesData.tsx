import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from "swr";
import {crewType, castType, creditsType, genreType, movieType} from '../types';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const API_KEY_MOVIEDB = process.env.REACT_APP_API_KEY_MOVIEDB;
const LANG = "es";

const fetcher = (url: string, params: any) => axios.get(url, params).then(res => {
    return res.data
});

const useMoviesData = () => {

    const [loading, setLoading] = useState<Boolean>(false);
    const [genres, setGenres] = useState<genreType[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<movieType[]>([]);
    const [allMovies, setAllMovies] = useState<movieType[]>([]);
    const [textToSearch, setTextToSearch] = useState<string>("");

    const {data, error} = useSWR(textToSearch.length ? [`/search/movie`, {params: {api_key: API_KEY_MOVIEDB, language: LANG, query: textToSearch, include_adult: false, page: 1} }] : null, fetcher);

    useEffect(() => {
        //When fetch to movies finish
        if (data) getMovieAndCredits(data.results);
        if (error) console.error(error);
    }, [data])

    const searchMovies = (text:string):void => {
        setLoading(true);
        setTextToSearch(text);
    }
    
    const filterCredits = (credits:creditsType):creditsType => {
        let directors:any = [];
        let mainCast:castType[];
        let newCredits:creditsType = {crew: [], cast: []};
        //Main cast
        mainCast = credits.cast.slice(0, 3);
        //Directors
        directors.push(credits.crew.find((elem:crewType) => elem.job === "Director"));
        newCredits.cast = mainCast;
        newCredits.crew = directors;
        return newCredits;
    }

    const getMovieAndCredits = (movies: movieType[]):void => {
        let searchedMovies:movieType[] = [];
        let genresCount:any = {};
        let promises:Promise<void>[] = [];
        for (var i in movies) {
            promises.push(axios.get(`/movie/${movies[i].id}`, {params: {api_key: API_KEY_MOVIEDB, language: LANG, append_to_response: 'credits'} })
            .then((res) => {
                let data:movieType = {...res.data};
                data.credits = filterCredits(data.credits);
                searchedMovies.push(data);
                //Group genres
                data.genres.forEach((genre:genreType) => {
                    genresCount[genre.name] = genresCount[genre.name] ? {id: genre.id, name: genre.name, amount: genresCount[genre.name].amount + 1} : {id: genre.id, name: genre.name, amount: 1};
                });
            })
            .catch((err) => {
                console.error(err);
            }))
        }

        Promise.all(promises)
        .then(() => {
            if (searchedMovies.length) {
                setAllMovies(searchedMovies);
                setFilteredMovies(searchedMovies)
                let genresResult:genreType[] = [];
                for (var i in genresCount) genresResult.push(genresCount[i]);
                genresResult = genresResult.sort((a, b) => a.name.localeCompare(b.name))
                genresResult.unshift({id: 0, name: "Todas ", amount: searchedMovies.length});
                setGenres(genresResult);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }

    const filterMoviesByGenre = (genreToFilter:number):void => {
        setLoading(true);
        let newMovies: movieType[] = []
        if (genreToFilter === 0) newMovies = [...allMovies];
        else {
            newMovies = allMovies.filter((movie:movieType) => {
                let genreMatch;
                movie.genres.forEach((genreItem:genreType) => {
                    if (genreItem.id === genreToFilter) genreMatch = true;
                });
                return genreMatch;
            });
        }
        setFilteredMovies(newMovies);
        setLoading(false)
    }

    

    return {
        loading,
        genres,
        filteredMovies,
        filterMoviesByGenre,
        searchMovies
    }
};

export default useMoviesData;