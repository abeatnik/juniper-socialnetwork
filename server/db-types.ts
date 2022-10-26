export namespace DBTypes {
    export interface User {
        first: string;
        last: string;
        email: string;
        password: string;
        userId: string;
    }

    export interface NewUser {
        first: string;
        last: string;
        email: string;
        password: string;
    }
}
