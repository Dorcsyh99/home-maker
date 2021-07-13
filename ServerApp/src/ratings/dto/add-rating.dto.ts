import { User } from "src/auth/schemas/user.schema";

export class AddRatingDto {
    readonly star: number;
    readonly title: string;
    readonly description: string;
    readonly expertId: number;
}