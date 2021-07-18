import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLogintDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}