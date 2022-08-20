import React from "react";

export default function ActivityCard({ name, difficulty, duration, season}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>difficulty: {difficulty}</p>
      <p>Duration: {duration}</p>
      <p>Season: {season}</p>
    </div>
  );
}
