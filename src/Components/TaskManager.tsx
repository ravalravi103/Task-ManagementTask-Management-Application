import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Card, CardContent, ThemeProvider, createTheme, CssBaseline, Switch, FormControlLabel, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import axios from 'axios';
// import TaskForm from './TaskForm/TaskForm';
// import TaskList from './TaskList/TaskList';
import { fetchTasks } from '../Redux/Slice/taskSlice';
import { useAppDispatch } from '../Redux/store';
import SideNav from './SideNav/Sidenav';

const API_URL = 'http://localhost:5000/tasks';

type TaskStatus = "Pending" | "In Progress" | "Completed";

type Task = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    status: TaskStatus;
};

const TaskManager = () => {

    const [darkMode, setDarkMode] = useState<boolean>(false);

    const changeMode = ()=>{
        setDarkMode(prevMode => !prevMode);
    }
    
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box p={1}>
                <Grid container spacing={1}>
                    <Grid container spacing={1}>
                        <SideNav darkMode={darkMode} changeMode={changeMode} />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default TaskManager;