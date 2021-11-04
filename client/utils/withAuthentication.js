import { getAuth } from './apiHandler';
import webRoutes from './webRoutes';

export default (GetServerSidePropsFunction) => async (ctx) => {
    const token = ctx.req.cookies?.jwt || null;
    const { data } = await getAuth(`${process.env.PRIVATE_API_URL}/api/user/`, token);

    console.log(data);

    if(!data.user_id) {
        return Router.push(webRoutes.unauthorised);
    }

    return await GetServerSidePropsFunction(ctx);
}