export interface UserType {
  id: string,
  username: string,
  email: string,
  password?: string,
  image?: string | null,
  isAdmin: boolean,
}