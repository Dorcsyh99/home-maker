import { User } from "src/auth/interfaces/user.interface";

export class createHomeDto {
    readonly uploader: User;
    readonly city: string;
    readonly city2: string;
    readonly address: string;
    readonly size: number;
    readonly rooms: number;
    readonly condition: string;
    readonly level: number;
    readonly levelsInBuilding: number;
    readonly year: number;
    readonly type: string;
    readonly heating: string;
    readonly parking: string;
    readonly price: number;
    readonly elevator: boolean;
    readonly garden: boolean;
    readonly attic: boolean;
    readonly pet: boolean;
    readonly smoke: boolean;

}