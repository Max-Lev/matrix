// export class User {
export class User {
    access_token: string;
    _id: string;
    constructor(u: User) {
        Object.assign(this, u);
        console.log('user', this);
    }

}

export class GoogleUser {
    message: string;
    user: User;
}