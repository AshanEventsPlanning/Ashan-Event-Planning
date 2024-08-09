import React, { useState } from "react";
import Draggable from "react-draggable";

interface ShapeRendererProps {
  shape: string;
  dimensions: any;
  arrangements?: { x: number, y: number, width: number, length: number, count: number }[];
  size?: number;
  noOfArrangements?: number;
}

const ShapeRenderer: React.FC<ShapeRendererProps> = ({
                                                       shape,
                                                       dimensions,
                                                       arrangements = [],
                                                       size = 60,
                                                       noOfArrangements = 0,
                                                     }) => {
  const svgStyle = {
    width: size,
    height: size,
  };

  const arrangeRectangles = (shapeWidth: number, shapeHeight: number, isInShape: (x: number, y: number, width: number, height: number) => boolean) => {
    let currentX = 0;
    let currentY = 0;
    const spacing = 0.2; // Space between rectangles

    return Array.from({ length: noOfArrangements }).map((_, index) => {
      const arrangement = arrangements[index % arrangements.length];
      const { width, length } = arrangement;
      const rectWidth = (length / dimensions.length) * 100;
      const rectHeight = (width / dimensions.length) * 100;

      while (currentY + rectHeight <= shapeHeight) {
        if (currentX + rectWidth > shapeWidth) {
          currentX = 0;
          currentY += rectHeight + spacing;
        }

        if (isInShape(currentX, currentY, rectWidth, rectHeight)) {
          const position = { x: currentX, y: currentY };
          currentX += rectWidth + spacing;
          return (
            <Draggable key={index} bounds="parent" position={position} disabled>
              <rect
                width={rectWidth}
                height={rectHeight}
                fill="red"
                style={{ border: '1px solid' }}
              />
            </Draggable>
          );
        }

        currentX += rectWidth + spacing;
      }

      return null;
    });
  };

  const isInSquare = (x: number, y: number, width: number, height: number) => {
    return x + width <= 100 && y + height <= 100;
  };

  const isInRectangle = (x: number, y: number, width: number, height: number) => {
    return x + width <= 100 && y + height <= (dimensions.height / dimensions.length) * 100;
  };

  const isInCircle = (x: number, y: number, width: number, height: number) => {
    const cx = 50, cy = 50, r = 50;
    const isWithinCircle = (x: number, y: number) => {
      const dx = x - cx;
      const dy = y - cy;
      return (dx * dx + dy * dy) <= (r * r);
    };
    return isWithinCircle(x, y) && isWithinCircle(x + width, y) && isWithinCircle(x, y + height) && isWithinCircle(x + width, y + height);
  };

  const isInTriangle = (x: number, y: number, width: number, height: number) => {
    const isWithinTriangle = (x: number, y: number) => {
      return y <= (-x + 100) && y <= (x + 100) && y >= 0;
    };
    return isWithinTriangle(x, y) && isWithinTriangle(x + width, y) && isWithinTriangle(x, y + height) && isWithinTriangle(x + width, y + height);
  };

  const isInEllipse = (x: number, y: number, width: number, height: number) => {
    const rx = 50, ry = 50 * (dimensions.height / dimensions.length);
    const cx = 50, cy = ry;
    const isWithinEllipse = (x: number, y: number) => {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      return (dx * dx + dy * dy) <= 1;
    };
    return isWithinEllipse(x, y) && isWithinEllipse(x + width, y) && isWithinEllipse(x, y + height) && isWithinEllipse(x + width, y + height);
  };

  const isInTrapezium = (x: number, y: number, width: number, height: number) => {
    const a = parseFloat(dimensions.a);
    const b = parseFloat(dimensions.b);
    const h = parseFloat(dimensions.h);
    const topWidth = (a / Math.max(a, b)) * 100;
    const bottomWidth = (b / Math.max(a, b)) * 100;
    const isWithinTrapezium = (x: number, y: number) => {
      const topY = 0;
      const bottomY = (h / Math.max(a, b)) * 100;
      const topLeft = (100 - topWidth) / 2;
      const topRight = topLeft + topWidth;
      const bottomLeft = 0;
      const bottomRight = bottomWidth;
      const slopeLeft = (bottomY - topY) / (bottomLeft - topLeft);
      const slopeRight = (bottomY - topY) / (bottomRight - topRight);
      return y >= topY && y <= bottomY && x >= (topLeft + (y - topY) / slopeLeft) && x <= (topRight + (y - topY) / slopeRight);
    };
    return isWithinTrapezium(x, y) && isWithinTrapezium(x + width, y) && isWithinTrapezium(x, y + height) && isWithinTrapezium(x + width, y + height);
  };

  const isInParallelogram = (x: number, y: number, width: number, height: number) => {
    const skewRatio = 0.3; // Adjust this value to change the slant
    const paraHeight = (parseFloat(dimensions.height) / parseFloat(dimensions.length)) * 100;
    const skewWidth = 100 + skewRatio * paraHeight;
    const isWithinParallelogram = (x: number, y: number) => {
      return x >= (y * skewRatio) && x <= (skewWidth - (paraHeight - y) * skewRatio) && y >= 0 && y <= paraHeight;
    };
    return isWithinParallelogram(x, y) && isWithinParallelogram(x + width, y) && isWithinParallelogram(x, y + height) && isWithinParallelogram(x + width, y + height);
  };

  switch (shape) {
    case "Square":
      return (
        <svg style={svgStyle} viewBox="0 0 100 100">
          <rect width="100" height="100" fill="lightblue" />
          {arrangeRectangles(100, 100, isInSquare)}
        </svg>
      );
    case "Rectangle":
      const rectWidth = 100;
      const rectHeight = (dimensions.height / dimensions.length) * 100;
      return (
        <div style={{ position: 'relative', width: size, height: (size * rectHeight) / 100 }}>
          <svg style={{ width: '100%', height: '100%' }} viewBox={`0 0 100 ${rectHeight}`}>
            <rect width={rectWidth} height={rectHeight} fill="lightgreen" />
            {arrangeRectangles(100, rectHeight, isInRectangle)}
          </svg>
        </div>
      );
    case "Triangle":
      return (
        <svg style={svgStyle} viewBox="0 0 100 100">
          <polygon points="0,100 50,0 100,100" fill='purple' />
          {arrangeRectangles(100, 100, isInTriangle)}
        </svg>
      );
    case "Circle":
      return (
        <svg style={svgStyle} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" fill="lightpink" />
          {arrangeRectangles(100, 100, isInCircle)}
        </svg>
      );
    case "Ellipse":
      const ryRatio = dimensions.height / dimensions.length;
      return (
        <svg style={svgStyle} viewBox={`0 0 100 ${100 * ryRatio}`}>
          <ellipse cx="50" cy={50 * ryRatio} rx="50" ry={50 * ryRatio} fill="lavender" />
          {arrangeRectangles(100, 100 * ryRatio, isInEllipse)}
        </svg>
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
        <svg style={{ width: size, height: (size * trapHeight) / 100 }} viewBox={`0 0 100 ${trapHeight}`}>
          <polygon
            points={`${(100 - topWidth) / 2},0 ${(100 + topWidth) / 2},0 100,${trapHeight} 0,${trapHeight}`}
            fill="lightsalmon"
          />
          {arrangeRectangles(100, trapHeight, isInTrapezium)}
        </svg>
      );
    case "Parallelogram":
      const length = parseFloat(dimensions.length);
      const height = parseFloat(dimensions.height);
      const skewRatio = 0.3; // Adjust this value to change the slant
      const paraHeight = (height / length) * 100;
      return (
        <svg style={{ width: size + (size * skewRatio * paraHeight) / 100, height: (size * paraHeight) / 100 }} viewBox={`0 0 ${100 + skewRatio * paraHeight} ${paraHeight}`}>
          <polygon
            points={`${skewRatio * paraHeight},0 ${100 + skewRatio * paraHeight},0 100,${paraHeight} 0,${paraHeight}`}
            fill="lightcoral"
          />
          {arrangeRectangles(100 + skewRatio * paraHeight, paraHeight, isInParallelogram)}
        </svg>
      );
    default:
      return null;
  }
};

export default ShapeRenderer;
