import { LoadingIcon } from '@assets/images'
import React from 'react'

const Loading = ({ visible, size, text = '' }) => {
    if (!visible) return null

    return (
        <div className="loading">
            <LoadingIcon
                className='loading-icon'
                width={size}
                height={size}
            />

            {text}
        </div>
    )
}
export default Loading