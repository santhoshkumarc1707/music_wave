import mongoose from "mongoose";

const  SearchHistorySchema = new mongoose.Schema({

})

const SearchHistory  = mongoose.models.SearchHistory|| mongoose.model("searchHistory",SearchHistorySchema);

export default SearchHistory;