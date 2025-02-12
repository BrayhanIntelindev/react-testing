import { useState } from 'react'

export const Counter = () => {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <h1>clicked {count} times</h1>
            <button type='button' onClick={handleClick}>Increment</button>
        </div>
    )
}
