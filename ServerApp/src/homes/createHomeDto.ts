import { User } from "src/auth/interfaces/user.interface";

export class createHomeDto {
    readonly uploader: User;
    readonly city: string;
    readonly address: string;
    readonly size: number;
}