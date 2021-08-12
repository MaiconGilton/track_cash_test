import React from 'react'
import Content from '@layout/Content'
import { useHistory, useLocation } from 'react-router-dom'
import { useAppSelector } from '@store/hooks'
import redux from '@store/actions'

export default function App() {
    const history = useHistory()
    const lastRoute = useAppSelector(state => state.lastRoute)
    const location = useLocation()

    React.useEffect(() => {
        redux.saveState('lastRoute', location.pathname)
    }, [location])

    React.useEffect(() => {
        if (lastRoute) history.push(lastRoute)
    }, [history, lastRoute])

    return (
        <div className="app">
            <Content />
        </div>
    )
}
