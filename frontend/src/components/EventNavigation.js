import React from "react";
import { Outlet } from "react-router-dom";
import EventsNavigation from "./EventsNavigation";

function EventNavigation() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventNavigation;
