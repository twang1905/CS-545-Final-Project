"use client";
import "../../globals.css";
import { useFormState as useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { createFlashcard } from "../../actions.js";
const initialState = {
  question: null,
    answer: null,
    setId: null,
};

export default function AddFlashcardForm() {
  const [state, formAction] = useFormState(createFlashcard, initialState);

  const [sets, setSets] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/flashcardsets");
      const data = await response.json();
      let { flashcardSetList } = data;
      setSets(flashcardSetList);
    }
    fetchData();
  }, []);

  return (
    <div>
      <form className="myForm" action={formAction}>
        <div>
          <label className="myLabel">
            Question:
            <input className="myInput" type="text" name="question" />
          </label>
        </div>
        <br />
        <div>
          <label className="myLabel">
            Answer:
            <input className="myInput" type="text" name="answer" />
          </label>
        </div>
        <br />
        <div>
          <label className="myLabel">
            Set:
            <select className="myInput" name="setId">
              {sets && sets.map((set) => (
                <option key={set._id} value={set._id}>
                  {set.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          {state.message && <p>{state.message}</p>}
          <button className="myButton">
            Add Flashcard
          </button>
        </div>
      </form>
    </div>
  );
}
