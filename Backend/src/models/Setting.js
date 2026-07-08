import mongoose from "mongoose";

const  SettingSchema = new mongoose.Schema({

})

const Setting  = mongoose.models.Setting|| mongoose.model("setting",SettingSchema);

export default Setting;