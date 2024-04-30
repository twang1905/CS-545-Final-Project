"use client";
import "../../globals.css";
import { useFormState as useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { deleteFlashcard } from "../../actions.js";
const initialState = {
  flashcardId: "",
};

export default function DeleteFlashcardForm() {
  const [state, formAction] = useFormState(deleteFlashcard, initialState);
  const [allSets, setAllSets] = useState(undefined);
  const [selectedSet, setSelectedSet] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/flashcardsets");
      const data = await response.json();
      let { flashcardSetList } = data;
      setAllSets(flashcardSetList);
      if (flashcardSetList && flashcardSetList.length > 0) {
        const defaultSet = flashcardSetList[0]._id;
        setSelectedSet(defaultSet);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchFlashcards() {
      if (selectedSet) {
        const response = await fetch(`/api/flashcards/${selectedSet}`);
        const data = await response.json();
        setFlashcards(data.flashcards || []);
      }
    }
    fetchFlashcards();
  }, [selectedSet]);

  const handleSetChange = (event) => {
    setSelectedSet(event.target.value);
  };

  return (
    <div>
      <form className="myForm" action={formAction}>
        <div>
          <label className="myLabel">
            Set:
            <select
              className="myInput"
              name="setId"
              value={selectedSet}
              onChange={handleSetChange}
            >
              {allSets &&
                allSets.map((set) => (
                  <option key={set._id} value={set._id}>
                    {set.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <br />
        <div>
          <label className="myLabel">
            Flashcard:
            <select className="myInput" name="flashcardId">
              {flashcards &&
                flashcards.map((flashcard) => (
                  <option key={flashcard._id} value={flashcard._id}>
                    {flashcard.question}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div>
          {state.message && <p>{state.message}</p>}
          <button
            className="myButton"
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            Delete Flashcard
          </button>
        </div>
      </form>
    </div>
  );
}
