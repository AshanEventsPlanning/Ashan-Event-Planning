import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, InputAdornment, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Obstacle = {
  name: string,
  width: number,
  length: number
  area:number
}

export default function BoundariesAndObstacles({ index, onChange, shape }) {
  const [open, setOpen] = React.useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [obstacle, setObstacle] = useState(
    {
      name: "",
      width: "",
      length: "",
      area:0
    }
  );
  const [spaceAroundChair, setSpaceAroundChair] = useState("");
  const [spaceAroundArrangement, setSpaceAroundArrangement] = useState("");

  useEffect(()=>{
    setSpaceAroundChair(shape.spaceAroundChair);
    setSpaceAroundArrangement(shape.spaceAroundArrangement);
    setObstacles(shape.obstacles)
  },[shape])

  const handleObstacleInputs = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setObstacle({ ...obstacle, [name]: value });
  };

  const handleAddObstacle = () => {
    obstacle.area = parseFloat(obstacle.width)*parseFloat(obstacle.length)
    const newObstacles = [...obstacles, obstacle];
    setObstacles(newObstacles);
    setObstacle({
      name: "",
      width: "",
      length: "",
      area: 0
    });
  };
  const handleRemoveObstacle = (index: number) => {
    let newObstacles = [...obstacles];
    newObstacles.splice(index, 1);
    setObstacles(newObstacles);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = ()=>{
    const data={
      spaceAroundChair,
      spaceAroundArrangement,
      obstacles
    }
    onChange(index, data);
    handleClose()
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ mx: "1rem" }}>
        Set Boundaries & Obstacles
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth={"md"}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Boundaries and Obstacles Information</DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ m: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant={"h6"} fontWeight={"bold"}>Space Information</Typography>
                <TextField
                  size={"small"}
                  fullWidth
                  margin={"normal"}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">m</InputAdornment>
                  }}
                  label="Space Around Chair"
                  type="number"
                  name="spaceAroundChair"
                  value={spaceAroundChair}
                  onChange={(e) => setSpaceAroundChair(e.target.value)}
                />
                <TextField
                  size={"small"}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="start">m</InputAdornment>
                  }}
                  label="Space Around Arrangement"
                  type="number"
                  name="spaceAroundTable"
                  value={spaceAroundArrangement}
                  onChange={(e) => setSpaceAroundArrangement(e.target.value)}
                />
                <br />
                <Typography variant={"h6"} fontWeight={"bold"}>Obstacles Information</Typography>
                <TextField
                  margin={"normal"}
                  fullWidth
                  size={"small"}
                  label="Obstacle Name"
                  type="text"
                  name="name"
                  value={obstacle.name}
                  onChange={handleObstacleInputs}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    size={"small"}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">m</InputAdornment>
                    }}
                    label="Obstacle Length"
                    type="number"
                    name="length"
                    value={obstacle.length}
                    onChange={handleObstacleInputs}
                  />
                  <TextField
                    size={"small"}
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="start">m</InputAdornment>
                    }}
                    label="Obstacle Widtth"
                    type="number"
                    name="width"
                    value={obstacle.width}
                    onChange={handleObstacleInputs}
                  />
                </Box>
                <Button variant={"outlined"} sx={{ mt: "1rem" }} onClick={handleAddObstacle}>Add to Obstacles
                  List</Button>
              </Box>
              <Box style={{ flex: 1 }}>
                <Typography variant={"h6"} sx={{ ml: "1rem" }}>Arrangement Area Guide</Typography>
                <img src={"/ArrGuide.png"} /></Box>
            </Box>
            <Divider />
            <Typography variant={"h6"} sx={{ fontWeight: "bold", my: "1rem" }}>Obstacle of the Selected
              Area</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Obstacles Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">Obstacle Length(m)</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">Obstacle Width(m)</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">Obstacle Area(m)</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {obstacles.map((obstacle, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {obstacle.name}
                      </TableCell>
                      <TableCell align="right">{obstacle.length}</TableCell>
                      <TableCell align="right">{obstacle.width}</TableCell>
                      <TableCell align="right">{obstacle.area}</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <RemoveCircleOutlineIcon color={"error"} onClick={() => handleRemoveObstacle(index)} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
