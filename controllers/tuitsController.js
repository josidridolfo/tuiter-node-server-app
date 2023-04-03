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
    const newTuit = templateTuit;
    newTuit.content = request.body.content;
    newTuit._id = (new Date()).getTime() + '';
    tuits.unshift(newTuit);
    console.log(newTuit);
    // For reviewer: Try adding a new tuit, and look at the output in your terminal in IntelliJ in this server app.
    // The new tuit arrives, with content as expected, and with an ID...only the content is not displayed in the
    // tuits list.
    // response.sendStatus(200);
   response.json(newTuit);
}

const findTuit = (request, response) => {
    response.json(tuits);
}

const updateTuit = (request, response) => {
    const tuitIDToUpdate = request.params.tid;
    const updates = request.body;
    const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitIDToUpdate
    );
    if (tuitIndex < 0) {
        response.sendStatus(404);
        return;
    }
    const tuitToUpdate = tuits[tuitIndex]
    console.log(tuitToUpdate)
    // For the reviewer: Click on a heart to see, in the terminal below, likes increasing/decreasing and
    // liked changing from true to false
    // The code works, it's just not displaying on the screen unless refreshed.
    if (tuitToUpdate.liked) {
        tuitToUpdate.liked = false;
        tuitToUpdate.likes -= 1;
    } else {
        tuitToUpdate.liked = true;
        tuitToUpdate.likes += 1;
    }
    response.sendStatus(200);
};

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
