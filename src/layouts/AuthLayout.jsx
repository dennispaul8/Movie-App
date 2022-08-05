import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
const AuthLayout=({children}) => {
    
    return(
            <main>
                <div>
                    {children}
                </div>
            </main>
    )

}

export default AuthLayout;