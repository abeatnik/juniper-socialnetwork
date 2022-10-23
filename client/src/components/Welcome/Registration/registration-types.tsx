export namespace RegistrationTypes {
    export interface State {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        errors: {
            firstname: boolean;
            lastname: boolean;
            email: boolean;
            password: boolean;
        };
        showError: boolean;
        message?: string;
    }

    export interface NewUser {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
    }
}
