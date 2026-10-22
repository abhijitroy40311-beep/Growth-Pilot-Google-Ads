import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('GrowthPilot application error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center text-white">
          <h1 className="text-2xl font-bold">Something interrupted the page view.</h1>
          <p className="mt-3 max-w-md text-sm text-[#A5AAB4]">
            You can return to the homepage or reload the current page to continue exploring GrowthPilot.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="/"
              className="rounded-lg gp-gradient-bg px-5 py-2.5 text-sm font-semibold text-[#050505]"
            >
              Return to Home
            </a>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg border border-white/15 bg-[#0B0D10] px-5 py-2.5 text-sm font-medium text-white hover:border-white/30"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
