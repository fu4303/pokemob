import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    fontSize: "1rem",
    backgroundColor: theme.palette.common.black,
  },
}));

const CopyData = ({ children, onCopy }) => {
  const toolTipClasses = useStyles();

  const CustomTooltip = (props) => {
    return <Tooltip arrow classes={toolTipClasses} {...props} />;
  };

  return (
    <div className="container">
      <CustomTooltip title="Copy" placement="top">
        <IconButton aria-label="Copy" onClick={onCopy}>
          <FileCopyIcon fontSize="small" color="primary" />
        </IconButton>
      </CustomTooltip>
      {children}
    </div>
  );
};

CopyData.propTypes = {
  onCopy: PropTypes.func.isRequired,
};

export default CopyData;
