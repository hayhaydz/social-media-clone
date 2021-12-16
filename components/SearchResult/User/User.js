
const User = ({ first_name, last_name, username }) => {

    return (
        <div className="card bg-neutral p-6 overflow-visible w-full max-w-xl w-full transition-colors hover:bg-neutral-focus">
            <h3 className="!m-0 !mr-4">{first_name} {last_name}</h3>
            <span className="!no-underline !text-gray-400 hover:!underline">@{username}</span>
        </div>
    )
}
export default User;