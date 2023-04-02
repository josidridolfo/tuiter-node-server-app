import posts from "../data/tuits.js";
let tuits = posts;

const currentUser = {
    "userName": "NASA",
    "userHandle": "nasa",
    "userAvatar": "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
};

const templateTuit = {
    ...currentUser,
    "time": "Just Now",
    "content" : "",
    "image": "",
    "linkHeadline": "",
    "linkSummary": "",
    "linkSite": "",
    "comments": 0,
    "shares": 0,
    "likes": 0,
    "liked": false
};

// Posts data to RESTful Web Service API
const createTuit = (request, response) => {
    // console.log(request.body);
    const newTuit = templateTuit;
    newTuit.content = request.body.content;
    newTuit._id = (new Date()).getTime() + '';
    tuits.unshift({...newTuit, ...templateTuit});
    response.json({...newTuit});
}

const findTuit = (request, response) => {
    response.json(tuits);
}

const updateTuit = (request, response) => {
    const tuitIDToUpdate = request.params.tid;
    const updates = request.body;
    const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitIDToUpdate)
    tuits[tuitIndex] =
        {
            ...tuits[tuitIndex],
            ...updates
        };
    console.log(t._id)
    response.sendStatus(200);
}

const deleteTuit = (request, response) => {
    const tuitIdToDelete = request.params.tid;
    tuits = tuits.filter((t) =>
        t._id !== tuitIdToDelete);
    response.sendStatus(200);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuit);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
