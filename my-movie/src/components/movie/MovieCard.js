import React, { Fragment, useEffect } from "react";

const MovieCard = ({ item } ) => {
    return(
        <Fragment>
            {item && Object.keys(item).length > 0 && (
                <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt=""
                    className="w-full h-[250px] object-cover rounded-lg mb-5"
                    />
                    <div className="flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                        <span>{new Date(item.release_date).getFullYear()}</span>
                        <span>{item.vote_average.toFixed(1)}</span>
                    </div>
                    <button className="bg-primary px-2 py-4 rounded-lg font-bold">
                        Watch now
                    </button>
                    </div>
                </div>
            )}
        </Fragment>
        );
};
export default MovieCard;

