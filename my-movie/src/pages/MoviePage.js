import React from "react";
import useSWR from "swr";
import { fetcher } from "../config/config";
import MovieCard from "../components/movie/MovieCard";

const MoviePage = () => {
    const { data } = useSWR("https://api.themoviedb.org/3/movie/popular?api_key=939b4d71a1347aced70fc77fe9800e68", fetcher);
    const movies = data?.results || [];
    return(
        <div className="py-10 page-container">
            <div className="flex mb-10">
                <div className="flex-1">
                    <input 
                        type="text"
                        className="w-full p-4 bg-slate-800 outline-none text-white"
                        placeholder="Type here to search"
                    />
                </div>
                <button className="p-4 bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>
            </div>
            <div className="grid grid-cols-4 gap-10">
                {movies.length > 0 && movies.map((item) => {
                    return(
                        <MovieCard key={item.id} item={item}></MovieCard>
                    )
                })}
            </div>
        </div>
    )
};

export default MoviePage;