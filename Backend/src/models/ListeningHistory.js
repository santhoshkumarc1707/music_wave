import mongoose from "mongoose";

const  ListeningHistorySchema = new mongoose.Schema({

})

const ListeningHistory  = mongoose.models.ListeningHistory|| mongoose.model("ListeningHistory",ListeningHistorySchema);

export default ListeningHistory;