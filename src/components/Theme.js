import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#E21F25",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#000000",
            width:'5px',
            height:'5px'
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "1px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
        },
      },
    },
  },
  typography: {
    allVariants: {
      color: '#000000'
    }
  },
  palette: {
    type: "light",
    primary: {
      main: "#ff9c00",
    },
    secondary: {
      main: "#d50000",
    },
    text: {
      secondary: "#ffffff",
      disabled: "#d4bdbd",
      primary: "#000000",
    },
    info: {
      main: "#d50000",
    },
  },
});

export { theme };
