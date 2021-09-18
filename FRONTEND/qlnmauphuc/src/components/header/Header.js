import React from "react";
import BotBar from "./botbar/BotBar";
import TopBar from "./topbar/TopBar";

export default function Header() {
  return (
    <>
      <TopBar></TopBar>
      <BotBar></BotBar>
    </>
  );
}
