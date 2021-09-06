import React from "react";
import { ENDPOINTS, useConnectionConfig } from "../../contexts/connection";
import { useWallet } from "../../contexts/wallet";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover,
} from "@material-ui/core";

export const Network = () => {
  const { connected, disconnect } = useWallet();
  const { endpoint, setEndpoint } = useConnectionConfig();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEndpoint(event.target.value as string);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClick}
      >
        {endpoint}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <FormControl style={{ display: "flex", padding: "1em" }}>
          <InputLabel id="demo-simple-select-label">Select network</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={endpoint}
            onChange={() => handleChange}
          >
            {ENDPOINTS.map(({ name, endpoint }) => (
              <MenuItem value={endpoint}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {connected && <Button onClick={disconnect}>Disconnect</Button>}
      </Popover>
    </>
  );
};
