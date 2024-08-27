import React from "react";

const MovieCard = () => {
    return(
        <div className="movie-card rounded-lg p-3 bg-slate-800">
            <img
              src="https://cdn.marvel.com/content/1x/avengersendgame_lob_mas_mob_01.jpg"
              alt=""
              className="w-full h-[250px] object-cover rounded-lg mb-5"/>
            <h3 className="text-white text-xl font-bold mb-3">Spiderman: Home comming</h3>
            <div className="flex items-center justify-between text-sm opacity-50 text-white mb-5">
                <span>2017</span>
                <span>7.4</span>
            </div>
            <button className="py-3 px-6 rounded-lg capitalize text-white bg-primary w-full">
                Watch now
            </button>
        </div>
    )
};
export default MovieCard;