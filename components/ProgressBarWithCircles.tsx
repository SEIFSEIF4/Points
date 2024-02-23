import React from "react";

const ProgressBarWithCircles = ({ progress, checkpoint, color }: any) => {
  const numberOfCircles = Math.ceil(checkpoint / 10); // Assuming each circle represents 10% progress
  const circleInterval = 100 / numberOfCircles; // Calculate the interval for each circle

  const renderCircles = () => {
    const circles = [];
    for (let i = 1; i <= numberOfCircles; i++) {
      const circleStyle: React.CSSProperties = {
        position: "absolute",
        left: `${i * circleInterval - circleInterval / 2}%`, // Adjust the position based on your styling needs
        transform: "translateX(-50%)",
        backgroundColor: color,
        width: "20px", // Adjust the circle size based on your styling needs
        height: "20px",
        borderRadius: "50%",
        zIndex: 2,
      };

      circles.push(<div key={i} style={circleStyle}></div>);
    }
    return circles;
  };

  return (
    <div className="relative w-full">
      {renderCircles()}
      <div className="relative w-full h-4 bg-gray-300">
        <div
          className="h-full bg-red-500"
          style={{ width: `${progress * 100}%`, zIndex: 1 }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarWithCircles;
