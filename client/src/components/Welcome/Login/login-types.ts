export namespace LoginTypes {
    export interface State {
        email: string;
        password: string;
        userId?: string;
        errors: {
            email: boolean;
            password: boolean;
        };
        message?: string;
        showError: boolean;
    }

    export interface Login {
        email: string;
        password: string;
    }
}