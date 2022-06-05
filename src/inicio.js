import { Box } from "@mui/material";
export default function Inicio({ backgroundHeight }) {
  return (
    <Box
      style={{
        height: backgroundHeight * 0.7,
        backgroundImage: `url("./images/Banner_inicio.png")`,
        width: "100%",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition:'center'
      }}
    >
    </Box>
  );
}