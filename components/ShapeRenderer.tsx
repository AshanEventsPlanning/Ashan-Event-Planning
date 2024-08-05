import React from 'react';

// @ts-ignore
const ShapeRenderer = ({ shape, dimensions, size = 60 }) => {
  const svgStyle = {
    width: size,
    height: size,
    marginRight: '10px',
  };

  switch (shape) {
    case 'Square':
      return (
        <svg style={svgStyle} viewBox="0 0 100 100">
          <rect width="100" height="100" fill="lightblue" />
        </svg>
      );
    case 'Rectangle':
      const rectWidth = 100;
      const rectHeight = (dimensions.height / dimensions.length) * 100;
      return (
        <svg style={svgStyle} viewBox={`0 0 100 ${rectHeight}`}>
          <rect width={rectWidth} height={rectHeight} fill="lightgreen" />
        </svg>
      );
    case 'Triangle':
      return (
        <svg style={svgStyle} viewBox="0 0 100 100">
          <polygon points="0,100 50,0 100,100" fill="yellow" />
        </svg>
      );
    case 'Circle':
      return (
        <svg style={svgStyle} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" fill="lightpink" />
        </svg>
      );
    case 'Ellipse':
      const ryRatio = dimensions.height / dimensions.length;
      return (
        <svg style={svgStyle} viewBox={`0 0 100 ${100 * ryRatio}`}>
          <ellipse cx="50" cy={50 * ryRatio} rx="50" ry={50 * ryRatio} fill="lavender" />
        </svg>
      );
    case 'Trapezium':
      const a = parseFloat(dimensions.a);
      const b = parseFloat(dimensions.b);
      const h = parseFloat(dimensions.h);
      const maxSide = Math.max(a, b);
      const topWidth = (a / maxSide) * 100;
      const bottomWidth = (b / maxSide) * 100;
      const trapHeight = (h / maxSide) * 100;
      return (
        <svg style={svgStyle} viewBox={`0 0 100 ${trapHeight}`}>
          <polygon
            points={`${(100 - topWidth) / 2},0 ${(100 + topWidth) / 2},0 100,${trapHeight} 0,${trapHeight}`}
            fill="lightsalmon"
          />
        </svg>
      );
    case 'Parallelogram':
      const length = parseFloat(dimensions.length);
      const height = parseFloat(dimensions.height);
      const skewRatio = 0.3; // Adjust this value to change the slant
      const paraHeight = (height / length) * 100;
      return (
        <svg style={svgStyle} viewBox={`0 0 ${100 + skewRatio * paraHeight} ${paraHeight}`}>
          <polygon
            points={`${skewRatio * paraHeight},0 ${100 + skewRatio * paraHeight},0 100,${paraHeight} 0,${paraHeight}`}
            fill="lightcoral"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default ShapeRenderer;