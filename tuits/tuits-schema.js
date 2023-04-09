import mongoose from "mongoose";
const schema = mongoose.Schema({
    _id: Number,
    userHandle: String,
    userAvatar: String,
    time: String,
    content: String,
    image: String,
    linkHeadline: String,
    linkSummary: String,
    linkSite: String,
    comments: Number,
    shares: Number,
    likes: Number,
    liked: Boolean
}, {collections: 'tuits'});
export default schema;