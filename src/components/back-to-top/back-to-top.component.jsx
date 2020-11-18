import React from "react";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const BackToTopIcon = () => {
  return (
    <Fab color="primary" aria-label="edit">
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default BackToTopIcon;
