import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import {SwiperSlide, Swiper} from "swiper/react";
import useSWR from "swr";
import {fetcher} from "../../config/config"

// https://api.themoviedb.org/3/movie/157336?api_key=939b4d71a1347aced70fc77fe9800e68

const MovieList = ({ type = "now_playing" }) => {
    const API_KEY = "939b4d71a1347aced70fc77fe9800e68";
    const [movies, setMovies] = useState([]);
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`, fetcher)
    
    useEffect(() => {
       if(data && data.results) {
        setMovies(data.results)
       }
    }, [data])
    return(
        <div className="movie-list">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={'auto'}>
                {movies.length > 0 && movies.map((item) => {
                    return (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
};
export default MovieList;