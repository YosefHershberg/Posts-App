import React, { useState, useEffect, createContext, useMemo } from "react";
import Main from "./pages/Main";
import NavbarComp from "./components/Navbar";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { currentUser } from "./state/userSlice";
import { user } from "./types";
import { AppComp } from "./styling/styles";
import { amber, deepOrange, grey, blueGrey, green, blue } from "@mui/material/colors";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";

type appContextType = {
  navToWorkSpace: () => void;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<appContextType>({
  navToWorkSpace: () => { },
  setIsFetching: () => { },
});

export default function App() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [mode, setMode] = useState("light");

  const currentUser1 = useSelector(currentUser);
  const navigate = useNavigate();
  const navToWorkSpace = () =>
    navigate(`user/${currentUser1.id}`, { replace: true });
  const navInit = () => navigate("user", { replace: true });

  const colorMode = {
    mode,
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            ...(mode === "dark" ? {
              main: grey[600],
            }
              : {
                main: blue[700],
              }),
          },
          background: {
            ...(mode === "dark" ? {
              default: blueGrey[900],
              paper: blueGrey[800],
            }
              : {
                default: grey[50],
                paper: grey[200],
              }),
          },
          text: {
            ...(mode === "light"
              ? {
                primary: grey[900],
                secondary: grey[800],
              }
              : {
                primary: "#fff",
                secondary: grey[500],
              }),
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    navInit()
    // navToWorkSpace();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppComp sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <AppContext.Provider
          value={{
            navToWorkSpace: navToWorkSpace,
            setIsFetching: setIsFetching,
          }}
        >
          <NavbarComp isFetching={isFetching} colorMode={colorMode} />
          <Main />
        </AppContext.Provider>
      </AppComp>
    </ThemeProvider>
  );
}
