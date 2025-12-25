export interface SuccessLoginResponseI {
  message: string
  user: UserResponseI
  token: string
}

export interface UserResponseI {
  name: string
  email: string
  role: string
}
export interface FailedLoginResponseI {
  statusMsg: string
  message: string
}
