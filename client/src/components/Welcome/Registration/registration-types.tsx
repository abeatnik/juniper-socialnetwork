export namespace RegistrationTypes {
    export interface State {
        first: string;
        last: string;
        email: string;
        password: string;
        errors: {
            first: boolean;
            last: boolean;
            email: boolean;
            password: boolean;
        };
        showError: boolean;
        message?: string;
    }

    export interface NewUser {
        first: string;
        last: string;
        email: string;
        password: string;
    }
}
