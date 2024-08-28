import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, API_KEY} from "../config/config";

import {SwiperSlide, Swiper} from "swiper/react";
import MovieCard from "../components/movie/MovieCard";


const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const { data, err } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`, fetcher);
    return(
        <Fragment>
            {data && 
               <div className="py-10">
                     <div className="w-full h-[600px] relative mb-10">
                        <div className="absolute inset-0 bg-opacity-75 bg-black"></div>
                        <div className="w-full h-full bg-cover" style={{
                                backgroundImage: `url( "https://image.tmdb.org/t/p/original${data.backdrop_path}")`}}>
                        </div>
                    </div>
                    <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                        <img 
                            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <h1 className="text-center text-3xl text-white font-bold mb-10">{data.title}</h1>
                    {
                        data.genres.length > 0 && 
                            <div className="flex items-center justify-center gap-x-5 mb-10">
                                {data.genres.map((item) => {
                                    return (
                                        <span className="py-2 px-4 border-primary text-primary border rounded" key={item.id}>{item.name}</span>
                                    )
                                })}
                            </div>
                    }
                    <p className="text-center text-white text-sm leading-relaxed max-w-[600px] mx-auto mb-10">{data.overview}</p>
                    <MovieCredits></MovieCredits>
                    <MovieVideo></MovieVideo>
                    <MovieSimilar></MovieSimilar>
               </div>
            }
        </Fragment>    
    )
};

function MovieCredits() {
    const { movieId } = useParams();
    const { data, err } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`, fetcher);
    if(!data) return null;
    const { cast } = data;
    return(
        <Fragment>
            <h2 className="text-center text-2xl font-bold text-white">Casts</h2>
            <div className="grid grid-cols-6 gap-5 mt-3">
               {cast.length > 0 && cast.slice(0, 6).map((item) => {
                    return (
                        <div key={item.id} className="cast__item">
                            <img
                                 src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                                alt=""
                                 className="w-full h-[250px] object-cover rounded-lg"
                            />
                            <p className="text-white mt-2 font-semibold text-center">{item.name}</p>
                        </div>
                    )
               })}
            </div>
        </Fragment>
    )
};

function MovieVideo() {
    const { movieId } = useParams();
    const { data, err } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`, fetcher);
    if(!data) return null;
    const {id , results} = data;
    if(!results || results.length < 0) return null;
    return(
        <div className="py-10">
            {results.slice(0, 2).map((item) => {
                return(
                    <div className="w-full aspect-video" key={item.id}>
                        <iframe 
                            width="948" height="590" src={`https://www.youtube.com/embed/${item.key}`}
                            title={`${item.name}`}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className="w-full h-full object-fill">
                        </iframe>
                    </div>
                )
            })}
        </div>
    )
}

function MovieSimilar() {
    const { movieId } = useParams();
    const { data, err } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`, fetcher);
    if(!data) return null;
    const { results } = data;
    if(!results || results.length < 0) return null;
    return(
        <div>
            <h3 className="text-white font-bold text-2xl mb-3">Similar Movies</h3>
            <div className="movie-list">
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={'auto'}>
                    {results.length > 0 && results.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <MovieCard item={item}></MovieCard>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}



export default MovieDetailsPage;