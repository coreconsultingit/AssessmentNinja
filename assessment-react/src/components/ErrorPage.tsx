import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // Error is a RouteErrorResponse
    errorMessage = error.statusText || error.data?.message || 'An error occurred';
  } else if (error instanceof Error) {
    // Error is a JavaScript Error object
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    // Error is a string
    errorMessage = error;
  } else {
    // Unknown error type
    errorMessage = 'An unknown error occurred';
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-lg text-red-500">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPage;