import { useState, useEffect } from "react";
import { BACKEND_URL } from "../App";

export default function History() {
  const [gameRecords, setGameRecords] = useState();

  useEffect(() => {
    async function getGameRecords() {
      const response = await fetch(`${BACKEND_URL}/api/GameRecord`);
      const json = await response.json();
      setGameRecords(json);
    }

    getGameRecords();
  }, []);

  return (
    <>
      {gameRecords && (
        <div className="history">
          {gameRecords
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((record, index) => (
              <div className="record" key={index}>
                <div>{new Date(record.date).toLocaleString()}</div>
                <div>{record.score}</div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
