import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../config/config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from 'react-paginate';
const itemsPerPage = 20;

const MoviePage = () => {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [nextPage, setNextPage] = useState(1)
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=939b4d71a1347aced70fc77fe9800e68&page=${nextPage}`)
    const filterDebounce = useDebounce(filter, 500);
    const { data, error, isLoading } = useSWR(url, fetcher);
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    };
    useEffect(() => {
        if(filterDebounce) {
            setUrl(`https://api.themoviedb.org/3/search/movie?api_key=939b4d71a1347aced70fc77fe9800e68&query=${filterDebounce}&page=${nextPage}`)
        } else {
            setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=939b4d71a1347aced70fc77fe9800e68&page=${nextPage}`)
        }
    }, [filterDebounce, nextPage])
    const movies = data?.results || [];
    const page = data?.page;
    const defaultCountPage = 5;

    useEffect(() => {
        if(!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage))
    }, [data])
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log(event)
      const newOffset = (event.selected * itemsPerPage) % data.total_results;
      setItemOffset(newOffset);
      setNextPage(event.selected + 1)
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
                    {/* <div className="flex items-center justify-center mt-9 text-white">
                        <span className="cursor-pointer">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor"
                                className="size-6"
                                onClick={() => nextPage > 1 ? setNextPage(nextPage - 1) : null}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </span>
                        {new Array(defaultCountPage).fill(0).map((item, index) => (
                            <span 
                                key={index}
                                className="mx-3 cursor-pointer inline-block p-2 px-4 rounded-md leading-none bg-white text-slate-900"
                                onClick={() => {setNextPage(index + 1)}}>{index + 1}
                            </span>
                        ))}
                        <span className="cursor-pointer">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor" 
                                className="size-6"
                                onClick={() => {setNextPage(nextPage + 1)}}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>
                    </div> */}
                </Fragment>
            }
        </div>
    )
};

export default MoviePage;