import { createContext, FC, useState } from "react";

type LogedUser = {
	uid: string | null | undefined;
	role: string | null | undefined;
	access_token: string | null | undefined;
};
const defaultUser: LogedUser = {
	access_token: null,
	role: null,
	uid: null,
};

type ContextAuthType = {
	user: LogedUser;
	setUser: (user: LogedUser) => void;
};

type Props = {
	children: React.ReactNode;
};

export const AuthContext = createContext<ContextAuthType>({
	user: defaultUser,
	setUser: () => {},
});

export const AuthProvider: FC<Props> = ({ children }) => {
	const [user, setUser] = useState(defaultUser);
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
