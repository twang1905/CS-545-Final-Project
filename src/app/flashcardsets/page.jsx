"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function ViewFlashcards() {
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
    <div className='setlist'>
      {sets &&
        sets.map((set) => (
          <div key={set._id}>
            <a href={`/flashcardsets/${set._id}`}>{set.name}</a>
            <br />
          </div>
        ))}
    </div>
  );
}
