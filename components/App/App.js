import React, { useState } from 'react';
import Link from 'next/link';

const App = () => {    
    return (
        <div className="app">
            <h1>This is a super cool NextJS app</h1>
            <Link href="/login"><a>Login Page</a></Link>
        </div>
    )
}
export default App