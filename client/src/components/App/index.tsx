import { Component } from "react";

interface AppProps {
    userId: number;
}

interface AppState {}

export default class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount(): void {
        fetch(`/user/${this.props.userId}`)
            .then((response) => response.json)
            .then((userData) => {
                console.log(userData);
            });
    }

    render() {
        return (
            <>
                <h2>You are logged in now.</h2>
            </>
        );
    }
}
