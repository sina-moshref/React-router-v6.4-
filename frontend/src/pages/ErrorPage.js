import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title = "an error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 404) {
    message = "Did not find resource or a page";
  }
  const navigate = useNavigate();
  return (
    <div>
      <PageContent title={title}>{message}</PageContent>
      <button className="goBackBtn goHomeBtn" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}

export default ErrorPage;
