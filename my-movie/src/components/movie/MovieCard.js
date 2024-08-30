import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../config/config";
import {withErrorBoundary} from "react-error-boundary"
import LoadingSkeleton from "../loading/LoadingSkeleton";
// import PropTypes from "prop-types";
var PropTypes = require('prop-types');

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

MovieCard.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string, vote_average: PropTypes.number, release_date: PropTypes.string,
        poster_path: PropTypes.string, id: PropTypes.string
    })
};

function FallbackComponent() {
    return(
        <p className="bg-red-50 text-red-400">Something went Error with this components</p>
    )
}
export default withErrorBoundary(MovieCard, {
    FallbackComponent,
});


export const MovieCardSkeleton = () => {
    return(
        <Fragment>
             <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
                    <LoadingSkeleton width="100%" height="250px" radius="8px" className="mb-5"></LoadingSkeleton>
                    <div className="flex flex-col flex-1">
                        <h3 className="text-xl font-bold mb-3">
                            <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
                        </h3>
                        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                            <span><LoadingSkeleton width="50px" height="10px"></LoadingSkeleton></span>
                            <span><LoadingSkeleton width="30px" height="10px"></LoadingSkeleton></span>
                        </div>
                        <LoadingSkeleton width="100%" height="40px" radius="8px"></LoadingSkeleton>
                    </div>
                </div>
        </Fragment>
    )
}