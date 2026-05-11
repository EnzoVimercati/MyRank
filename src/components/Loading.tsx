import "../styles/Loading.css"
import "../styles/home.css"
import {Shader} from "./shaders"
import Logo from "../assets/LogoBrancaPng.png"

export function Loading() {
    return (
        <div className="container" id="loading">
            <img src={Logo} alt="Logo" className="logoLoading" />
            <Shader />
        </div>
    );
}