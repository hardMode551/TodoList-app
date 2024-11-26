import React, { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';

interface TaskFilterProps {
  onFilterChange: (filterStatus: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilterChange = (newFilterStatus: string) => {
    setFilterStatus(newFilterStatus);
    onFilterChange(newFilterStatus);
  };

  return (
    <ButtonGroup variant="contained">
      <Button onClick={() => handleFilterChange('all')}>Все</Button>
      <Button sx={{ backgroundColor: '#2ecc71' }} onClick={() => handleFilterChange('completed')}>
        Выполненные
      </Button>
      <Button sx={{ backgroundColor: '#e74c3c' }} onClick={() => handleFilterChange('not_completed')}>
        Невыполненные
      </Button>
    </ButtonGroup>
  );
};

export default TaskFilter;