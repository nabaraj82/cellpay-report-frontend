import React, { Component } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import * as Sentry from "@sentry/react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // Log to Sentry (only in production by default)
    Sentry.captureException(error, { extra: { errorInfo } });

    // Optional: Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      const isDev = process.env.NODE_ENV !== "production";

      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <FiAlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">
              Something went wrong
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>We're sorry for the inconvenience. Please try again.</p>

              {isDev && (
                <details className="mt-3">
                  <summary className="text-red-600 cursor-pointer">
                    Technical details
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded text-xs font-mono overflow-x-auto">
                    <p className="font-semibold">{error?.toString()}</p>
                    {errorInfo?.componentStack && (
                      <pre className="mt-2 text-gray-600">
                        {errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FiRefreshCw className="-ml-1 mr-2 h-4 w-4" />
                Try again
              </button>
            </div>

            {this.props.contactSupport && (
              <div className="mt-4 text-xs text-gray-500">
                Need help? {this.props.contactSupport}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
