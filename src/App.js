import React from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import "./styles.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PowerIcon from "@mui/icons-material/Power";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";
import SpeakerOutlinedIcon from "@mui/icons-material/SpeakerOutlined";
import SpeakerIcon from "@mui/icons-material/Speaker";
import MicExternalOnOutlinedIcon from "@mui/icons-material/MicExternalOnOutlined";
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import PersonIcon from "@mui/icons-material/Person";

const initialFieldsState = {
  name: "",
  instrument: "",
  need: [
    { mic: { value: false, icon: <MicExternalOnIcon />, name: "mic" } },
    { power: false, icon: <PowerIcon />, name: "power" },
    { audio: false, icon: <SettingsInputComponentIcon />, name: "audio" },
    { monitor: false, icon: <SpeakerIcon />, name: "monitor" },
    { amp: false, icon: <VolumeUpIcon />, name: "amp" }
  ]
};

export default function App() {
  const [players, setPlayers] = React.useState([]);
  const [fields, setFields] = React.useState(initialFieldsState);

  console.log(fields.need);

  return <></>;
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFields((x) => ({
        ...x,
        need: [
          ...fields.need,
          {
            [e.target.name]: {
              name: e.target.name,
              value: e.target.checked
            }
          }
        ]
      }));
      return;
    }
    setFields((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    setPlayers((x) => [...x, { ...fields, id: new Date() }]);
    setFields(initialFieldsState);
  };
  console.log(players);
  return (
    <Box>
      {/* Stage Plan */}
      <Typography variant="h4">Stage Plan</Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {players && (
          <Box>
            {players.map((player) => (
              <Card>
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={player.name} />
                    </ListItem>
                    <ListItem>
                      <Typography>Needs:</Typography>
                    </ListItem>
                    {player.need.map((item) => (
                      <>
                        {player.need[item.name] && (
                          <ListItem>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                          </ListItem>
                        )}
                      </>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
        <TextField
          type="text"
          label="name"
          name="name"
          value={fields.name}
          onChange={handleChange}
        />
        <TextField
          value={fields.instrument}
          type="text"
          label="instrument"
          name="instrument"
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.need["mic"]["value"]}
              icon={<MicExternalOnOutlinedIcon />}
              checkedIcon={<MicExternalOnIcon />}
              name="mic"
              onChange={handleChange}
            />
          }
          label="mic"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.need.power}
              icon={<PowerOutlinedIcon />}
              checkedIcon={<PowerIcon />}
              name="power"
              onChange={handleChange}
            />
          }
          label="Power"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.need.audio}
              icon={<SettingsInputComponentIcon />}
              checkedIcon={<SettingsInputComponentOutlinedIcon />}
              name="audio"
              onChange={handleChange}
            />
          }
          label="Audio I/O"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.need.monitor}
              name="monitor"
              icon={<SpeakerIcon />}
              checkedIcon={<SpeakerOutlinedIcon />}
              onChange={handleChange}
            />
          }
          label="Stage monitor"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.need.amp}
              name="amp"
              icon={<VolumeUpIcon />}
              checkedIcon={<VolumeUpOutlinedIcon />}
              onChange={handleChange}
            />
          }
          label="Amplifier"
        />
        <IconButton onClick={handleClick}>
          <AddCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
