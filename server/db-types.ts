export namespace DBTypes {
    export interface User {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        userId: string;
    }

    export interface NewUser {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
    }
}
