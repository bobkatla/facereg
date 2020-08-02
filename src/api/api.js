const api = 'http://localhost:5000';

async function getAllUsers() {
    const resp = await fetch(`${api}/`);
    const data = await resp.json();
    return data;
}

async function checkUser(email, password) {
    const resp = await fetch(`${api}/signin`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email,
            password
        })
    });
    const dataResp = await resp.json();
    return dataResp;
}

/*
understanding return in promise and async function and how to use '.then' with them

so when we use .then it will pass a function and that function will take the return
of the previous state or promise, hence, the promise will return something and that is 
how we can use async along with .then. If we only use the return solely with asyn function
then it will not work as it is async hence the assigned result is a pending promise.
To think simple, the async function is a promise, to access the return value of the asyn function
we need to use .then((the return value) => {accessing the return value}). This also explais
why we can do:
    const resp = await fetch(`${api}/`);
    const data = await resp.json();
To think about it, fetch is returning something, that is the reason why we can assign value to the var resp
You can wonder why we can do it here but not outside, it is because of the 'await' keyword, and the await keyword only
can be used inside an async function.
*/

export {getAllUsers, checkUser};
