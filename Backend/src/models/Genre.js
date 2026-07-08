import mongoose from "mongoose";

const  GenreSchema = new mongoose.Schema({

})

const Genre  = mongoose.models.Genre|| mongoose.model("genre",GenreSchema);

export default Genre;