export interface UserAuth {
  _id: string;
  username: string;
  password: string;
  token: string;
  created: string;
}

export interface AuthResult {
  message: string;
  token: boolean | string;
}