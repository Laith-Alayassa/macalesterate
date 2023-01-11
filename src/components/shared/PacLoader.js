import React from "react";
import { PacmanLoader } from "react-spinners";

export default function PacLoader() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <PacmanLoader color="#064639" />
    </div>
  );
}
