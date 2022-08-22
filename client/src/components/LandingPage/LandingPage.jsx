import React from "react";
import c from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={c.container}>
      <p>Welcome</p>
      <Link to="/home">Run</Link>
    </div>
  );
}
