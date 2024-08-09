import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Slider } from '@mui/material';
import ShapeRenderer from '@/components/ShapeRenderer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// @ts-ignore
export default function Visualization({ shape }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(700);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function valuetext(value: any) {
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
        <AppBar sx={{ position: 'relative', height:'6rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
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
              Shape Visualization
            </Typography>
            <div style={{width:'30%', color:'white'}}>
              <div className="mb-2" >Adjust the Size</div>
              <Slider
                aria-label="Size"
                value={size}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                style={{color:'white'}}
                step={50}
                min={100}
                max={1200}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: 'flex',
            width: '97%',
            height: '100%',
            margin: '1rem',
            border: '1px solid',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ShapeRenderer shape={shape.shape} dimensions={shape.dimensions} arrangements={shape.arrangements || []} noOfArrangements={shape.noOfArrangements}  size={size} />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
