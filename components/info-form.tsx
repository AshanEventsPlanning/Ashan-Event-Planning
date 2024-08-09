import { useQuery } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Report from "./report";
import { useState } from "react";
import { getChairs } from "@/lib/api/chair";
import { getTables } from "@/lib/api/table";
import { FormControl, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material";
import SelectSpaceShape from "@/components/select-shape";
import SelectionDialog from "@/components/selection-dialog";
import ShapeRenderer from "@/components/ShapeRenderer";
import { getArrangements } from "@/lib/api/arrangement";
import BoundariesAndObstacles from "@/components/boundariesAndObstacles";
import Visualization from "@/components/Visualization";
import * as React from "react";

function InfoForm() {
  type InfoFormData = {
    chair: string;
    table: string;
    arrangement: string;
    lengthStr: string;
    widthStr: string;
    location: string;
    date: string;
    time: string;
  };

  const { data: chairs } = useQuery({ queryKey: ["CHAIRS"], queryFn: getChairs });
  const { data: tables } = useQuery({ queryKey: ["TABLES"], queryFn: getTables });
  const { data: arrangements } = useQuery({ queryKey: ["ARRANGEMENTS"], queryFn: getArrangements });

  const [chair, setChair] = useState<any>("");
  const [table, setTable] = useState<any>("");
  const [reservationData, setReservationData] = useState({
    location: "",
    date: "",
    time: ""
  });
  const [showMessage, setShowMessage] = useState(false)
  const [selectedShapes, setSelectedShapes] = useState<any[]>([]);

  const handleReservationDataChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setReservationData({...reservationData, [name]: value});
  }

  const handleSelectShapes = (newShape: any) => {
    setSelectedShapes((prevShapes) => [...prevShapes, { ...newShape, selectedArrangement: null, maxArrangements: 0, noOfArrangements: 0, spaceAroundArrangement: 0, spaceAroundChair: 0, obstacles: [] }]);
  };

  const formatDimensions = (shape: any, dimensions: { length: any; height: any; radius: any; a: any; b: any; h: any; }) => {
    switch (shape) {
      case "Square":
        return `Length: ${dimensions.length}`;
      case "Rectangle":
        return `Length: ${dimensions.length}, Height: ${dimensions.height}`;
      case "Triangle":
        return `Base Length: ${dimensions.length}, Height: ${dimensions.height}`;
      case "Circle":
        return `Radius: ${dimensions.radius}`;
      case "Ellipse":
        return `Length: ${dimensions.length}, Height: ${dimensions.height}`;
      case "Trapezium":
        return `Length (a): ${dimensions.a}, Length (b): ${dimensions.b}, Height: ${dimensions.h}`;
      case "Parallelogram":
        return `Length: ${dimensions.length}, Height: ${dimensions.height}`;
      default:
        return "";
    }
  };

  const handleSelect = (e: { type: string; value: any; }) => {
    const { type, value } = e;
    if (type === "Chair" && chairs) {
      setChair(value);
    }
    if (type === "Table" && tables) {
      setTable(value);
    }
  };
  const handleSelectArrangement = (shapeIndex: number, arrangementId: string) => {
    const selectedValue = arrangements && arrangements.filter((a) => a._id === arrangementId)[0];
    setSelectedShapes((prevShapes) => {
      const newShapes = [...prevShapes];
      newShapes[shapeIndex].selectedArrangement = selectedValue;

      if (chair && table && selectedValue) {
        const chairLength = parseInt(chair.length);
        const spaceAroundChair = parseInt(newShapes[shapeIndex].spaceAroundChair) || 0;
        const chairWidth = parseInt(chair.width) + (2 * spaceAroundChair);
        const tableLength = parseInt(table.length) + (2 * spaceAroundChair);
        const tableWidth = parseInt(table.width);
        const chairsPerTable = selectedValue.chairspertable;
        const spaceAroundArrangement = parseInt(newShapes[shapeIndex].spaceAroundArrangement) || 0;


        const tableArea = tableLength * tableWidth;
        const unUsableChairArea = (chairWidth * chairWidth) * 4;
        const chairArea = ((tableLength + (2 * chairWidth)) * (tableWidth + (2 * chairWidth))) - (tableArea + unUsableChairArea);
        const totalAreaNeedForChairs = ((chairWidth) * (chairLength )) * chairsPerTable;

        const arrangementLength = tableLength + (2 * spaceAroundArrangement) + (2 * chairWidth);
        const arrangementWidth = tableWidth + (2 * spaceAroundArrangement) + (2 * chairWidth);

        newShapes[shapeIndex].arrangements = [{
          width: arrangementWidth,
          length: arrangementLength,
          count: 3
        }];

        // Calculate max arrangements based on shape
        const shape = newShapes[shapeIndex];
        let maxArrangements = calculateMaxArrangements(shape, arrangementLength, arrangementWidth);

        // Adjust for obstacles
        const totalObstacleArea = shape.obstacles.reduce((sum: any, obs: { area: any; }) => sum + obs.area, 0);
        const obstacleRatio = totalObstacleArea / shape.area;
        maxArrangements = Math.floor(maxArrangements * (1 - obstacleRatio));

        newShapes[shapeIndex].maxArrangements = maxArrangements;

        if (Math.floor(chairArea / totalAreaNeedForChairs) === 0 || maxArrangements === 0) {
          alert("Can't fit any arrangements");
        }
      }
      return newShapes;
    });
  };

  const calculateMaxArrangements = (shape: any, arrangementLength: number, arrangementWidth: number): number => {
    switch (shape.shape) {
      case "Rectangle":
      case "Square":
        return calculateRectangularFit(
          shape.dimensions.length,
          shape.dimensions.height || shape.dimensions.length,
          arrangementLength,
          arrangementWidth
        );
      case "Circle":
        return calculateCircularFit(
          shape.dimensions.radius,
          arrangementLength,
          arrangementWidth
        );
      case "Triangle":
        return calculateTriangularFit(
          shape.dimensions.length,
          shape.dimensions.height,
          arrangementLength,
          arrangementWidth
        );
      case "Ellipse":
        return calculateEllipseFit(
          shape.dimensions.length,
          shape.dimensions.height,
          arrangementLength,
          arrangementWidth
        );
      case "Trapezium":
        return calculateTrapeziumFit(
          shape.dimensions.a,
          shape.dimensions.b,
          shape.dimensions.h,
          arrangementLength,
          arrangementWidth
        );
      case "Parallelogram":
        return calculateParallelogramFit(
          shape.dimensions.length,
          shape.dimensions.height,
          arrangementLength,
          arrangementWidth
        );
      default:
        return Math.floor(shape.area / (arrangementLength * arrangementWidth));
    }
  };

  const calculateRectangularFit = (spaceLength: number, spaceWidth: number, itemLength: number, itemWidth: number): number => {
    const lengthWise = Math.floor(spaceLength / itemLength);
    const widthWise = Math.floor(spaceWidth / itemWidth);
    return lengthWise * widthWise;
  };

  const calculateCircularFit = (radius: number, itemLength: number, itemWidth: number): number => {
    const diameter = radius * 2;
    const squareFit = calculateRectangularFit(diameter, diameter, itemLength, itemWidth);
    return Math.floor(squareFit * 0.78); // Approximate circular area ratio
  };

  const calculateTriangularFit = (base: number, height: number, itemLength: number, itemWidth: number): number => {
    const rectangularArea = base * height / 2;
    return Math.floor(rectangularArea / (itemLength * itemWidth) * 0.65); // Approximation
  };

  const calculateEllipseFit = (a: number, b: number, itemLength: number, itemWidth: number): number => {
    const rectangularArea = a * b;
    return Math.floor(rectangularArea / (itemLength * itemWidth) * 0.78); // Similar to circular approximation
  };

  const calculateTrapeziumFit = (a: number, b: number, h: number, itemLength: number, itemWidth: number): number => {
    const area = (a + b) * h / 2;
    return Math.floor(area / (itemLength * itemWidth) * 0.85); // Approximation
  };

  const calculateParallelogramFit = (base: number, height: number, itemLength: number, itemWidth: number): number => {
    const area = base * height;
    return Math.floor(area / (itemLength * itemWidth) * 0.9); // Approximation
  };

  const handleSpaceAroundChange = (shapeIndex: number, data: any) => {
    setSelectedShapes((prevShapes) => {
      const newShapes = [...prevShapes];
      newShapes[shapeIndex].spaceAroundArrangement = data.spaceAroundArrangement;
      newShapes[shapeIndex].spaceAroundChair = data.spaceAroundChair;
      newShapes[shapeIndex].obstacles = data.obstacles;
      newShapes[shapeIndex].selectedArrangement =""
      return newShapes;
    });
  };

  const infoForm = useForm<InfoFormData>({
    mode: "onChange"
  });

  const handleInfoSubmit: SubmitHandler<InfoFormData> = async (data) => {
    const reportData = {
      arrangements: selectedShapes,
      chair: chair,
      table: table,
      reservationData: reservationData,
    };
    console.log(reportData);
  };

  const handleShowMessage =(state: boolean | ((prevState: boolean) => boolean))=>{
    setShowMessage(state)
  }

  return (
    <FormProvider {...infoForm}>
      <form onSubmit={infoForm.handleSubmit(handleInfoSubmit)}>
        <h1 className="text-xl font-semibold mb-3 mx-9 bg-green-400 p-2 ">Space Parameters</h1>
        <div className="py-2 lg:px-8 rounded-md grid lg:grid-cols-3 gap-x-6 lg:mt-2 mx-4" style={{ marginBottom: "2rem" }}>
          <div className="mt-2" >
            <h1 className="text-xl font-semibold mb-6 ">Select Shape</h1>
            <SelectSpaceShape onSelectShape={handleSelectShapes} onSelectInput={(handleShowMessage)} />
          </div>
          <div className="mt-2" >
            <h1 className="text-xl font-semibold mb-6">Select a Chair</h1>
            <SelectionDialog items={chairs && chairs} name={"Select Chair Type"} type={"Chair"}
                             handleSelect={handleSelect} message={showMessage} />
          </div>
          <div className="mt-2" >
            <h1 className="text-xl font-semibold mb-6">Select a Table</h1>
            <SelectionDialog items={tables && tables} name={"Select Table Type"} type={"Table"}
                             handleSelect={handleSelect} message={showMessage} />
          </div>


        </div>
        <div className="mx-10 mt-4">
          <h1 className="text-lg font-semibold mb-6 bg-green-400 p-2">Space Information</h1>
          {selectedShapes.length !== 0 ?<List style={{ width: "100%" }}>
            {selectedShapes.map((shapeObj, index) => (
              <ListItem key={index} style={{ width: "100%" }}>
                <div style={{ marginBottom: "1rem", display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                  <div style={{ flex: 0.5, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ShapeRenderer shape={shapeObj.shape} dimensions={shapeObj.dimensions} />
                  </div>
                  <div style={{ flex: .7, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography style={{ marginRight: "1rem" }}>
                      {shapeObj.shape} - {formatDimensions(shapeObj.shape, shapeObj.dimensions)} -
                      Area: {shapeObj.area.toFixed(2)}
                    </Typography>
                  </div>
                  <div style={{ flex: 0.7, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <BoundariesAndObstacles index={index} onChange={handleSpaceAroundChange} shape={shapeObj} />
                  </div>
                  <div style={{ flex: 0.6, display: "flex", justifyContent: "center", alignItems: "center", marginRight:'1rem' }}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label">Select an Arrangement</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={shapeObj.selectedArrangement ? shapeObj.selectedArrangement._id : ""}
                        label="Select an Arrangement"
                        size={"medium"}
                        onChange={(e) => handleSelectArrangement(index, e.target.value)}
                      >
                        {arrangements && arrangements.map((arrangement) => (
                          <MenuItem key={arrangement._id} value={arrangement._id}>{arrangement.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ flex: 0.4, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <TextField
                      label="No of Arrangements"
                      type="number"
                      fullWidth
                      placeholder={`Max: ${shapeObj.maxArrangements}`}
                      name="noOfArrangements"
                      value={shapeObj.noOfArrangements || 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setSelectedShapes((prevShapes) => {
                          const newShapes = [...prevShapes];
                          newShapes[index].noOfArrangements = Math.min(Math.max(value, 0), shapeObj.maxArrangements);
                          return newShapes;
                        });
                      }}
                      inputProps={{
                        min: 0,
                        max: shapeObj.maxArrangements,
                        readOnly: true,
                        style: {
                          textAlign: 'center',
                          MozAppearance: 'textfield',
                        },
                      }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        },
                        style: {
                          WebkitAppearance: 'none',
                          margin: 0
                        },
                      }}
                    />
                  </div>
                  <div style={{ flex: 0.3, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Visualization shape={shapeObj}/>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>:<div className="flex justify-center italic">No Space Information Available</div>}
        </div>

        <div className="mx-10 mt-4" >
          <h1 className="text-lg font-semibold mb-6 bg-green-400 p-2">Reservation Details</h1>
          <div style={{display:'flex',width: "100%", gap:20}}>
            <TextField fullWidth margin={'normal'} type='text' label="Location" name="location"  onChange={handleReservationDataChange}  />
            <TextField fullWidth margin={'normal'} type='date' label="Date" InputLabelProps={{ shrink: true }} name="date" onChange={handleReservationDataChange} />
            <TextField fullWidth margin={'normal'} type='time' label="Time" InputLabelProps={{ shrink: true }} name="time" onChange={handleReservationDataChange} />
          </div>
          <div style={{marginTop:'3rem', marginBottom:'3rem'}}>
            <Report order={{
              arrangements:selectedShapes,
              chair:chair,
              table:table,
              reservationData:reservationData,
            }} isDisabled={false}  />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default InfoForm;