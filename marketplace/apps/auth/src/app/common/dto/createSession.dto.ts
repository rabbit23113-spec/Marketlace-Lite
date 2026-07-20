export class CreateSessionDto {
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
}
