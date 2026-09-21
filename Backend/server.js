// // import express from "express";
// // import cors from "cors"
// // import "dotenv/config"
// // import songRouter from "./src/routes/songRoute.js";
// // import connectDB from "./src/config/mongodb.js";
// // import connectCloudinary from "./src/config/cloudinary.js";
// // import albumRouter from "./src/routes/albumRoute.js";
// // import authRouter from "./src/routes/authRouter.js";
// // import UserRouter from "./src/routes/usersRoutes.js";
// // import SearchRouter from "./src/routes/SearchRouter.js";

// // //app config
// // const app = express();
// // const port = process.env.PORT || 4000;
// // connectDB();
// // connectCloudinary();

// // //middlewares
// // app.use(express.json())
// // app.use(cors())

// // //initializing routes
// // app.use("/api/song", songRouter)
// // app.use("/api/album", albumRouter)
// // app.use("/api/login",authRouter)
// // app.use("/api/users",UserRouter)

// // app.use("/api/search",SearchRouter )

// // app.get('/', (req, res) => res.send("API Working"));


// // app.listen(port, () => console.log(`Server started on ${port}`));

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import dns from "dns";
// import mongoose from "mongoose";

// import songRouter from "./src/routes/songRoute.js";
// import albumRouter from "./src/routes/albumRoute.js";
// import authRouter from "./src/routes/authRouter.js";
// import UserRouter from "./src/routes/usersRoutes.js";
// import SearchRouter from "./src/routes/SearchRouter.js";

// import connectCloudinary from "./src/config/cloudinary.js";
// import connectDB from "./src/config/mongodb.js";

// dotenv.config();

// // Force Google DNS
// dns.setServers(["8.8.8.8", "8.8.4.4"]);




// const app = express();
// const port = process.env.PORT || 4000;

// // Connect Services
//  // MongoDB Connection
// connectDB();
//  //Cloudinary connection
// connectCloudinary();
// await seedRoles();
// await seedSuperAdmin();
// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api/song", songRouter);
// app.use("/api/album", albumRouter);
// app.use("/api", authRouter);
// app.use("/api/users", UserRouter);
// app.use("/api/search", SearchRouter);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// app.listen(port, () => {
//   console.log(`Server started on ${port}`);
// });



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";
import authRouter from "./src/routes/authRouter.js";
import UserRouter from "./src/routes/usersRoutes.js";
import SearchRouter from "./src/routes/SearchRouter.js";

import connectCloudinary from "./src/config/cloudinary.js";
import connectDB from "./src/config/mongodb.js";

// Import seed functions
import  seedRoles  from "./src/Seeding/userSeed.js";
import  seedSuperAdmin  from "./src/Seeding/CreatingSuperAdmin.js";
import RoleRouter from "./src/routes/roleRoute.js";
import ArtistRouter from "./src/routes/ArtistRouter.js";
import genereRouter from "./src/routes/GenereRouter.js";
import settingRouter from "./src/routes/SettingsRouter.js";
import playlistSongRouter from "./src/routes/playlistSongRouter.js";
import favoriteRouter from "./src/routes/favoriteRouter.js";
import SearchHistory from "./src/models/SearchHistory.js";
import ListeningHistory from "./src/models/ListeningHistory.js";
import ReviewRouter from "./src/routes/reviewRouter.js";
import subscriptionRouter from "./src/routes/subscriptionRouter.js";
import planRouter from "./src/routes/planRouter.js";
import paymentRouter from "./src/routes/paymentRouter.js";
import activityRouter from "./src/routes/activityRouter.js";
import Notification from "./src/models/Notification.js";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api", authRouter);
app.use("/api/users", UserRouter);
app.use("/api/search", SearchRouter);
app.use("/api/roles",RoleRouter);
app.use("/api/artist",ArtistRouter);
app.use("/api/genres",genereRouter);
app.use("/api/setting",settingRouter);
app.use("/api/playlists",playlistSongRouter);
app.use("/api/favorites",favoriteRouter);
app.use("/api/history",ListeningHistory);
app.use("/api/reviews",ReviewRouter);
app.use("/api/subscriptions",subscriptionRouter);
app.use("/api/plans",planRouter);
app.use("/api/payments",paymentRouter);
app.use("/api/activity",activityRouter);
app.use("/api/notifications",Notification);
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    connectCloudinary();

    // Seed data
    await seedRoles();
    await seedSuperAdmin();

    app.listen(port, () => {
      console.log(`🚀 Server started on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();