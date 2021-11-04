import withAuthentication from "../../utils/withAuthentication";

export const getServerSideProps = withAuthentication(() => {
    return {
        props: {},
    };
});

const adminHomepage = () => {
    return (
        <div classname="admin">
            <h1>ADMIN HOMEPAGE</h1>
            <p>MUST BE AUTHENTICATED TO ACCESS</p>
        </div>
    )
}