import express from "express";
import cors from "cors"
import "dotenv/config"
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";
import authRouter from "./src/routes/authRouter.js";
import UserRouter from "./src/routes/usersRoutes.js";
import SearchRouter from "./src/routes/SearchRouter.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json())
app.use(cors())

//initializing routes
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.use("/api/login",authRouter)
app.use("/api/users",UserRouter)

app.use("/api/search",SearchRouter )

app.get('/', (req, res) => res.send("API Working"));


app.listen(port, () => console.log(`Server started on ${port}`));
