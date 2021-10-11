import { IsDate, IsInt, IsPhoneNumber, IsString, Length, MinLength } from "class-validator";

export class UpdateProfileDto {
    @Length(2, 20)
    @IsString()
    firstName?: string;

    @Length(2, 20)
    @IsString()
    lastName?: string;

    @MinLength(0)
    phone?: number;

    @MinLength(0)
    city?: string;

    @MinLength(0)
    birthday?: Date;

    @MinLength(0)
    mainField?: string;

    @MinLength(0)
    additionalFields?: string[];

    avatarUrl?: string;

    uploadedHomeCount?: number;

    uploadedHomes?: string[];
}