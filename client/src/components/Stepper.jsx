import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Getting Ready", "Delivering", "Delivered"];

export default function HorizontalLinearAlternativeLabelStepper({
  status,
  handleClick,
  id,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={status} alternativeLabel>
        <Step>
          <StepLabel>{steps[0]}</StepLabel>
        </Step>
        <Step onClick={() => handleClick(1, id)}>
          <StepLabel>{steps[1]}</StepLabel>
        </Step>
        <Step onClick={() => handleClick(3, id)}>
          <StepLabel>{steps[2]}</StepLabel>
        </Step>
      </Stepper>
    </Box>
  );
}
