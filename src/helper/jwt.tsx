import jwt_decode from "jwt-decode";

export const decodeJWT = (token: string) => {
  return jwt_decode(token);
};
