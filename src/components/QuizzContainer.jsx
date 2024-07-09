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
import Logo from "../assets/logo.jpg";



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
    <Card style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0px 4px 50px #9DD8B3' }}>
      <CardContent>
        <img src={Logo} alt="Logo" width="100%"/>
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
          <Typography variant="h4" align="center" gutterBottom>
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
                  <MenuItem key={leader.idLider} value={leader.idLider}>
                    {leader.Nombre}
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
