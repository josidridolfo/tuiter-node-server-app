import people from '../data/users.js' // make directory w/ users.js
let users = people

const UserController = (app) => {  // use express instance app to declare HTTP GET
    app.get('/api/users', findUsers) // request pattern /api/users to call a function
    app.get('/api/users/:uid', findUserByID);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const findUsers = (request, response) => {
    const type = request.query.type // if 'type' parameter is in query
    if (type) { // find users of that type
        const usersOfType = users
            .filter(user => user.type === type)
        response.json(usersOfType) // respond with users of that type
        return
    }
    response.json(users) // if no user of that type is found, return with all users
}

const findUserByID = (request, response) => {
    const userID = request.params.uid;
    const user = users
        .find(u => u._id === userID);
    response.json(user);
}

const createUser = (request, response) => {
    const newUser = request.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    response.json(newUser);
}

const deleteUser = (request, response) => {
    const userId = request.params['uid'];
    users = users.filter(usr =>
        usr._id !== userId);
    response.sendStatus(200);
}

const updateUser = (request, response) => {
    const userId = request.params['uid'];
    const updates = request.body;
    users = users.map(
        (usr) =>
        usr._id === userId ?
            {...usr, ...updates} : usr
    );
    response.sendStatus(200);
}

export default UserController