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
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#090A0D] px-6 text-center text-[#F4F5F7]">
          <h1 className="text-2xl font-bold">Something interrupted the page view.</h1>
          <p className="mt-3 max-w-md text-sm text-[#A6ADBB]">
            You can return to the homepage or reload the current page to continue exploring GrowthPilot.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="/"
              className="rounded-md bg-[#F4F5F7] px-5 py-2.5 text-sm font-semibold text-[#090A0D] hover:bg-[#18C4A8] transition-colors"
            >
              Return to Home
            </a>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md border border-white/20 bg-[#111318] px-5 py-2.5 text-sm font-medium text-[#F4F5F7] hover:border-white/40 transition-colors"
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
