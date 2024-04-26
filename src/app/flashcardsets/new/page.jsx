"use client";
import "../../globals.css";
import { useFormState as useFormState } from "react-dom";
import { createFlashcardSet } from "../../actions.js";
const initialState = {
  message: null,
};

export default function AddFlashcardSetForm() {
  const [state, formAction] = useFormState(createFlashcardSet, initialState);
  return (
    <div>
      <form className="myForm">
        <div>
          <label className="myLabel">
            Name of the Set:
            <input className="myInput" type="text" name="name" />
          </label>
        </div>
        <div>
          {state.message && <p>{state.message}</p>}
          <button className="myButton" formAction={formAction}>
            Add Set
          </button>
        </div>
      </form>
    </div>
  );
}
