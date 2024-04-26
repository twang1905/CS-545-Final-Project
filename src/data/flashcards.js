import { flashcards } from "../config/mongoCollections.js";
import { flashcardSets } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import flashcardSetFunctions from "./flashcardSets.js";
import validation from "./validation.js";

export async function getAllFlashcards() {
  const flashcardCollection = await flashcards();
  const flashcardList = await flashcardCollection.find({}).toArray();
  return flashcardList;
}

export async function getFlashcardById(id) {
  const flashcardCollection = await flashcards();
  const flashcard = await flashcardCollection.findOne({
    _id: new ObjectId(id),
  });
  if (flashcard === null) throw "No flashcard with that id";
  return flashcard;
}

export async function getFlashcardsBySetId(setId) {
  const flashcardSetCollection = await flashcardSets();
  const flashcardSet = await flashcardSetCollection.findOne({
    _id: new ObjectId(setId),
  });
  if (flashcardSet === null) throw "No flashcard set with that id";
  return flashcardSet;
}

export async function createFlashcard(question, answer, setId) {
  validation.checkString(question, "question");
  validation.checkString(answer, "answer");

  const flashcardSet = await flashcardSetFunctions.getFlashcardSetById(setId);
  if (!flashcardSet) throw "No flashcard set found";

  const newFlashcard = {
    question: question,
    answer: answer,
    rating: 0,
  };
  const flashcardCollection = await flashcards();
  const insertInfo = await flashcardCollection.insertOne(newFlashcard);
  if (insertInfo.insertedCount === 0) throw "Could not add flashcard";

  const updatedSet = await flashcardSetFunctions.updateFlashcardSet(
    setId,
    insertInfo.insertedId
  );
  if (!updatedSet) throw "Could not add flashcard to set";

  return newFlashcard;
}

export async function deleteFlashcard(id) {
  const flashcardCollection = await flashcards();
  const deletionInfo = await flashcardCollection.deleteOne({
    _id: new ObjectId(id),
  });
  if (deletionInfo.deletedCount === 0) throw "Could not delete flashcard";
  return { ...deletionInfo, deleted: true };
}

export async function updateFlashcard(id, question, answer) {
  validation.checkString(question, "question");
  validation.checkString(answer, "answer");

  const updatedFlashcard = {
    question: question,
    answer: answer,
  };
  const flashcardCollection = await flashcards();
  const updateInfo = await flashcardCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedFlashcard }
  );
  if (updateInfo.modifiedCount === 0) throw "Could not update flashcard";
  return updatedFlashcard;
}
