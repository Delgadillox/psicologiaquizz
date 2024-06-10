// src/components/QuizzContainer.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';

// Datos estáticos para pruebas
const staticQuiz = {
  title: "Encuesta de Satisfacción",
  company: "Empresa A",
  leaderRequired: true,
};

const leaders = ["Líder 1", "Líder 2", "Líder 3"];

const QuizzContainer = ({ onStart }) => {
  const [leader, setLeader] = useState('');

  const handleStartClick = () => {
    if (staticQuiz.leaderRequired && !leader) {
      alert("Por favor, selecciona un líder");
    } else {
      onStart(leader);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
          <Typography variant="h4" gutterBottom>
            {staticQuiz.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {staticQuiz.company}
          </Typography>
          {staticQuiz.leaderRequired ? (
            <FormControl fullWidth margin="normal">
              <InputLabel>Líder</InputLabel>
              <Select
                label="Líder"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
              >
                {leaders.map((leader) => (
                  <MenuItem key={leader} value={leader}>
                    {leader}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartClick}
            style={{ marginTop: '20px' }}
          >
            Iniciar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizzContainer;
