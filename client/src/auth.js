const logIn = (username, name) => {
    console.log(localStorage)
    localStorage.setItem('username', username)
    localStorage.setItem('name', name)
    console.log(localStorage)
}

const logOut = (username, name) => {
    localStorage.clear();
}

export {logIn, logOut}