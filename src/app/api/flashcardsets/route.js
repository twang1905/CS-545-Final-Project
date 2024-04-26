import { flashcardSetData } from "../../../data/index.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const flashcardSetList = await flashcardSetData.getAllFlashcardSets();
    return NextResponse.json({ flashcardSetList }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}