import express from "express";
import { clerkWebHook } from "../controllers/webhook.controller.js";
import bodyParser from "body-parser";

const router = express.Router();

// Webhook route for Clerk
// This route is used to receive webhooks from Clerk
// It means that Clerk will send a POST request to this route
// when a user is created or deleted in Clerk
router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  clerkWebHook
);

export default router;
