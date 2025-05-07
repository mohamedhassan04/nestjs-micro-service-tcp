import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProductsDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  stock: number;
  @IsNotEmpty()
  price: number;
  @IsOptional()
  description: string;
}
