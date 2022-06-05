import {
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import dataTransfer from "../../components/data_transfer";


import DataFields from "./Sub-Components/DataFields";
import StepperField from "./Sub-Components/StepperField";
import ManageStepButtons from "./Sub-Components/ManageStepButtons";
import { useState } from "react";


export default function Signin({ navigate }) {
  const [actualStep, setActualStep] = useState(0);
  const [userData, setUserData] = useState({
    ['family-name_1']: "",
    ['given-name_0']: "",
    ['new-password_0']: "",
    ['new-password_1']: "",
    username_0: "",
    email_0: ''
  });


  return (

    <Paper
      elevation={1}
      sx={{ background: "#fafafa", p: 5, border: 1, position: "absolute", width: '50%' }}
    >
      <Card sx={{ border: 1, p: 3 }}>
        <StepperField actualStep={actualStep} />
        <CardHeader
          title={"Registro"}
          subheader={"Llena estos datos para continuar"}
          subheaderTypographyProps={{ color: "secondary" }}
        />
        <CardContent>
          <DataFields
            actualStep={actualStep}
            userData={userData}
            setUserData={setUserData} />
        </CardContent>
        <CardActions>
          <ManageStepButtons
            actualStep={actualStep}
            setActualStep={setActualStep}
            navigate={navigate}
            userData={userData}
            setUserData={setUserData}
            dataTransfer={dataTransfer} />
        </CardActions>
      </Card>
      <Typography>
        ¿Ya tengo una cuenta?
        <Button
          color={"info"}
          onClick={() => navigate("/auth", { replace: true })}>
          Ingresa por aqui
        </Button>
      </Typography>
      <Avatar
        sx={{
          position: "absolute",
          top: "0px",
          right: "-45px",
          bgcolor: "#fafafa",
        }}
      >
        <IconButton
          color="info"
          onClick={() => navigate("/menu", { replace: true })}
        >
          <Close />
        </IconButton>
      </Avatar>
    </Paper>
  );
}
