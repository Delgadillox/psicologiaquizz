import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import QuizzContainer from "./components/QuizzContainer";
import Question from "./components/Question";
import CryptoJS from "crypto-js";
import axios from "axios";

const secretKey = "psicologia-aplicada";

function decryptId(encryptedId) {
  const base64 = encryptedId
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/~/g, "=");

  const bytes = CryptoJS.AES.decrypt(base64, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  return decrypted;
}

const App = () => {
  const [quizzData, setQuizzData] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [leader, setLeader] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState("");
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getInstanceData = async () => {
      const query = window.location.search;
      const params = new URLSearchParams(query);
      const id = params.get("q");

      if (!id) {
        setErrorMessage(
          "¡Ha ocurrido un error! No se ha encontrado la encuesta"
        );
        document.title = "Encuesta";
        return;
      }

      const storedCompletion = localStorage.getItem(`quizCompleted_${id}`);
      if (storedCompletion) {
        setQuizCompleted(true);
        document.title = "Encuesta Completada";
        return;
      }

      try {
        const response = await axios.get(
          `https://psicologia-aplicada.com/quizz/psicologia-api/quizz/getOnlineInstance.php?id=${decryptId(
            id
          )}`
        );
        const result = response.data[0];
        console.log(result);
        if (result) {
          const leaderRequired = result.NombreLider === 0 || result.NombreLider === "0";
          console.log("leaderRequired", leaderRequired)
          let leaders = [];
          if (leaderRequired) {
            const plantResponse = await axios.get(
              `https://psicologia-aplicada.com/quizz/psicologia-api/api/getLideres.php?plant=${result.IdEmpresa}`
            );
            leaders = plantResponse.data;
            console.log(plantResponse);
          }
          console.log("leaders", leaders);
          const data = {
            title: result.Encuesta,
            company: result.Empresa,
            leader: result.NombreLider,
            leaderRequired,
            leaders,
          };
          setQuizzData(data);
          document.title = result.Encuesta || "Encuesta";

          const currentDate = new Date();
          const expirationDate = new Date(result.Expiracion);
          if (currentDate > expirationDate || result.Total >= result.Limite) {
            setErrorMessage("La encuesta ha expirado");
            return;
          }
          setQuestions(JSON.parse(result.Preguntas));
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setErrorMessage(
          "Error al buscar la instancia: no se encontró la instancia o hubo un problema con la búsqueda."
        );
      }
    };

    getInstanceData();
  }, []);

  const startQuiz = (leader) => {
    setSelectedLeader(leader);
    setShowQuestions(true);
  };

  const handleSaveResponse = async (questionId, selectedOptionIndex, isLastQuestion) => {
    setResponses((prevResponses) => {
      const updatedResponses = [
        ...prevResponses,
        { id: questionId, options: selectedOptionIndex },
      ];
      console.log("Respuestas actualizadas:", updatedResponses);

      // Si es la última pregunta, llamamos a handleQuizCompletion
      if (isLastQuestion) {
        handleQuizCompletion(updatedResponses);
      }

      return updatedResponses;
    });
  };

  const handleQuizCompletion = async (finalResponses) => {
    console.log("Respuestas del usuario:", finalResponses);

    const query = window.location.search;
    const params = new URLSearchParams(query);
    const id = params.get("q");

    const response = {
      id: decryptId(id),
      responses: finalResponses,
      selectedLeader,
    };

    if (id) {
      localStorage.setItem(`quizCompleted_${id}`, "true");
    }

    const url =
      "https://psicologia-aplicada.com/quizz/psicologia-api/quizz/saveOnlineReport.php";
    await axios.post(url, response, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setQuizCompleted(true);
    console.log(response);
  };

  if (errorMessage) {
    return (
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5} color="red">
          <Typography variant="h4" gutterBottom>
            {errorMessage}
          </Typography>
          <Typography variant="body1">
            Por favor, verifica la URL o contacta al soporte para más
            información.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      {quizCompleted ? (
        <Box textAlign="center" mt={5} color="white">
          <Typography variant="h4" gutterBottom>
            Gracias por contestar la encuesta.
          </Typography>
          <Typography variant="body1">
            Tus respuestas han sido guardadas con éxito.
          </Typography>
        </Box>
      ) : showQuestions ? (
        <Question
          leader={selectedLeader}
          questions={questions}
          onSaveResponse={handleSaveResponse}
        />
      ) : (
        <QuizzContainer
          onStart={startQuiz}
          quizzData={quizzData}
          setLeader={setLeader}
        />
      )}
    </Container>
  );
};

export default App;
