import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  longUrl: string;
}
