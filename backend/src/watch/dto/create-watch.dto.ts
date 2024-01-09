import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWatchDto {
  @IsString()
  backdrop_path?:string;

  @IsString()
  homepage?:string;

  @IsNumber()
  @IsDefined()
  id:number;

  @IsString()
  original_title?:string;

  @IsNumber()
  popularity:number;

  @IsString()
  poster_path?:string;

  @IsString()
  title?:string;

  @IsString()
  name:string;

  @IsString()
  @IsNotEmpty()
  media_type:string;

  @IsNumber()
  vote_average:number;

  @IsNumber()
  vote_count:number;
}
