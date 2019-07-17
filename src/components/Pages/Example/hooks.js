import React, { useState, useEffect } from 'react';

function Hook() {
    const [count, setCount] = useState(2);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    const Count = (num) => {
        return setCount(num + 1);
    }
  
    return (
        <div>
            <p>You clicked: {count} times</p>
            <button onClick={() => Count(count)}>
                Click me
            </button>
        </div>
    );
}


export default Hook;