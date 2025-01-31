import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { Bookmark, MovieDetails, Movies, PageLayout, UserLogin, UserRegister } from './ExportFiles'
function App() {
  return (
    <>
      <Routes>
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-register' element={<UserRegister />} />
        <Route path='/' element={<PageLayout />}>
          <Route index element={<Movies />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='/movie-detail/:id' element={<MovieDetails />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App