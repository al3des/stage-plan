import React from "react"
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
  Typography,
} from "@mui/material"
import "./styles.css"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import PowerIcon from "@mui/icons-material/Power"
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined"
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent"
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined"
import SpeakerOutlinedIcon from "@mui/icons-material/SpeakerOutlined"
import SpeakerIcon from "@mui/icons-material/Speaker"
import MicExternalOnOutlinedIcon from "@mui/icons-material/MicExternalOnOutlined"
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined"
import PersonIcon from "@mui/icons-material/Person"
import DeleteIcon from "@mui/icons-material/Delete"

const initialFieldsState = {
  name: "",
  instrument: "",
  need: {
    mic: { value: false, icon: <MicExternalOnIcon />, name: "mic" },
    power: { value: false, icon: <PowerIcon />, name: "power" },
    audio: {
      value: false,
      icon: <SettingsInputComponentIcon />,
      name: "audio",
    },
    monitor: { value: false, icon: <SpeakerIcon />, name: "monitor" },
    amp: { value: false, icon: <VolumeUpIcon />, name: "amp" },
  },
}

export default function App() {
  const [players, setPlayers] = React.useState([])
  const [fields, setFields] = React.useState(initialFieldsState)
  const [stage, setStage] = React.useState({})

  const handleChange = (e) => {
    console.log(fields.need)
    if (e.target.type === "checkbox") {
      setFields((x) => ({
        ...x,
        need: {
          ...fields.need,

          [e.target.name]: {
            icon: fields.need[e.target.name].icon,
            // name: e.target.name,
            value: e.target.checked,
          },
        },
      }))
      return
    }
    setFields((x) => ({ ...x, [e.target.name]: e.target.value }))
  }

  const handleClick = () => {
    setPlayers((x) => [...x, { ...fields, id: new Date() }])
    setFields(initialFieldsState)
  }

  const handleRemove = (id) => {
    setPlayers((players) => players.filter((x) => x.id !== id))
  }

  React.useEffect(() => {
    const mics = players.filter((player) => player.need.mic.value).length
    const powerLines = players.filter(
      (player) => player.need.power.value
    ).length
    const audioCables = players.filter(
      (player) => player.need.audio.value
    ).length
    const monitors = players.filter(
      (player) => player.need.monitor.value
    ).length
    const amps = players.filter((player) => player.need.amp.value).length
    setStage([
      { name: "mics", value: mics },
      { name: "power lines", value: powerLines },
      { name: "power cables", value: powerLines },
      { name: "plug cables", value: audioCables + 1 },
      { name: "monitors", value: 2 },
      { name: "amps", value: amps },
      { name: "xlr cables", value: mics + 2 },
      { name: "monitor cables", value: 2 },
    ])
  }, [players])
  console.log(stage)
  return (
    <Box>
      {players.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 4,
          }}
        >
          <Card>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary={<Typography>General Needs: </Typography>}
                  />
                </ListItem>
                {stage.map((item) => {
                  console.log(item)
                  return (
                    <ListItem>
                      <ListItemText primary={`${item.name}: ${item.value}`} />
                    </ListItem>
                  )
                })}
              </List>
            </CardContent>
          </Card>
          {players.map((player) => (
            <Card>
              <CardContent>
                <List>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        onClick={() => handleRemove(player.id)}
                        edge="end"
                        aria-label="comments"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  ></ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={player.name} />
                  </ListItem>
                  <ListItem>
                    <Typography>Needs:</Typography>
                  </ListItem>
                  {["mic", "power", "audio", "monitor", "amp"].map((item) => (
                    <>
                      {player.need[item].value && (
                        <ListItem>
                          <ListItemIcon>{player.need[item].icon}</ListItemIcon>
                          <ListItemText primary={item} />
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
      {/* Stage Plan */}
      <Typography variant="h4">Stage Plan</Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
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
              checked={fields.need.power.value}
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
              checked={fields.need.audio.value}
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
              checked={fields.need.monitor.value}
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
              checked={fields.need.amp.value}
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
  )
}
