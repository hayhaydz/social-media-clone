export const getAuth = async (url, token) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Access-Token': `${token}` }
    }).catch(err => err.response);

    return response;
}

export const postAuth = async (data, url, token) => { 
    const response = await fetch(url, {
        method: 'POST',
        headers: { 
            'Access-Token': `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(err => err.response);

    return response;
}

export const get = async (url) => {
    const response = await fetch(url).catch(err => err.response);

    return response;
}

export const post = async (data, url) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(err => err.response);

    return response;
}