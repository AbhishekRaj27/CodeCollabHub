import { useState, useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import Space from "./pages/Space";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuth from "./hooks/useAuth";
import { ColorModeContext } from "./context/ColorModeContext";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#fff",
            paper: "#fefefa",
          },
        }
      : {
          // palette values for dark mode
          background: {
            default: "#000000",
          },
        }),
  },
});

function App() {
  const { auth } = useAuth();
  const [mode, setMode] = useState("dark");
  const theme = createTheme(getDesignTokens(mode));

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Routes>
            {auth && <Route path="dashboard" element={<Dashboard />} />}

            {!auth && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </>
            )}

            <Route path="space/:spaceId" element={<Space />} />

            <Route
              path="*"
              element={<Navigate to={auth ? "/dashboard" : "/"} />}
            />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
