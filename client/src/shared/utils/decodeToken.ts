import { JwtPayload, jwtDecode } from "jwt-decode";

interface IDecodeToken extends JwtPayload {
  id: string;
}

export const decodeToken = (): IDecodeToken | void => {
  const token = localStorage.getItem("token");

  if (!token) return;

  const decoded = jwtDecode<IDecodeToken>(token);
  return decoded;
};
