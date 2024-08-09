import React, { forwardRef, Ref, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Box, Grid } from "@mui/material";
import ItemCard from "@/components/ItemCard";

const Transition = forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// @ts-ignore
export default function SelectionDialog({ items, name, type, handleSelect, message }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleItemSelect = (item: React.SetStateAction<null>) => {
    setSelectedItem(item);
    handleSelect({ type: type, value: item });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Box>
        <Button fullWidth variant="outlined" onClick={handleClickOpen} style={{ height: "3.3rem" }}>
          {name}
        </Button>
        <Box
          style={{ border: "1px solid", height: "100%", minHeight: "41vh", maxHeight: "41vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
          {selectedItem !== null ? <ItemCard item={selectedItem} onSelect={() => {
          }} /> : <div style={{fontStyle:'italic'}} >No Item Selected</div>}
        </Box>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
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
              {name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ margin: "2rem" }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 20 }}>
            {items && items.map((item: any, index: React.Key | null | undefined) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <ItemCard item={item} onSelect={handleItemSelect} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
