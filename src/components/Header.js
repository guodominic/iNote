import { ReactComponent as TogglOff } from "../assets/toggle-off.svg";
import { ReactComponent as TogglOn } from "../assets/toggle-on.svg";
import { ReactComponent as Sun } from "../assets/sun.svg";
import { useNavigate } from "react-router-dom";

const Header = ({ isDark, setIsDark }) => {

    const navigate = useNavigate()

    const goHome = () => {
        navigate('/home')
    }

    return (
        <div className="app-header glow">
            <h1 onClick={goHome} style={{ 'cursor': 'pointer', 'fontSize': '40px' }}>i&#8469;&#10061;&#10011;&#8519;</h1>
            <div className="themeBtn" >
                {isDark ?
                    <TogglOff style={{ "cursor": "pointer" }}
                        onClick={() => setIsDark(!isDark)}
                    />
                    : <TogglOn style={{ "cursor": "pointer" }}
                        onClick={() => setIsDark(!isDark)}
                    />}
                <Sun style={{ "paddingLeft": "5px" }} />
            </div>
        </div>
    )
}

export default Header;