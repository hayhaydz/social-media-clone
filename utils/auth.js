import Router from 'next/router';
import webRoutes from './webRoutes';

let inMemory;

export const login = async ({ access_token, access_token_expiry }, noRedirect) => {
    inMemory = {
        token: access_token,
        expiry: access_token_expiry
    };

    if(!noRedirect)
        return Router.push(webRoutes.homepage);
}

export const auth = () => {
    const access_token = inMemory;

    return access_token;
}

export const withAuthSync = () => {
    
}