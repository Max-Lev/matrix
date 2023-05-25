export class  CreateUserDto {
    readonly _id  : string;
    readonly email: string;
    readonly password: string;
    readonly created_at: Date;
    readonly roles   : string[]; 
    // access_token:string;
}
