import * as React from "react";
import "./Loading.scss"

interface LoaderProps {
    width: number;
}

const Loading = (props: LoaderProps) => {
    return (
        <>
            <div className="preloader">
                <div>Chargement</div>
            </div>
            <div className="ring"><div></div><div></div><div></div><div></div></div>
        </>
    );
};

export default Loading;