import Router from 'next/router';

let inMemory;

export const login = async ({ access_token, access_token_expiry }, noRedirect) => {
    inMemory = {
        token: access_token,
        expiry: access_token_expiry
    };

    if(!noRedirect)
        Router.push('/app');
}

export const auth = () => {
    const access_token = inMemory;

    if(!access_token){
        Router.push('/login');
    }

    return access_token;
}