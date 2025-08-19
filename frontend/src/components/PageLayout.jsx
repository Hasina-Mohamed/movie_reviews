import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../ExportFiles'
import MobileNav from './MobileNav'

const PageLayout = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-[#0E1628] via-[#161D2F] to-[#0E1628]'>
            <Sidebar />
            <MobileNav />
            <main className='lg:ml-[240px] min-h-screen pb-20 lg:pb-0'>
                <div className='p-4 lg:p-6 pt-6 lg:pt-6'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default PageLayout

