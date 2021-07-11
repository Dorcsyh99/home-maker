import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, {message: 'A jelszónak legalább 8 karakter hosszúságunak kell lenni'})
    password: string;

    @IsString()
    role: string;
}