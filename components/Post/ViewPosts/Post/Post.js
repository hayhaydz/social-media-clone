
const Post = ({ first_name, last_name, username, text, date_published }) => {
    let date = new Date(date_published).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});

    return (
        <div className="card bg-neutral p-6 mb-16 max-w-xl m-auto">
            <div className="flex items-center">
                <h3 className="!m-0 !mr-4">{first_name} {last_name}</h3>
                <span className="text-gray-400">@{username}</span>
                <span className="mx-4 text-gray-400"> · </span>
                <span className="text-gray-400">{date}</span>
            </div>

            <p>{text}</p>
        </div>
    )
}
export default Post;