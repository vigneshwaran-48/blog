import { NavLink } from '@/util/NavLink';
import React from 'react'
import Navbar from './components/Navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full p-2 flex flex-col sm:flex-row">
            <Navbar />
            <section className="w-full sm:w-[calc(100%-150px)] h-full">
                { children }
            </section>
        </div>
    )
}

export default layout;