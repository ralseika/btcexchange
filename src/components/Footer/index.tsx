import React from "react";
import { GITHUB_URL } from "../../utils/constants";

export default function Footer() {
  return (
    <footer className="muted-text small">
      By Robertas Alseika |{" "}
      <a href={GITHUB_URL} target="_blank">
        Github
      </a>
    </footer>
  );
}
