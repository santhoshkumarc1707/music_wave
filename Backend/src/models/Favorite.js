import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({

})

const Favorite  = mongoose.models.Favorite|| mongoose.model("favorite", FavoriteSchema);

export default Favorite;