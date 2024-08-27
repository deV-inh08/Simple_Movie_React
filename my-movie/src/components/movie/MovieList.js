import React, { useEffect, useState } from "react";
import {SwiperSlide, Swiper} from "swiper/react";
import "swiper/scss";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import {fetcher} from "../../config/config"

// https://api.themoviedb.org/3/movie/157336?api_key=939b4d71a1347aced70fc77fe9800e68

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const { data, error, isLoading } = useSWR('https://api.themoviedb.org/3/movie/now_playing?api_key=939b4d71a1347aced70fc77fe9800e68', fetcher)
    
    useEffect(() => {
        setMovies(data.results)
    }, [data])
    console.log(movies)
    return(
        <div className="movie-list">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={'auto'}>
                <SwiperSlide>
                    <MovieCard></MovieCard>
                </SwiperSlide>
                <SwiperSlide>
                    <MovieCard></MovieCard>
                </SwiperSlide>
                <SwiperSlide>
                    <MovieCard></MovieCard>
                </SwiperSlide>
                <SwiperSlide>
                    <MovieCard></MovieCard>
                </SwiperSlide>
                <SwiperSlide>
                    <MovieCard></MovieCard>
                </SwiperSlide>
                <SwiperSlide>
                    <MovieCard></MovieCard>
                </SwiperSlide>
                <SwiperSlide>
                    <MovieCard></MovieCard>
                </SwiperSlide>
                <SwiperSlide>
                    <MovieCard></MovieCard>
                </SwiperSlide>
            </Swiper>
      </div>
    )
};
export default MovieList;