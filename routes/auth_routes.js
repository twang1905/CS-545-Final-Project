import { Router } from "express";
const router = Router();
import { flashcards } from "../config/mongoCollections.js";

router.route("/").get(async (req, res) => {
  try {
    res.status(200).json("test");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
