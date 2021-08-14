import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class AuthCredentialsDto {    
    firstName: string;
    lastName: string;
    @IsString()
    @IsEmail()
    email: string;
    mainField: string;

    @IsString()
    @MinLength(8, {message: 'A jelszónak legalább 8 karakter hosszúságunak kell lenni'})
    password: string;
    role: string;
}
