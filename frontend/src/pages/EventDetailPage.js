import React, { Suspense } from "react";
import {
  useRouteLoaderData,
  useNavigate,
  useParams,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import axios from "axios";
import EventsList from "../components/EventsList";

function EventDetailPage() {
  const navigate = useNavigate();
  const params = useParams();

  // const eventDetails = useRouteLoaderData("event-detail");
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>

      <button className="goBackBtn" onClick={() => navigate("..")}>
        Go back
      </button>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  const resData = await response.json();
  return resData.event;
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "could not fetch event" }), {
    //   status: 500,
    // });
    throw json({ message: "could not fetch event" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  let id = params.id;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const eventId = params.id;
  console.log(eventId);
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }
  return redirect("/events");
}
