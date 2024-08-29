import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../config/config"

const MovieCard = ({ item } ) => {
    const navigate = useNavigate()
    return (
            <Fragment>
                {item && Object.keys(item).length > 0 && (
                    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
                        <img
                            src={`${tmdbAPI.imageBanner500(item.poster_path)}`}
                            alt=""
                        className="w-full h-[250px] object-cover rounded-lg mb-5"
                        />
                        <div className="flex flex-col flex-1">
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                                <span>{new Date(item.release_date).getFullYear()}</span>
                                <span>{item.vote_average.toFixed(1)}</span>
                            </div>
                            <Button onClick={() => navigate(`/movie/${item.id}`)} ></Button>
                        </div>
                    </div>
                )}
            </Fragment>
        );
};
export default MovieCard;

