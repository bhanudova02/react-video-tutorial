import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function LoginComponent() {
    const [userDetails, setUserDetails] = useState([]);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [userError, setUserError] = useState('');
    const [passError, setPassError] = useState('');
    const [user, setUser] = useState({
        UserId: '',
        Password: ''
    });

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/login'
        }).then(res => {
            setUserDetails(res.data);
        });
    }, []);

    function handelLogin() {
        for (const users of userDetails) {
            if (users.UserId === user.UserId || users.email === user.UserId) {
                if (users.Password === user.Password) {
                    setPassError("");
                    setUserError("");
                    setCookie('UserId', users.UserId, { expires: new Date('2025-01-01 20:44:30') });
                    navigate("/");
                } else {
                    setPassError("Invalid Password");
                    setUserError("");
                }
                break;
            }else{
                setUserError("Invalid UserId/Email");
                setPassError("");
            }
        }
    }

    return (
        <div className="p-4 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="border shadow rounded-2 p-4" style={{ width: '460px' }}>
                <h5 className="text-center text-primary">Welcome To Login Page</h5>
                <p className="text-center fw-semibold">Please Enter Login Details</p>
                <dl>
                    <dt>User ID</dt>
                    <dd>
                        <input
                            onChange={(e) => setUser({
                                UserId: e.target.value,
                                Password: user.Password
                            })}
                            type="text"
                            required
                            className="form-control"
                            placeholder="Enter UserId or Email"
                        />
                    </dd>
                    <dd className={`mb-3 text-danger fw-semibold ms-2`} style={{ fontSize: '12px' }}>{userError}</dd>
                    <dt>Password</dt>
                    <dd>
                        <input
                            onChange={(e) => setUser({
                                UserId: user.UserId,
                                Password: e.target.value
                            })}
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                        />
                    </dd>
                    <dd className={`mb-3 text-danger fw-semibold ms-2`} style={{ fontSize: '12px' }}>{passError}</dd>

                    <dd>
                        <button onClick={handelLogin} className="btn btn-primary w-100">
                            Login
                        </button>
                    </dd>
                    <dd className="fw-semibold">
                        Not register yet? <Link to="/register">Create an account <i className="bi bi-box-arrow-in-up-right"></i></Link>
                    </dd>
                </dl>
            </div>
        </div>
    );
}
