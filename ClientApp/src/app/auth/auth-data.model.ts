export interface AuthData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthDataExpert {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mainField: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoggedInUser{
  email: string;
  avatar: string;
  /*password: string;
  firstName: string;
  lastName: string;
  role: string;
  registrationDate: Date;
  phone: number;
  image: string;
  jobTitle: string;
  uploadedProperties: number; */
}

