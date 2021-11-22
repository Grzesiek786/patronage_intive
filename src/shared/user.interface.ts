import { Hobby } from './hobby.interface';

export interface User {
  name: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  // hobbies: Hobby[];
}
