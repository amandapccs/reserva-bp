import { api } from "../services/api";
import { INTERNAL_ERROR_MESSAGE } from "../utils";

export interface IHandleRegisterProps {
  email: string | undefined;
  password: string | undefined;
  givenName: string | undefined;
  familyName: string | undefined;
  role: string | undefined;
}

export const useRegister = () => {
  const handleRegister = async ({
    email,
    password,
    givenName,
    familyName,
    role,
  }: IHandleRegisterProps): Promise<string | void> => {
    const { status } = await api.post("register", {
      email,
      password,
      givenName,
      familyName,
      role,
    });

    if (status !== 201) return INTERNAL_ERROR_MESSAGE;
  };

  return { handleRegister };
};
