"use server";
import { flashcardData, flashcardSetData } from "../data/index.js";
import validation from "../data/validation.js";

export async function createFlashcardSet(prevState, formData) {
  let formName = formData.get("name");
  let success = false;
  let errors = [];
  try {
    formName = validation.checkString(formName, "name");
  } catch (e) {
    errors.push(e);
  }
  if (errors.length === 0) {
    try {
      await flashcardSetData.createFlashcardSet(formName);
      success = true;
      return { message: "Flashcard set created Successfully!" };
    } catch (e) {
      errors.push(e);
    }
  } else {
    return { message: errors };
  }
}

export async function createFlashcard(prevState, formData) {
  let formQuestion = formData.get("question");
  let formAnswer = formData.get("answer");
  let formSetId = formData.get("setId");
  let success = false;
  let errors = [];
  try {
    formQuestion = validation.checkString(formQuestion, "question");
  } catch (e) {
    errors.push(e);
  }
  try {
    formAnswer = validation.checkString(formAnswer, "answer");
  } catch (e) {
    errors.push(e);
  }
  try {
    formSetId = validation.checkString(formSetId, "setId");
  } catch (e) {
    errors.push(e);
  }
  if (errors.length === 0) {
    try {
      await flashcardData.createFlashcard(formQuestion, formAnswer, formSetId);
      success = true;
      return { message: "Flashcard created Successfully!" };
    } catch (e) {
      errors.push(e);
    }
  } else {
    return { message: errors };
  }
}
