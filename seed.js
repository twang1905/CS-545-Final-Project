import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as flashcards from "./data/flashcards.js";

const db = await dbConnection();
await db.dropDatabase();

const flashcard1 = await flashcards.create(
    "France"
);

console.log("Flashcards created.");
await closeConnection();