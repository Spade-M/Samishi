import React from "react";
import PixelTransition from "../Animations/PixelTransition/PixelTransition";
import Create from "./Create";
const More = () => {
  return (
    <div>
      <Create/>
      <div>
        <h1>Cats Fact</h1>
      </div>

      <div>
        <PixelTransition
          firstContent={
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
              alt="default pixel transition content, a cat!"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          }
          secondContent={
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center",
                backgroundColor: "rgb(0, 0, 0, 0.5)",
              }}
            >
              <p
                style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}
              >
                Meow!
              </p>
            </div>
          }
          gridSize={12}
          pixelColor="#ffffff"
          animationStepDuration={0.4}
          className="custom-pixel-card"
        />
      </div>
    </div>
  );
};

export default More;
