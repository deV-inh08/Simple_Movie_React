import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";
import Banner from "../components/banner/Banner";

const HomePage = () => {
    return(
        <Fragment>
            {/* Now playing */}
            <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-5 text-2xl font-bold">Now Playing</h2>
                <MovieList></MovieList>
            </section>

            {/* Trending */}
            <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-5 text-2xl font-bold">Trending</h2>
                <MovieList type="popular"></MovieList>
            </section>

            {/* Top Rated */}
            <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-5 text-2xl font-bold">Rated</h2>
                <MovieList type="top_rated"></MovieList>
            </section>
        </Fragment>
    )
};
export default HomePage;