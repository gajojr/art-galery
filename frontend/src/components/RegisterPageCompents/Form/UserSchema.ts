interface UserSchema {
  [firstName: string]: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export type UserSchemaWithAvatar = UserSchema & {
  avatar: File;
}