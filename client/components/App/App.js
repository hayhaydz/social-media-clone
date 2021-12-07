import { ViewPosts } from '../';

const App = ({ jwt, currentUser, message, setMessage }) => {

    return (
        <section className="app">
            <span className="block mb-4">Welcome</span>
            <h1>{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
            <ViewPosts jwt={jwt} currentUsersID={currentUser.user_id} message={message} setMessage={setMessage} />
        </section>
    )
}
export default App