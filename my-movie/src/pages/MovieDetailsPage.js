import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, API_KEY} from "../config/config";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const { data, err } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`, fetcher);
    console.log(data)
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
                    <p className="text-center text-white text-sm leading-relaxed max-w-[600px] mx-auto">{data.overview}</p>
               </div>
            }
        </Fragment>    
    )
};

export default MovieDetailsPage;