import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { Role } from "../../types";
import useAuth from "../../hooks/useAuth";
// Extract the access token from the auth context
type Props = {
  role: Role;
  fallbackPath: string;
  ToRenderComponet: React.FC;
};

export const ProtectedRoute: FC<Props> = ({
  role,
  fallbackPath,
  ToRenderComponet,
}) => {
  const { loggedUser } = useAuth();
  return loggedUser?.role === role ? (
    <ToRenderComponet />
  ) : (
    <Navigate to={fallbackPath} />
  );
};
