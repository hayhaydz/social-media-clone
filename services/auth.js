let inMemory;

const loginState = () => {
    
}

export const loginUser = async (obj) => {
    await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
    }).then(async (response) => {
        let data = await response.json();
        console.log(data);
    }).catch(err => console.log(err));
}