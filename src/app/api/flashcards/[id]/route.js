import { flashcardData } from "../../../../data/index.js";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const flashcardList = await flashcardData.getFlashcardsBySetId(params.id);
    let flashcards = [];
    for (let i = 0; i < flashcardList.flashcards.length; i++) {
      let flashcard = await flashcardData.getFlashcardById(flashcardList.flashcards[i]);
      flashcards.push(flashcard);
    }
    return NextResponse.json({ flashcards }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
