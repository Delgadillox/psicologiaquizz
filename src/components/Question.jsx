// src/components/Question.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio, Card, CardContent } from '@mui/material';

// Datos estáticos para pruebas
const staticQuestions = [
  {
    id: 1,
    question: "¿Cómo calificaría su satisfacción general con el producto?",
    options: ["Muy satisfecho", "Satisfecho", "Insatisfecho"],
  },
  {
    id: 2,
    question: "¿Recomendaría nuestro producto a otras personas?",
    options: ["Definitivamente sí", "Probablemente no", "Definitivamente no"],
  },
  {
    id: 3,
    question: "¿Qué tan útil encontró el servicio al cliente?",
    options: ["Muy útil", "Útil", "Nada útil"],
  },
];

const Question = ({ leader, onSaveResponse, onComplete, responses }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const currentQuestion = staticQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (!selectedOption) {
      alert("Por favor, selecciona una respuesta");
      return;
    }

    onSaveResponse(currentQuestion.id, selectedOption);

    setSelectedOption('');
    if (currentQuestionIndex < staticQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finalización del quizz
      onComplete();
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
          <Typography variant="h5" gutterBottom>
            {currentQuestion.question}
          </Typography>
          <RadioGroup
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            style={{ marginTop: '20px' }}
          >
            {currentQuestionIndex < staticQuestions.length - 1
              ? "Siguiente"
              : "Finalizar"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Question;
