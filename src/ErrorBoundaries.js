// most code from reactjs docs for Error Boundaries
import React from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundaries extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.error("caugh an error", err, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h2>
          There was an error. <Link to="/">Click Here</Link> or wait 5 seconds
          to go back
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundaries;
