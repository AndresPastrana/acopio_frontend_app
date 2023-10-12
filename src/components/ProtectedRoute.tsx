import React, { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { Role } from "../types";
// Extract the access token from the auth context
type Props = {
	role: Role;
	fallbackPath: string;
	ToRenderComponet: React.FC;
};

const ProtectedRoute: FC<Props> = ({
	role,
	fallbackPath,
	ToRenderComponet,
}) => {
	const { user } = useContext(AuthContext);

	return user.role === role ? (
		<ToRenderComponet />
	) : (
		<Navigate to={fallbackPath} />
	);
};

export default ProtectedRoute;
