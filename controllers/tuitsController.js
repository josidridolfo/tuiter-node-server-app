import * as tuitsDao from '../tuits/tuits-dao.js'
// import posts from "../data/tuits.js";
// let tuits = posts;

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
const createTuit = async (request, response) => {
    const newTuit = templateTuit;
    newTuit.content = request.body.content;
    newTuit.likes = 0;
    newTuit.liked = false;
    const insertedTuit = await
        tuitsDao.createTuit(newTuit);
   response.json(insertedTuit);
}

const findTuit = async (request, response) => {
    const tuits = await tuitsDao.findTuits()
    response.json(tuits);
}

const updateTuit = async (request, response) => {
    const tuitIDToUpdate = request.params.tid;
    const updates = request.body;
    // const tuitIndex = tuits.findIndex(
    //     (t) => t._id === tuitIDToUpdate
    // );
    // if (tuitIndex < 0) {
    //     response.sendStatus(404);
    //     return;
    // }
    // const tuitToUpdate = tuits[tuitIndex]
    // console.log(tuitToUpdate)
    // // For the reviewer: Click on a heart to see, in the terminal below, likes increasing/decreasing and
    // // liked changing from true to false
    // // The code works, it's just not displaying on the screen unless refreshed.
    // if (tuitToUpdate.liked) {
    //     tuitToUpdate.liked = false;
    //     tuitToUpdate.likes -= 1;
    // } else {
    //     tuitToUpdate.liked = true;
    //     tuitToUpdate.likes += 1;
    // }
    const status =
        await tuitsDao.updateTuit(
            tuitIDToUpdate, updates)
    response.json(status);
};

const deleteTuit = async (request, response) => {
    const tuitIdToDelete = request.params.tid;
    const status =
        await tuitsDao.deleteTuit(tuitIdToDelete);
    response.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuit);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
