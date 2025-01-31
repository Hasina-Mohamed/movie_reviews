import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../ExportFiles'
const PageLayout = () => {
    return (
        <div className='w-full'>
            <Sidebar />
            <div className='w-full relative'>
                <div className='absolute w-[75%] md:w-[65%] lg:w-[80%] top-16 right-3'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default PageLayout