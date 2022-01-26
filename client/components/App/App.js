import { ViewPosts } from '../';

const App = ({ jwt, currentUser }) => {

    return (
        <section className="app">
            <span className="block mb-4">Welcome</span>
            <h1>{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
            <ViewPosts jwt={jwt} currentUsersID={currentUser.user_id} url={`${process.env.PRIVATE_API_URL}/api/post`}/>
        </section>
    )
}
export default App