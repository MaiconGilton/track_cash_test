import React from 'react'
import Footer from './Footer'
import '@styles/content.scss'
import { useAppSelector } from '../store/hooks'
import Dashboard from '@pages/Dashboard'
import Navbar from './Navbar'

const Content = () => {
    const redux = useAppSelector(state => state)
    // console.log({ redux })

    return (
        <main>
            <Navbar />
            <Dashboard />
            <Footer />
        </main>
    )
}
export default React.memo(Content)