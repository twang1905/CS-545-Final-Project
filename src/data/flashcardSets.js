import { flashcardSets } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "./validation.js";

export async function getAllFlashcardSets() {
  const flashcardSetCollection = await flashcardSets();
  const flashcardSetList = await flashcardSetCollection.find({}).toArray();
  return flashcardSetList;
}

export async function getFlashcardSetById(id) {
  const flashcardSetCollection = await flashcardSets();
  const flashcardSet = await flashcardSetCollection.findOne({
    _id: new ObjectId(id),
  });
  if (flashcardSet === null) throw "No flashcard set with that id";
  return flashcardSet;
}

export async function createFlashcardSet(name) {
  validation.checkString(name, "name");

  const flashcardSetCollection = await flashcardSets();
  const newFlashcardSet = {
    name: name,
    flashcards: [],
  };

  const insertInfo = await flashcardSetCollection.insertOne(newFlashcardSet);
  if (insertInfo.insertedCount === 0) throw "Could not add flashcard set";

  return newFlashcardSet;
}

export async function deleteFlashcardSet(id) {
  const flashcardSetCollection = await flashcardSets();
  const deletionInfo = await flashcardSetCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete flashcard set with id of ${id}`;
  }

  return { ...deletionInfo, deleted: true };
}

export async function updateFlashcardSetName(id, name) {
  validation.checkString(name, "name");

  const flashcardSetCollection = await flashcardSets();
  const updatedFlashcardSet = await flashcardSetCollection.findOne({
    _id: new ObjectId(id),
  });
  if (updatedFlashcardSet === null) throw "No flashcard set with that id";

  updatedFlashcardSet.name = name;
  const updateInfo = await flashcardSetCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedFlashcardSet }
  );
  if (updateInfo.modifiedCount === 0)
    throw "Update Information was not modified";
  return updatedFlashcardSet;
}

export async function updateFlashcardSet(id, flashcardId) {
  const flashcardSetCollection = await flashcardSets();
  const updatedFlashcardSet = await flashcardSetCollection.findOne({
    _id: new ObjectId(id),
  });
  if (updatedFlashcardSet === null) throw "No flashcard set with that id";

  updatedFlashcardSet.flashcards.push(flashcardId);
  const updateInfo = await flashcardSetCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedFlashcardSet }
  );
  if (updateInfo.modifiedCount === 0)
    throw "Update Information was not modified";
  return updatedFlashcardSet;
}

export default {
  getAllFlashcardSets,
  getFlashcardSetById,
  createFlashcardSet,
  deleteFlashcardSet,
  updateFlashcardSetName,
  updateFlashcardSet
};
