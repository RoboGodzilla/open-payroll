/* eslint-disable react/prop-types */
import { Box, IconButton, Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const HistorialAction = ({
  params,
  setJornadaSeleccionada,
  setVerJornada,
  verJornada,
}) => {
  const onClickSee = (e) => {
    e.stopPropagation(); // don't select this row after clicking
    setJornadaSeleccionada(params);
    setVerJornada(!verJornada);
  };

  return (
    <Box>
      <Tooltip title="Ver Jornada" arrow>
        <IconButton aria-label="delete" onClick={onClickSee} size="small">
          <RemoveRedEyeIcon color={"info"} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default HistorialAction;
