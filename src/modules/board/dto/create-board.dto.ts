import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
export class CreateBoardDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: "Status is required" })
  @IsEnum(["active", "inactive"], { message: "Status must be 'active' or 'inactive'" })
  status: "active" | "inactive";
}
