import react, { useState } from 'react';
import { loginUser } from '../../services/auth';

const App = () => {

    const handleForm = (e) => {
        e.preventDefault();
        let form = document.getElementById('form');

        let data = new FormData(form);
        let object = {};
        data.forEach((value, key) => object[key] = value);
        loginUser(object);
    }

    return (
        <div className="app">
            <h1>Login to API</h1>
            <form action="#" id="form" name="form" onSubmit={(e) => handleForm(e)}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" type="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default App