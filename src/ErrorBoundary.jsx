import React from "react";
class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    // Oh no, an error! Let's update our state.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // We'll log the error and some useful info to the console for now.
    console.error("Error is:", error);
    console.error("Info is:", info);
  }

  render() {
    // If there's an error, let's show the fallback UI.
    // Otherwise, we'll render the child components as usual.
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
