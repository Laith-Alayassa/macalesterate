import React, { useState } from "react";

export default function RatingSlider() {
  const [sliderValue, setSliderValue] = useState(50);
  const [sliderColor, setSliderColor] = useState("black");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        paddingBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginBottom: 8,
            fontWeight: "bold",
            fontSize: "large",
            color: { sliderColor },
          }}
        >
          {sliderValue}
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          step={5}
          style={{
            backgroundColor: "rgba(217, 217, 217, 0.47)",
            flex: "1",
            width: "100%",
            borderRadius: 4,
          }}
          onChange={(e) => handleSliderChange(e)}
        />
      </div>
    </div>
  );

  function handleSliderChange(e) {
    setSliderValue(e.target.value);
    setSliderColor(() => {
      const weight = e.target.value;
      const color1 = [255, 0, 0];
      const color2 = [0, 255, 0];
      var w1 = weight;
      var w2 = 1 - w1;
      var rgb = [
        Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2),
      ];
      return rgb;
    });
  }
}
