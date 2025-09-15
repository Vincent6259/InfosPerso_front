import { useApi } from "../../hooks/useApi";
import { userSignUp } from "../../interfaces/user";

export interface SignUpResponse {
  access_token: string;
}
  
export function useUserService() {
  const api = useApi();
  const createUser = (payload: userSignUp): Promise<SignUpResponse> =>
  api.post<SignUpResponse>("auth/signUp", payload).then(res => res.data);

  return { createUser };
}

//! forgot password 