// export class User {
export class User {
    access_token: string;
    _id: string;
    email?:string;
    constructor(user?: User) {
        Object.assign(this, user);
    }

}

export class GoogleUser {
    message: string;
    user: User;
}