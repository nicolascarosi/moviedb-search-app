import { genreType, movieType } from "../types";

const genresMock:genreType[] = [
    {
        id: 12,
        name: "Aventura",
        amount: 1
    },
    {
        id: 28,
        name: "Acción",
        amount: 1
    },
    {
        id: 878,
        name: "Ciencia ficción",
        amount: 1
    }
]

const mockMovie:movieType = {
    id: 0,
    original_title: "Star Wars - A New Hope",
    release_date: "1997 - 03 - 27",
    poster_path: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/ahT4ObS7XKedQkOSpGr1wQ97aKA.jpg",
    credits: {
        crew: [{
            name: "George Lucas",
            job: "Director"
        }],
        cast: [
            {
                id: 0,
                name: "Harrison Ford"
            },
            {
                id: 1,
                name: "Mark Hamill"
            }
        ],
    },
    genres: genresMock
};

const mockListMovies:movieType[] = [mockMovie]

export {mockMovie, mockListMovies, genresMock};