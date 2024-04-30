"use client";
import "../../globals.css";
import { useFormState as useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { deleteFlashcardSet } from "../../actions.js";
const initialState = {
  message: null,
};

export default function DeleteFlashcardSetForm() {
  const [state, formAction] = useFormState(deleteFlashcardSet, initialState);

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
      <form className="myForm">
        <div>
          <label className="myLabel">
            Set:
            <select className="myInput" name="setId">
              {sets &&
                sets.map((set) => (
                  <option key={set._id} value={set._id}>
                    {set.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div>
          {state.message && <p>{state.message}</p>}
          <button
            className="myButton"
            formAction={formAction}
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            Delete Set
          </button>
        </div>
      </form>
    </div>
  );
}
