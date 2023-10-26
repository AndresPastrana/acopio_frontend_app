import { createContext, FC, useState, Dispatch, SetStateAction } from "react";

export type LogedUser = {
  uid: string | null | undefined;
  role: string | null | undefined;
  access_token: string | null | undefined;
  iat: number | null | undefined;
  exp: number | null | undefined;
  productiveBaseInCharge?: string | null | undefined;
};
const defaultUser: LogedUser = {
  access_token: null,
  role: null,
  uid: null,
  exp: null,
  iat: null,
};

type ContextAuthType = {
  user: LogedUser | null;
  setUser: Dispatch<SetStateAction<LogedUser | null>>;
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<ContextAuthType>({
  user: defaultUser,
  setUser: () => {},
});

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<LogedUser | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
