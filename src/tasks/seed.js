import {
  createFlashcard
} from "../data/flashcards.js";

import {
  createFlashcardSet
} from "../data/flashcardSets.js";

const main = async () => {
  try {
    let javaSet = await createFlashcardSet("JavaScript");
    let javaSetId = javaSet._id.toString();
    await createFlashcard("What is JavaScript?", "A programming language", javaSetId);
    await createFlashcard("What is the DOM?", "Document Object Model", javaSetId);
    await createFlashcard("What is a variable?", "A container for a value", javaSetId);
    await createFlashcard("What is a function?", "A block of code that can be called", javaSetId);
    await createFlashcard("What is a loop?", "A way to repeat code", javaSetId);
    await createFlashcard("What is a conditional?", "A way to run code conditionally", javaSetId);
    console.log("JavaScript flashcards created!");

    let mathSet = await createFlashcardSet("Math");
    let mathSetId = mathSet._id.toString();
    await createFlashcard("What is 2 + 2?", "4", mathSetId);
    await createFlashcard("What is 3 * 3?", "9", mathSetId);
    await createFlashcard("What is 10 / 2?", "5", mathSetId);
    await createFlashcard("What is 5 - 3?", "2", mathSetId);
    await createFlashcard("What is 2^3?", "8", mathSetId);
    console.log("Math flashcards created!");

    let capitalSet = await createFlashcardSet("US Capitals");
    let capitalSetId = capitalSet._id.toString();
    await createFlashcard("What is the capital of California?", "Sacramento", capitalSetId);
    await createFlashcard("What is the capital of Texas?", "Austin", capitalSetId);
    await createFlashcard("What is the capital of New York?", "Albany", capitalSetId);
    await createFlashcard("What is the capital of Florida?", "Tallahassee", capitalSetId);
    await createFlashcard("What is the capital of Illinois?", "Springfield", capitalSetId);
    console.log("US Capitals flashcards created!");

    console.log("Database Seeded!");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};

main().catch((error) => {
  console.log(error);
  process.exit();
});
