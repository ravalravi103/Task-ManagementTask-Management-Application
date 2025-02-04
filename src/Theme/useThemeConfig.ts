import { useState } from "react";
import { createTheme, Theme } from "@mui/material";

export const useThemeConfig = (): { theme: Theme; darkMode: boolean; toggleMode: () => void } => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const toggleMode = () => setDarkMode((prevMode) => !prevMode);

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    return { theme, darkMode, toggleMode };
};
