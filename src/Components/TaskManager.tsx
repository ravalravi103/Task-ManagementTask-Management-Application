import { useState } from 'react';
import { Box, Grid, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import SideNav from './SideNav/Sidenav';

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
                        <SideNav darkMode={darkMode} changeMode={changeMode} />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default TaskManager;