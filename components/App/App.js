import react, { useState } from 'react'
import { getAllUsers, createUser } from '../../services/UserService'

const App = () => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [numberOfUsers, setNumberOfUsers] = useState(0);

    const creatingUser = (tmpUser) => {
        createUser(tmpUser)
          .then(response => {
            console.log(response);
            setNumberOfUsers(numberOfUsers + 1);
        });
    }
  
    const gettingAllUsers = () => {
      getAllUsers()
        .then(users => {
          console.log(users);
          setUsers(users);
          setNumberOfUsers(users.length);
        });
    }

    const handleForm = () => {
        let form = document.getElementById('form');
        let tmpUser = user;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let data = new FormData(form);
            for (let pair of data.entries()) {
                tmpUser[pair[0]] = pair[1];
            }

            setUser({...tmpUser});
            creatingUser(tmpUser);
        })
    }

    return (
        <div className="app">
            <h1>Working between client and server</h1>
            <form action="#" id="form">
                <label htmlFor="firstname">First name</label>
                <input type="text" id="firstname" name="firstname" />
                <label htmlFor="lastname">Last name</label>
                <input type="text" id="lastname" name="lastname"/>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                <button type="submit" onClick={() => handleForm()}>Register</button>
            </form>
        </div>
    )
}
export default App