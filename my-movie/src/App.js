import React, { Fragment, lazy, Suspense} from "react";
import "swiper/scss";
import { Route, Routes } from "react-router-dom"
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"))
const MoviePage = lazy(() => import("./pages/MoviePage"))

function App() {
  return (
    <Fragment>
      <Suspense fallback>
        <Routes>
            <Route element={<Main></Main>}>

              <Route path="/" element={
                <Fragment>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </Fragment>
              }></Route>

              <Route path="/movie" element={<MoviePage></MoviePage>}></Route>
              <Route path="/movie/:movieId" element={<MovieDetailsPage></MovieDetailsPage>}></Route>
            </Route>
        </Routes>    
      </Suspense>  
    </Fragment>
  )
}

export default App;
