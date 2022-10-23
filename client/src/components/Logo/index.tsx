import React, { Component } from "react";

interface LogoProps {}

interface LogoState {}

export default class Logo extends Component<LogoProps, LogoState> {
    constructor(props: LogoProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <>
                <p>Hello</p>
            </>
        );
    }
}
