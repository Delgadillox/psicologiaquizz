import React, { useState } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio, Card, CardContent } from '@mui/material';
import Logo from "../assets/logo.jpg";

const Question = ({ leader, questions, onSaveResponse }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (selectedOption === '') {
      alert("Por favor, selecciona una respuesta");
      return;
    }

    // Encuentra el índice de la opción seleccionada
    const selectedOptionIndex = currentQuestion.options.indexOf(selectedOption);

    // Verifica si esta es la última pregunta
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // Guarda la respuesta actual y verifica si es la última pregunta
    onSaveResponse(currentQuestion.id, selectedOptionIndex, isLastQuestion);

    // Resetea la opción seleccionada para la siguiente pregunta
    setSelectedOption('');

    // Si no es la última pregunta, avanza a la siguiente
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <Card style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0px 4px 50px #9DD8B3' }}>
      <CardContent>
        <img src={Logo} alt="Logo" width="100%"/>
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
            {currentQuestionIndex < questions.length - 1
              ? "Siguiente"
              : "Finalizar"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Question;
