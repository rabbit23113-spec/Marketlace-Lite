export class UserDto {
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  passwordHash: string;
  email: string;
  isVerified: boolean;
  addresses: string[];
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
