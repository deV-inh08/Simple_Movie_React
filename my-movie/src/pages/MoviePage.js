import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config/config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from 'react-paginate';
const itemsPerPage = 20;

const MoviePage = () => {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [nextPage, setNextPage] = useState(1)
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState(`${tmdbAPI.setMoviePopular(nextPage)}`)
    const filterDebounce = useDebounce(filter, 500);
    const { data, error, isLoading } = useSWR(url, fetcher);
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    };
    useEffect(() => {
        if(filterDebounce) {
            setUrl(`${tmdbAPI.setMovieQuery("search", filterDebounce, nextPage)}`)
        } else {
            setUrl(`${tmdbAPI.setMoviePopular(nextPage)}`)
        }
    }, [filterDebounce, nextPage])
    const movies = data?.results || [];

    useEffect(() => {
        if(!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage))
    }, [data, itemOffset])
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        event.selected = event.selected + 1;
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected);
    };
    return(
        <div className="py-10 page-container">
            <div className="flex mb-10">
                <div className="flex-1">
                    <input 
                        type="text"
                        className="w-full p-4 bg-slate-800 outline-none text-white"
                        placeholder="Type here to search"
                        onChange={handleFilterChange}
                    />
                </div>
                <button className="p-4 bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            {!data && isLoading && <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 animate-spin mx-auto"></div>}
            {data && !isLoading && 
                <Fragment>
                    <div className="grid grid-cols-4 gap-10">
                        {movies.length > 0 && movies.map((item) => {
                            return(
                                <MovieCard key={item.id} item={item}></MovieCard>
                            )
                        })}
                    </div>
                    <ReactPaginate
                        className="pagination"
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />
                </Fragment>
            }
        </div>
    )
};

export default MoviePage;