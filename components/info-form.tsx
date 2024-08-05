import { useQuery } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./text-input";
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
import Button from "@mui/material/Button";
import Visualization from "@/components/Visualization";

function InfoForm() {

  const { data: chairs } = useQuery({ queryKey: ["CHAIRS"], queryFn: getChairs });
  const { data: tables } = useQuery({ queryKey: ["TABLES"], queryFn: getTables });
  const { data: arrangements } = useQuery({ queryKey: ["ARRANGEMENTS"], queryFn: getArrangements });

  const [noOfArrangements, setNoOfArrangements] = useState<number | null | unknown>(null);
  const [type, setType] = useState<any>(null);
  const [spaceDimensions, setSpaceDimensions] = useState<{ length: number; width: number } | null>(null);

  const [chair, setChair] = useState<any>("");
  const [table, setTable] = useState<any>("");

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

  const [selectedShapes, setSelectedShapes] = useState<any[]>([]);

  const handleSelectShapes = (newShape: any) => {
    setSelectedShapes((prevShapes) => [...prevShapes, { ...newShape, selectedArrangement: null, maxArrangements: 0, spaceAroundArrangement: 0, spaceAroundChair: 0, obstacles: [] }]);
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
        const chairWidth = parseInt(chair.width)+ (2 * spaceAroundChair);
        const tableLength = parseInt(table.length)+ (2 * spaceAroundChair);
        const tableWidth = parseInt(table.width);
        const chairsPerTable = selectedValue.chairspertable;
        const spaceAroundArrangement = parseInt(newShapes[shapeIndex].spaceAroundArrangement) || 0;

        const tableArea = tableLength * tableWidth;
        const unUsableChairArea = (chairWidth * chairWidth) * 4;
        const chairArea = ((tableLength + (2 * chairWidth)) * (tableWidth + (2 * chairWidth))) - (tableArea + unUsableChairArea);
        const totalAreaNeedForChairs = ((chairWidth) * (chairLength )) * chairsPerTable;


        const arrangementLength = tableLength + (2 * spaceAroundArrangement) + (2 * chairWidth);
        const arrangementWidth = tableWidth + (2 * spaceAroundArrangement) + (2 * chairWidth);
        const arrangementArea = arrangementLength * arrangementWidth;

        let totalObstacleSpace = 0;
        newShapes[shapeIndex].obstacles.map((obs: any)=>{
          totalObstacleSpace = totalObstacleSpace+obs.area
        })

        const shapeArea = newShapes[shapeIndex].area;
        const shapeAreaWithoutObstacles = shapeArea - totalObstacleSpace;
        console.log(`shape:${shapeArea}, arr:${arrangementArea}, tabl:${tableArea}, char:${chairArea}, needChar:${totalAreaNeedForChairs}, tab+chair:${((tableLength + (2 * chairWidth)) * (tableWidth + (2 * chairWidth)))}, space:${arrangementArea - ((tableLength + (2 * chairWidth)) * (tableWidth + (2 * chairWidth)))} `);
        newShapes[shapeIndex].maxArrangements = Math.floor(shapeAreaWithoutObstacles / arrangementArea);

        if (Math.floor(chairArea / totalAreaNeedForChairs) === 0 || newShapes[shapeIndex].maxArrangements === 0) {
          alert("Can't fit any arrangements");
        }
      }
      return newShapes;
    });
  };

  const handleSpaceAroundChange = (shapeIndex: number, data: any) => {
    setSelectedShapes((prevShapes) => {
      const newShapes = [...prevShapes];
      newShapes[shapeIndex].spaceAroundArrangement = data.spaceAroundArrangement;
      newShapes[shapeIndex].spaceAroundChair = data.spaceAroundChair;
      newShapes[shapeIndex].obstacles = data.obstacles;
      return newShapes;
    });
  };

  const infoForm = useForm<InfoFormData>({
    mode: "onChange"
  });

  const handleInfoSubmit: SubmitHandler<InfoFormData> = async (data) => {
    console.log(data);
    let { table, chair, arrangement, lengthStr, widthStr, location, date, time } = data;

    setType(arrangement);
    const length = parseInt(lengthStr);
    const width = parseInt(widthStr);
    setSpaceDimensions({ length, width });
  };

  return (
    <FormProvider {...infoForm}>
      <form onSubmit={infoForm.handleSubmit(handleInfoSubmit)}>
        <div className="py-2 lg:px-8 rounded-md grid lg:grid-cols-3 gap-x-6 lg:mt-2" style={{ marginBottom: "4rem" }}>
          <h1 className="text-xl font-semibold mb-6">Space information</h1>
          <h1 className="text-xl font-semibold mb-6">Select a Chair</h1>
          <h1 className="text-xl font-semibold mb-6">Select a Table</h1>
          <SelectSpaceShape onSelectShape={handleSelectShapes} />
          <SelectionDialog items={chairs && chairs} name={"Select Chair Type"} type={"Chair"}
                           handleSelect={handleSelect} />
          <SelectionDialog items={tables && tables} name={"Select Table Type"} type={"Table"}
                           handleSelect={handleSelect} />
        </div>
        <List style={{ width: "100%" }}>
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
                <div style={{ flex: 0.6, display: "flex", justifyContent: "center", alignItems: "center" }}>
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

                <div style={{ flex: 0.3, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Typography>Max: {shapeObj.maxArrangements}</Typography>
                </div>
                <div style={{ flex: 0.4, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <TextField label="No of Arrangements" type="number" name="noOfArrangements" />
                </div>
                <div style={{ flex: 0.3, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Visualization shape={shapeObj}/>
                </div>
              </div>
            </ListItem>
          ))}
        </List>

        <div className="py-2 lg:px-8 rounded-md mt-2 grid lg:grid-cols-3 gap-x-6 ">
          <h1 className="text-lg font-semibold mb-6">Date & Time</h1>
          <h1></h1>
          <h1></h1>
          <div className="py-2 lg:px-8 rounded-md grid lg:grid-cols-2 gap-x-6 lg:mt-2">
            <TextInput name="location" label="Location" />
          </div>
          <div>
            <label htmlFor="date" className="block text-base font-medium py-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="border border-gray-400 rounded-md text-base py-2 px-4 w-full"
              {...infoForm.register("date")}
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-base font-medium py-2">
              Time
            </label>
            <input
              type="time"
              id="time"
              className="border border-gray-400 rounded-md text-base py-2 px-4 w-full"
              {...infoForm.register("time")}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={false}
          className="block border py-2 text-black rounded-md bg-lime-500 mb-2 mt-8 border-white"
        >
          Proceed
        </button>
      </form>
      <div>
        {noOfArrangements !== null && <Report noOfArrangements={noOfArrangements} type={type} />}
      </div>
    </FormProvider>
  );
}

export default InfoForm;