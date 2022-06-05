import { Step, StepLabel, Stepper } from "@mui/material";
import {configData} from "./configData";

export default function StepperField({actualStep}) {
    return(
        <Stepper activeStep={actualStep}>
          {configData.map((label, index)=>{
             return (
              <Step key={index}>
                <StepLabel>{label.text}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )
}

