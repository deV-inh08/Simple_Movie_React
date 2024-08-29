import React from "react";
import useSWR from "swr";
import {fetcher} from "../../config/config";
import {SwiperSlide, Swiper} from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router";


const Banner = () => {
    const API_KEY = "939b4d71a1347aced70fc77fe9800e68";
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`, fetcher);
    const movies = data?.results || [];
    return (
        <section className="banner h-[550px] page-container mb-10">
            <Swiper grabCursor={"true"} slidesPerView={"auto"}>
                {movies.length > 0 && movies.map((item) => {
                    return(
                        <SwiperSlide key={item.id}>
                            <BannerItem item={item}></BannerItem>
                        </SwiperSlide>
                    )
                })}
            </Swiper> 
        </section>
    )
};

function BannerItem({ item }) {
    const {title, poster_path, overview, id} = item;
    const navigate = useNavigate();
    return(
        <div className="w-full h-full rounded-lg bg-white relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img 
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt=""
                className="w-full h-full object-cover rounded-lg object-top"
            />
            <div className="absolute left-5 bottom-0 w-full text-white">
                <h2 className="font-bold text-3xl mb-5">{title}</h2>
                    <div className="text-[#ccc] w-[700px] mb-4 font-semibold text-lg">
                        <p>{overview}</p>
                    </div>
                <Button className="mb-4" onClick={() => navigate(`/movie/${id}`)}></Button>
                {/* <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium mb-4">Watch Now</button> */}
            </div>
        </div>
    )
}

export default Banner;