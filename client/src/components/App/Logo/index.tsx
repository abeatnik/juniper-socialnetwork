import React, { Component } from "react";
import "./style.css";

interface LogoProps {}

interface LogoState {}

export default class Logo extends Component<LogoProps, LogoState> {
    constructor(props: LogoProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <>
                <div className="logo">
                    <img
                        src="/assets/astronomy-planet-rings-svgrepo-com.svg"
                        alt="logo"
                    />
                </div>
            </>
        );
    }
}
