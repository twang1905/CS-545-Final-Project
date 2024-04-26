"use client";
import React, { useState, useEffect } from "react";

export default function Flashcard({ params }) {
  const [flashcards, setFlashcards] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/flashcards/${params.id}`);
      const data = await response.json();
      setFlashcards(data.flashcards);
      setCurrentCard(0);
    }
    fetchData();
  }, [params.id]);

  try {
    if (flashcards === null) {
      return <div>Loading...</div>;
    } else if (flashcards.length === 0) {
      return <div>No flashcards found</div>;
    } else {
      return (
        <div className="parent-container">
          {flashcards && (
            <div className="card-container">
              <div>
                <button className="flashcard" onClick={() => setFlip(!flip)}>
                  {flip
                    ? flashcards[currentCard].answer
                    : flashcards[currentCard].question}
                </button>
              </div>
              <div>
                {currentCard + 1} / {flashcards.length}
              </div>
              <button
                className="myButton"
                onClick={() =>
                  setCurrentCard(
                    (currentCard - 1 + flashcards.length) % flashcards.length
                  )
                }
              >
                Previous
              </button>
              <button
                className="myButton"
                onClick={() =>
                  setCurrentCard(Math.floor(Math.random() * flashcards.length))
                }
              >
                Random Card
              </button>
              <button
                className="myButton"
                onClick={() =>
                  setCurrentCard((currentCard + 1) % flashcards.length)
                }
              >
                Next
              </button>
              <br />
              <br />
              <div>Difficulty: {flashcards[currentCard].rating}</div>
              <div>
                <form>
                  <label htmlFor="rating">Change Rating: </label>
                  <br />
                    <br />
                  <select
                    className="myInput"
                    id="rating"
                    value={flashcards[currentCard].rating}
                    onChange={(e) => {
                      const updatedFlashcards = [...flashcards];
                      updatedFlashcards[currentCard].rating = e.target.value;
                      setFlashcards(updatedFlashcards);
                    }}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }
  } catch (e) {
    return <div>Error: {e}</div>;
  }
}
