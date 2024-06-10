// src/App.jsx
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import QuizzContainer from './components/QuizzContainer';
import Question from './components/Question';

const App = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState('');
  const [responses, setResponses] = useState([]);

  const startQuiz = (leader) => {
    setSelectedLeader(leader);
    setShowQuestions(true);
  };

  const handleSaveResponse = (questionId, answer) => {
    setResponses((prevResponses) => [
      ...prevResponses,
      { questionId, answer },
    ]);
  };

  const handleQuizCompletion = () => {
    setQuizCompleted(true);
  };

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
          onSaveResponse={handleSaveResponse}
          responses={responses}
          onComplete={handleQuizCompletion}
        />
      ) : (
        <QuizzContainer onStart={startQuiz} />
      )}
    </Container>
  );
};

export default App;
