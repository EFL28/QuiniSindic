"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GroupPredictionPage() {
  const [matches, setMatches] = useState<
    { local: string; visitante: string }[]
  >([]);
  const [matchweek, setMatchweek] = useState(0);
  const [predictions, setPredictions] = useState<
    { username: string; prediction: string[] }[]
  >([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const url =
        "https://f7ekq2o916.execute-api.eu-west-3.amazonaws.com/dev/quiniela";
      try {
        const response = await axios.get(url);
        setMatches(response.data.body.partidos);
        setMatchweek(response.data.body.jornada);
      } catch (error) {
        console.error("Error al obtener los partidos:", error);
      }
    };
    fetchMatches();
  }, []);

  const fetchPredictions = async (matchweek: number) => {
    const url = `/api/predictions/getPredictions?matchweek=${matchweek}`;
    try {
      const response = await axios.get(url);
      const fetchedPredictions = response.data.preds.map((pred: any) => ({
        username: pred.Users.username,
        prediction: pred.prediction,
      }));
      setPredictions(fetchedPredictions);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las predicciones:", error);
    }
  };

  useEffect(() => {
    if (matchweek) {
      fetchPredictions(matchweek);
    }
  }, [matchweek]);

  const handleUserChange = (direction: "prev" | "next") => {
    setCurrentUserIndex((prevIndex) => {
      if (direction === "prev") {
        return prevIndex === 0 ? predictions.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === predictions.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const currentUser = predictions[currentUserIndex];

  return (
    <div className="flex justify-center items-center flex-col h-full bg-light dark:bg-dark dark:text-white">
      <div className="text-4xl mt-4">Jornada {matchweek}</div>
      <div className="flex justify-between flex-col p-4">
        <div className="grid grid-cols-2 text-center text-xl mb-4">
          <div>PARTIDOS</div>
          <div className="flex justify-center items-center gap-3">
            <div>
              <svg
                data-testid="geist-icon"
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
                style={{ color: "currentColor" }}
                onClick={() => handleUserChange("prev")}
                className="cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.46966 13.7803L6.99999 14.3107L8.06065 13.25L7.53032 12.7197L3.56065 8.75001H14.25H15V7.25001H14.25H3.56065L7.53032 3.28034L8.06065 2.75001L6.99999 1.68935L6.46966 2.21968L1.39644 7.2929C1.00592 7.68342 1.00592 8.31659 1.39644 8.70711L6.46966 13.7803Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div>{currentUser ? currentUser.username : ""}</div>
            <svg
              data-testid="geist-icon"
              height="16"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              width="16"
              style={{ color: "currentColor" }}
              onClick={() => handleUserChange("next")}
              className="cursor-pointer"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          matches.map((match, index) => (
            <div key={index} className="grid grid-cols-2 py-2">
              <div>
                {match.local} - {match.visitante}
              </div>

              <div className="flex justify-center items-center gap-6">
                {index < 14 ? (
                  <>
                    <div
                      className={`border border-black dark:border-white rounded px-3 py-1 cursor-pointer ${
                        currentUser?.prediction[index] === "1"
                          ? "bg-primary text-white"
                          : ""
                      }`}
                    >
                      1
                    </div>
                    <div
                      className={`border border-black dark:border-white rounded px-3 py-1 cursor-pointer ${
                        currentUser?.prediction[index] === "X"
                          ? "bg-primary text-white"
                          : ""
                      }`}
                    >
                      X
                    </div>
                    <div
                      className={`border border-black dark:border-white rounded px-3 py-1 cursor-pointer ${
                        currentUser?.prediction[index] === "2"
                          ? "bg-primary text-white"
                          : ""
                      }`}
                    >
                      2
                    </div>
                  </>
                ) : matches.length > 14 ? (
                  <div className="flex flex-col">
                    <div className="flex mb-2">
                      {["0", "1", "2", "M"].map((option) => (
                        <div
                          key={`${index}-local-${option}`}
                          className={`border border-black dark:border-white rounded px-3 py-1 mx-2 cursor-pointer ${
                            currentUser?.prediction[index] === option
                              ? "bg-primary text-white"
                              : ""
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      {["0", "1", "2", "M"].map((option) => (
                        <div
                          key={`${index}-visitante-${option}`}
                          className={`border border-black dark:border-white rounded px-3 py-1 mx-2 cursor-pointer ${
                            currentUser?.prediction[index] === option
                              ? "bg-primary text-white"
                              : ""
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
