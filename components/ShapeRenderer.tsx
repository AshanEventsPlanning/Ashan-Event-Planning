// ShapeRenderer.tsx
import React, { useState } from "react";
import Draggable from "react-draggable";

interface ShapeRendererProps {
  shape: string;
  dimensions: any;
  arrangements?: { x: number, y: number, width: number, length: number, count: number }[];
  size?: number;
  noOfArrangements?:number
}

const ShapeRenderer: React.FC<ShapeRendererProps> = ({ shape, dimensions, arrangements = [], size = 60,noOfArrangements=0 }) => {
  const svgStyle = {
    width: size,
    height: size,
    marginRight: "10px",
  };
  const [imagePosition, setImagePosition] = useState({ x: 1, y: 1 });
  const renderArrangements = (position) => {
    return arrangements.map((arrangement, index) => {
      const { width, length, x, y } = arrangement;
      const ratio = (width * length) / (dimensions.length * dimensions.length);
      const svgStyle2 = {
        width: size * ratio,
        height: size * ratio,
      };

      return (
        <Draggable key={index} bounds="parent" position={position}
                disabled  >
          <rect
            width={(length / dimensions.length) * 100}
            height={(width / dimensions.length) * 100}
            fill="red"
          />
        </Draggable>
      );
    });
  };

  switch (shape) {
    case "Square":
      return (
        <svg style={svgStyle} viewBox="0 0 100 100">
          <rect width="100" height="100" fill="lightblue" />
          {Array.from({ length: noOfArrangements}).map((_, index) => {
            const width = arrangements.length !==0 && (arrangements[0].length/ dimensions.length)*100
            return renderArrangements({ x: 0+(width+(index*30)), y: 1 })
          })}
        </svg>
      );
    case "Rectangle":
      const rectWidth = 100;
      const rectHeight = (dimensions.height / dimensions.length) * 100;
      return (
        <div style={{ position: 'relative', width: size, height: (size * rectHeight) / 100 }}>
          <svg style={{ width: '100%', height: '100%' }} viewBox={`0 0 100 ${rectHeight}`}>
            <rect width={rectWidth} height={rectHeight} fill="lightgreen" />
            {Array.from({ length: noOfArrangements}).map((_, index) => {
              const width = arrangements.length !==0 && (arrangements[0].length/ dimensions.length)*100
              return renderArrangements({ x: 0+(width+(index*30)), y: 1 })
            })}
          </svg>

        </div>
      );
    case "Triangle":
      return (
        <div style={{ position: 'relative', width: size, height: size }}>
          <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 100">
            <polygon points="0,100 50,0 100,100" fill="yellow" />
          </svg>
          {renderArrangements()}
        </div>
      );
    case "Circle":
      return (
        <div style={{ position: 'relative', width: size, height: size }}>
          <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="lightpink" />
          </svg>
          {renderArrangements()}
        </div>
      );
    case "Ellipse":
      const ryRatio = dimensions.height / dimensions.length;
      return (
        <div style={{ position: 'relative', width: size, height: size * ryRatio }}>
          <svg style={{ width: '100%', height: '100%' }} viewBox={`0 0 100 ${100 * ryRatio}`}>
            <ellipse cx="50" cy={50 * ryRatio} rx="50" ry={50 * ryRatio} fill="lavender" />
          </svg>
          {renderArrangements()}
        </div>
      );
    case "Trapezium":
      const a = parseFloat(dimensions.a);
      const b = parseFloat(dimensions.b);
      const h = parseFloat(dimensions.h);
      const maxSide = Math.max(a, b);
      const topWidth = (a / maxSide) * 100;
      const bottomWidth = (b / maxSide) * 100;
      const trapHeight = (h / maxSide) * 100;
      return (
        <div style={{ position: 'relative', width: size, height: (size * trapHeight) / 100 }}>
          <svg style={{ width: '100%', height: '100%' }} viewBox={`0 0 100 ${trapHeight}`}>
            <polygon
              points={`${(100 - topWidth) / 2},0 ${(100 + topWidth) / 2},0 100,${trapHeight} 0,${trapHeight}`}
              fill="lightsalmon"
            />
          </svg>
          {renderArrangements()}
        </div>
      );
    case "Parallelogram":
      const length = parseFloat(dimensions.length);
      const height = parseFloat(dimensions.height);
      const skewRatio = 0.3; // Adjust this value to change the slant
      const paraHeight = (height / length) * 100;
      return (
        <div style={{ position: 'relative', width: size + (size * skewRatio * paraHeight) / 100, height: (size * paraHeight) / 100 }}>
          <svg style={{ width: '100%', height: '100%' }} viewBox={`0 0 ${100 + skewRatio * paraHeight} ${paraHeight}`}>
            <polygon
              points={`${skewRatio * paraHeight},0 ${100 + skewRatio * paraHeight},0 100,${paraHeight} 0,${paraHeight}`}
              fill="lightcoral"
            />
          </svg>
          {renderArrangements()}
        </div>
      );
    default:
      return null;
  }
};

export default ShapeRenderer;
