import React, { useEffect, useState } from "react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import {SwiperSlide, Swiper} from "swiper/react";
import useSWR from "swr";
import {fetcher, tmdbAPI} from "../../config/config"
import LoadingSkeleton from "../loading/LoadingSkeleton";


const MovieList = ({ type = "now_playing" }) => {
    const [movies, setMovies] = useState([]);
    const { data, error, isLoading } = useSWR(tmdbAPI.getMoviesList(type), fetcher)
    
    useEffect(() => {
       if(data && data.results) {
        setMovies(data.results)
       }
    }, [data])
    return (
        <div className="movie-list">
            {isLoading && !data && 
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={'auto'}>
                        {movies.length > 0 && movies.map((item) => {
                            return(
                                <SwiperSlide>
                                    <MovieCardSkeleton></MovieCardSkeleton>
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
            }
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