// export class User {
export interface User {
    idToken: string;
    email: string;
    firstName: string;
    lastName: string;
    id:string;
    photoUrl: string;
    provider:string;
    
}

export class GoogleUser {
    message: string;
    user: User;
}