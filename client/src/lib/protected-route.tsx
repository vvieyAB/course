import { Loader2 } from "lucide-react";
import { Route } from "wouter";
import { ComponentType } from "react";

// Simplified ProtectedRoute that always allows access
export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: ComponentType<any>;
}) {
  // Always render the protected component - no auth checks
  return (
    <Route path={path}>
      <Component />
    </Route>
  );
}

// Simplified AuthRedirectRoute that always shows the component
export function AuthRedirectRoute({
  path,
  component: Component,
  redirectTo = "/",
}: {
  path: string;
  component: ComponentType<any>;
  redirectTo?: string;
}) {
  // Always render the component - no auth checks
  return (
    <Route path={path}>
      <Component />
    </Route>
  );
}