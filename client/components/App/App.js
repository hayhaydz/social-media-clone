import { ViewPosts } from '../';

const App = ({ jwt, currentUser }) => {

    return (
        <section className="app">
            <ViewPosts jwt={jwt} currentUser={currentUser} BASE_URL={`${process.env.PRIVATE_API_URL}/api/post`} PUBLIC_URL={`${process.env.NEXT_PUBLIC_API_URL}`}/>
        </section>
    )
}
export default App