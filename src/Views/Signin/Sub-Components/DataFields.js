import { Box, FormControl, Grow, InputLabel, OutlinedInput } from "@mui/material";
import { configData } from "./configData";

export default function DataFields({ actualStep, userData, setUserData }) {

  function manageInputs(innerField, subIndex, value) {
    let newValue = value.trim()
    setUserData({ ...userData, [`${innerField}_${subIndex}`]: newValue })
  }

  return configData.map((step, index) => {
    if (index === actualStep)
      return step.fields.map((innerField, subIndex) => {
        return (
          <FormControl key={`${innerField}-${subIndex}`} variant="outlined" fullWidth margin="normal" required>
            <InputLabel>
              {step.label[subIndex]}
            </InputLabel>
            <OutlinedInput
              autoComplete={innerField}
              value={userData[`${innerField}_${subIndex}`]}
              onChange={(event) => manageInputs(innerField, subIndex, event.target.value)}
              id={`${innerField}-${subIndex}`}
              type={innerField === "new-password" ? "password" : "text"}
              label={step.label[subIndex]}
              inputProps={{ maxLength: 30, minLength: 5 }}
            />
          </FormControl>
        );
      });
    else return <Box key={index}></Box>
  });
}
