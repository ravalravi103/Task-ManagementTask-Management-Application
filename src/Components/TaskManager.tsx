import { useState } from 'react';
import { Box, Grid, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import AppLayout from './Layout/AppLayout';

const TaskManager = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const changeMode = () => {
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
                        <AppLayout darkMode={darkMode} changeMode={changeMode} />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default TaskManager;