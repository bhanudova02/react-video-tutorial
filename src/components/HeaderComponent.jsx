import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function HeaderComponent() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    function handelLogout() {
        removeCookie('UserId');
        navigate('/login')
    }
    return (
        <header className="shadow d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center gap-1">
                <img src="/react_icon.png" width={40} height={40} alt="Logo" />
                <h5 className="m-auto text-primary fw-bold">React Video Tutorials</h5>
            </div>
            <div className="d-none d-md-block">
                <ul className="list-unstyled d-flex gap-4 align-items-center m-auto">
                    <li className="d-flex align-items-center gap-1 fw-bold">
                        <Link to="/" className="text-decoration-none  text-success"><span className="bi bi-house"></span> Home</Link>
                    </li>
                    <li className="d-flex align-items-center gap-1 fw-bold text-success">
                        <Link to="/videos" className="text-decoration-none  text-success"><span className="bi bi-camera-video"></span> Videos</Link>
                    </li>
                    <li className="d-flex align-items-center gap-1 fw-bold text-success">
                        <Link to="/manage" className="text-decoration-none  text-success">
                            <span className="bi bi-gear"></span> Manage
                        </Link>
                    </li>
                    <li className="d-flex align-items-center gap-1 fw-bold text-success">
                        {cookies.UserId ? (
                            <button onClick={handelLogout} className="d-flex align-items-center gap-1 fw-bold btn btn-success" style={{ cursor: 'pointer' }}>
                                 Logout <img src="/user_icon.png" width={20} height={20} alt="user_icon" className=""/>
                            </button>
                        ) : (
                            <Link to="/login" className="text-decoration-none  text-success">
                                <span className="bi bi-box-arrow-in-right"></span> Login
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    )
}