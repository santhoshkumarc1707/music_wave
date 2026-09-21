import express from "express"

const ListeningHistoryRouter=express.Router()

ListeningHistoryRouter.get("/");
ListeningHistoryRouter.post("/");
ListeningHistoryRouter.delete("/");

export default ListeningHistoryRouter;