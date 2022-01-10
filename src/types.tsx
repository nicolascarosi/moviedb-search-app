export type movieType = {
    id: number,
    poster_path: string,
    original_title: string,
    release_date: string,
    credits: creditsType,
    genres: genreType[]
}

export type creditsType = {
    crew: crewType[],
    cast: castType[]
}

export type genreType = {
    id: number,
    name: string,
    amount: number | undefined
}

export type castType = {
    id: number,
    name: string,
}

export type crewType = {
    job: string,
    name: string
}