"use client";
import { useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ShapeRenderer from "@/components/ShapeRenderer";

export default function SelectSpaceShape({ onSelectShape }) {
  const [shape, setShape] = useState("");
  const [dimensions, setDimensions] = useState({ length: "", height: "", radius: "", width: "", a: "", b: "", h: "" });

  const handleShapeChange = (event) => {
    setShape(event.target.value);
    setDimensions({ length: "", height: "", radius: "", width: "", a: "", b: "", h: "" }); // Reset dimensions on shape change
  };

  const handleDimensionChange = (event) => {
    const { name, value } = event.target;
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [name]: value
    }));
  };

  const calculateArea = () => {
    switch (shape) {
      case "Square":
        return dimensions.length * dimensions.length;
      case "Rectangle":
        return dimensions.length * dimensions.height;
      case "Triangle":
        return (dimensions.length * dimensions.height) / 2;
      case "Circle":
        return Math.PI * dimensions.radius * dimensions.radius;
      case "Ellipse":
        return Math.PI * dimensions.length * dimensions.height;
      case "Trapezium":
        return ((parseFloat(dimensions.a) + parseFloat(dimensions.b)) * dimensions.h) / 2;
      case "Parallelogram":
        return dimensions.length * dimensions.height;
      default:
        return 0;
    }
  };

  const handleAddShape = () => {
    const area = calculateArea();
    const newShape = { shape, dimensions: { ...dimensions }, area };
    onSelectShape(newShape)
    setShape("");
    setDimensions({ length: "", height: "", radius: "", width: "", a: "", b: "", h: "" }); // Reset dimensions
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Area Shape</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={shape}
          label="Select Area Shape"
          onChange={handleShapeChange}
        >
          <MenuItem value="Square">Square</MenuItem>
          <MenuItem value="Rectangle">Rectangle</MenuItem>
          <MenuItem value="Triangle">Triangle</MenuItem>
          <MenuItem value="Circle">Circle</MenuItem>
          <MenuItem value="Ellipse">Ellipse</MenuItem>
          <MenuItem value="Trapezium">Trapezium</MenuItem>
          <MenuItem value="Parallelogram">Parallelogram</MenuItem>
        </Select>
      </FormControl>

      {shape && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            {["Square", "Rectangle", "Parallelogram", "Ellipse"].includes(shape) && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={`/shapes/${shape}.png`} alt="shape" style={{ width: 200, height: 200 }} />
                  <TextField
                    label="Length"
                    name="length"
                    size={"small"}
                    style={{ width: '60%' }}
                    value={dimensions.length}
                    onChange={handleDimensionChange} />
                </div>
                {shape !== "Square" && (
                  <div>
                    <TextField
                      label="Height"
                      name="height"
                      size={"small"}
                      style={{ width: '50%' }}
                      value={dimensions.height}
                      onChange={handleDimensionChange} />
                  </div>
                )}
              </div>
            )}
            {shape === "Circle" && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                <img src={`/shapes/${shape}.png`} alt="shape" style={{ width: 200, height: 200 }} />
                <TextField
                  label="Radius"
                  name="radius"
                  size={"small"}
                  style={{ width: '30%' }}
                  type={'number'}
                  value={dimensions.radius}
                  onChange={handleDimensionChange} />
              </div>
            )}
            {shape === "Triangle" && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={`/shapes/${shape}.png`} alt="shape" style={{ width: 200, height: 200 }} />
                  <TextField
                    type={'number'}
                    label="Base Length"
                    name="length"
                    size={"small"}
                    style={{ width: '60%' }}
                    value={dimensions.length}
                    onChange={handleDimensionChange} />
                </div>
                <TextField
                  type={'number'}
                  label="Height"
                  name="height"
                  style={{ width: '30%', marginBottom: '3rem' }}
                  size={"small"}
                  value={dimensions.height}
                  onChange={handleDimensionChange} />
              </div>
            )}
            {shape === "Trapezium" && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TextField
                    type={'number'}
                    label="Length (a)"
                    name="a"
                    size={"small"}
                    style={{ width: '60%' }}
                    value={dimensions.a}
                    onChange={handleDimensionChange} />
                  <img src={`/shapes/${shape}.png`} alt="shape" style={{ width: 200, height: 200 }} />
                  <TextField
                    type={'number'}
                    label="Length (b)"
                    name="b"
                    size={"small"}
                    style={{ width: '60%' }}
                    value={dimensions.b}
                    onChange={handleDimensionChange} />
                </div>
                <div>
                  <TextField
                    type={'number'}
                    label="Height (h)"
                    name="h"
                    size={"small"}
                    style={{ width: '60%' }}
                    value={dimensions.h}
                    onChange={handleDimensionChange} />
                </div>
              </div>
            )}
          </div>
          <Button fullWidth variant='outlined' style={{ bottom: 0 }} color={'success'} onClick={handleAddShape}>Add</Button>
        </div>
      )}
    </div>
  );
}