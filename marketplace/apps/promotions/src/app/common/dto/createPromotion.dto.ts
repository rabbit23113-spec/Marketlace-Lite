export class CreatePromotionDto {
  name: string;
  description: string;
  userId?: string;
  categoryId?: string;
  brandId?: string;
  effect: number;
  expiresAt: Date;
}
