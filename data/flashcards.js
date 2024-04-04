import { flashcards } from "../config/mongoCollections.js";

export async function create(flashcardName) {
  if (!flashcardName || typeof flashcardName !== "string") throw "You must provide a name for the flashcard";

  const flashcardCollection = await flashcards();
  const newFlashcard = {
    name: flashcardName
  };

  const insertInfo = await flashcardCollection.insertOne(newFlashcard);
  if (insertInfo.insertedCount === 0) throw "Could not add flashcard";

  const newId = insertInfo.insertedId;
  const flashcard = await get(newId);
  return flashcard;
}

export async function get(id) {
  if (!id) throw "You must provide an id to search for";

  const flashcardCollection = await flashcards();
  const flashcard = await flashcardCollection.findOne({ _id: id });
  if (flashcard === null) throw "No flashcard found with that id";

  return flashcard;
}

export default {
  create,
  get
};