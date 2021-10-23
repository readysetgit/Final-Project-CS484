const logIn = (username, name) => {
    localStorage.setItem('username', username)
    localStorage.setItem('name', name)
}

const logOut = (username, name) => {
    localStorage.clear();
}

export {logIn, logOut}