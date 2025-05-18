import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { Bookmark, MovieDetails, Movies, PageLayout, UserLogin, UserRegister, Watchlist } from './ExportFiles'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Routes>
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-register' element={<UserRegister />} />
        <Route path='/' element={<PageLayout />}>
          <Route index element={<Movies />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/movie-detail/:id' element={<MovieDetails />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App



