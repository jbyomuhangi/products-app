"use client";

import {
  ErrorBoundary,
  ErrorBoundaryProps as SentryErrorBoundaryProps,
} from "@sentry/nextjs";
import React from "react";

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
  ErrorBoundaryProps?: SentryErrorBoundaryProps;
}

const ClientErrorBoundary: React.FC<ClientErrorBoundaryProps> = ({
  children,
  ErrorBoundaryProps,
}) => {
  return <ErrorBoundary {...ErrorBoundaryProps}>{children}</ErrorBoundary>;
};

export default ClientErrorBoundary;
