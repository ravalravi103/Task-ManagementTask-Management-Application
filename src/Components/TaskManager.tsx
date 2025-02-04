
import { Grid2, ThemeProvider, CssBaseline } from '@mui/material';
import AppLayout from './Layout/AppLayout';
import { useThemeConfig } from '../Theme/useThemeConfig';

const TaskManager = () => {
    const { darkMode, theme, toggleMode } = useThemeConfig();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid2 container spacing={1}>
                <AppLayout darkMode={darkMode} changeMode={toggleMode} />
            </Grid2>
        </ThemeProvider>
    );
};

export default TaskManager;