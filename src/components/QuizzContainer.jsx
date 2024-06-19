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


const QuizzContainer = ({ onStart, quizzData }) => {
  const [leader, setLeader] = useState('');

  const handleStartClick = () => {
    if (quizzData.leaderRequired && !leader) {
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
            {quizzData.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {quizzData.company}
          </Typography>
          {quizzData.leaderRequired ? (
            <FormControl fullWidth margin="normal">
              <InputLabel>Líder</InputLabel>
              <Select
                label="Líder"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
              >
                {quizzData.leaders.map((leader) => (
                  <MenuItem key={leader} value={leader}>
                    {leader}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
          <Typography variant="h7" align="center" gutterBottom>
            {quizzData.leader}
          </Typography>
          )}
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
