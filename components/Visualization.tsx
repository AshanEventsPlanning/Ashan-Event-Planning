import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Slider } from "@mui/material";
import ShapeRenderer from "@/components/ShapeRenderer";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Visualization({shape}) {
  const [open, setOpen] = React.useState(false);
const [size, setSize] = useState(700)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function valuetext(value) {
    return value;
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Visualization
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Slider
              aria-label="Temperature"
              value={size}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={700}
              step={50}
              color={'secondary'}
              marks
              min={100}
              max={1200}
              onChange={(e)=> setSize(e.target.value)}
            />
          </Toolbar>
        </AppBar>
        <Box sx={{display:'flex', width:'97%', height:'100%', margin:'1rem', border:'1px solid', flexDirection:'column', justifyContent:'center', alignItems:'center'}} >
          <ShapeRenderer shape={shape.shape} dimensions={shape.dimensions} size={size} />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
