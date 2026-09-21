import express from "express";

import {
  getPayments,
  getPaymentById,
  createPayment,
  confirmPayment,
  getUserPayments,
  failPayment,
  paymentWebhook,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();


// GET /api/payments
paymentRouter.get("/", getPayments);


// GET /api/payments/:id
paymentRouter.get("/:id", getPaymentById);


// POST /api/payments/create
paymentRouter.post("/create", createPayment);


// POST /api/payments/confirm
paymentRouter.post("/confirm", confirmPayment);


// GET /api/payments/user/:userId
paymentRouter.get("/user/:userId", getUserPayments);


// PUT /api/payments/:id/fail
paymentRouter.put("/:id/fail", failPayment);


// POST /api/payments/webhook
paymentRouter.post("/webhook", paymentWebhook);


export default paymentRouter;