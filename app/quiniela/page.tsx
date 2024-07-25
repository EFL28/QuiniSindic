"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "../ui/header";
import Footer from "../ui/footer";

export default function QuinielaPage() {
  const [matches, setMatches] = useState([]);
  const [matchweek, setMatchweek] = useState(0);
  const [username, setUsername] = useState("");
  const [predictions, setPredictions] = useState("");
  const router = useRouter();

  interface SelectedOptions {
    [key: string]: string;
  }

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  useEffect(() => {
    const fetchMatches = async () => {
      const url =
        "https://f7ekq2o916.execute-api.eu-west-3.amazonaws.com/dev/quiniela";
      try {
        const response = await axios.get(url);
        setMatches(response.data.body.partidos);
        setMatchweek(response.data.body.jornada);
      } catch (error) {
        console.error("Socio ¿y er furbo donde esta?", error);
      }
    };
    if (matches.length === 0) {
      fetchMatches();
    }
  }, [matches]);

  const handleSelect = (index: number, option: string, team?: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const key = index === 14 ? `${index}-${team}` : index.toString();
      const newSelectedOptions: { [key: string]: string } = {
        ...prevSelectedOptions,
      };

      if (newSelectedOptions[key] === option) {
        delete newSelectedOptions[key];
      } else {
        newSelectedOptions[key] = option;
      }

      setPredictions(JSON.stringify(newSelectedOptions));
      return newSelectedOptions;
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const url = "/api/users/getUser";
      try {
        const response = await axios.get(url);
        setUsername(response.data.user);
      } catch (error) {
        console.error("Socio ¿y el user donde esta?", error);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    const url = "/api/predictions/savePredictions";

    if (Object.keys(selectedOptions).length < matches.length + 1) {
      alert("Debes seleccionar todos los partidos");
      return;
    }

    try {
      await axios.post(url, { predictions, username, matchweek });
      router.push("/groupPrediction");

      //console.log(response.data);
    } catch (error) {
      console.error("Socio ¿y er furbo donde esta?", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col h-full bg-light dark:bg-dark dark:text-white">
        <div className="text-3xl mt-4">Jornada {matchweek}</div>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {matches &&
              matches.map((match: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between p-2 mb-2 rounded"
                  >
                    <div className="flex items-center">
                      <span className="dark:text-white p-4">
                        {match.local} - {match.visitante}
                      </span>
                    </div>
                    <div className="dark:text-white flex items-center">
                      {index < 14 ? (
                        <>
                          <div
                            className={`border border-black dark:border-white rounded px-4 py-2 mr-2 cursor-pointer ${
                              selectedOptions[index.toString()] === "1"
                                ? "bg-primary text-white"
                                : ""
                            }`}
                            onClick={() => handleSelect(index, "1")}
                          >
                            1
                          </div>
                          <div
                            className={`border border-black dark:border-white rounded px-4 py-2 cursor-pointer ${
                              selectedOptions[index.toString()] === "X"
                                ? "bg-primary text-white"
                                : ""
                            }`}
                            onClick={() => handleSelect(index, "X")}
                          >
                            X
                          </div>
                          <div
                            className={`border border-black dark:border-white rounded px-4 py-2 ml-2 cursor-pointer ${
                              selectedOptions[index.toString()] === "2"
                                ? "bg-primary text-white"
                                : ""
                            }`}
                            onClick={() => handleSelect(index, "2")}
                          >
                            2
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col">
                          <div className="flex mb-2">
                            {["0", "1", "2", "M"].map((option) => (
                              <div
                                key={`${index}-local-${option}`}
                                className={`border border-black dark:border-white rounded px-4 py-2 mx-1 cursor-pointer ${
                                  selectedOptions[`${index}-local`] === option
                                    ? "bg-primary text-white"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleSelect(index, option, "local")
                                }
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                          <div className="flex">
                            {["0", "1", "2", "M"].map((option) => (
                              <div
                                key={`${index}-visitante-${option}`}
                                className={`border border-black dark:border-white rounded px-4 py-2 mx-1 cursor-pointer ${
                                  selectedOptions[`${index}-visitante`] ===
                                  option
                                    ? "bg-primary text-white"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleSelect(index, option, "visitante")
                                }
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex justify-center items-center mb-4">
          <button
            type="submit"
            onClick={handleSave}
            className="rounded py-3 text-lg bg-primary hover:bg-primary-hover w-32 font-semibold text-white"
          >
            Aceptar
          </button>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
