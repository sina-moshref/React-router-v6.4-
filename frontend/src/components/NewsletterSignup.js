import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  const inputRef = useRef();
  useEffect(() => {
    if (state === "idle" && data && data.message) {
      inputRef.current.value = "";
      alert(data.message);
    }
  }, [state, data]);

  return (
    <fetcher.Form
      method="post"
      action="/newsLetter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        ref={inputRef}
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
