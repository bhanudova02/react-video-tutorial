import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function RegisterComponent() {
    const navigate = useNavigate("")
    const [userDetails, setUserDetails] = useState({
        UserId: '',
        UserEmail: '',
        Password: ''
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/login'
        }).then(res => {
            setUsers(res.data);
        });
    }, []);


    const [idErr, setIdErr] = useState("");
    const [mailErr, setMailErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [clsErr, setClsErr] = useState("");


    function handelVerifyUserId(e) {
        if (e.target.value.length > 3) {
            setIdErr('');
            for (var user of users) {
                if (user.UserId !== e.target.value) {
                    setIdErr("");
                } else {
                    setIdErr('User Id Already Taken');
                    setClsErr('text-warning')
                    break;
                }
            }
        } else {
            setIdErr('UserId Is Min 4Character Is Required');
            setClsErr('text-danger')
        }
    };

    function handelVerifyMail(e) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        for (var user of users) {
            if (e.target.value.match(emailRegex)) {
                setMailErr("")
                if (user.UserEmail != e.target.value) {
                    setMailErr("");
                } else {
                    setMailErr("Email Address Already Taken");
                    setClsErr('text-danger');
                    break;
                }
            } else {
                setMailErr("Please Enter Valid Email Address")
                setClsErr('text-warning')
            }
        }
    }

    function handelVerifyPass(e) {
        if (e.target.value.length > 5) {
            setPassErr("")
        } else {
            setPassErr("Password At Least Above 5 Character")
            setClsErr("text-danger")
        }
    }


    function handelRegisterClick() {
        if (userDetails.UserId !== "" && userDetails.UserEmail !== "" && userDetails.Password !== "") {
            if (idErr === "" && mailErr === "" && passErr === "") {
                axios.post('http://127.0.0.1:5000/register', userDetails)
                    .then(response => {
                        console.log('User registered successfully:', response);
                        navigate("/login")
                    })
                    .catch(error => {
                        console.error('Error during registration:', error);
                    });
            } else {
                alert("Please resolve the validation errors");
            }
        } else {
            alert("Please fill in all the details");
        }
    }


    return (
        <div>
            <div className="p-4 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="border shadow rounded-2 p-4" style={{ width: '460px' }}>
                    <h5 className="text-center text-success">Welcome to Register Page</h5>
                    <dl>
                        <dt>User ID</dt>
                        <dd>
                            <input onKeyUp={handelVerifyUserId} type="text" className="form-control" placeholder="Enter User ID"
                                onChange={(e) => setUserDetails({
                                    UserId: e.target.value,
                                    UserEmail: userDetails.UserEmail, // No change
                                    Password: userDetails.Password  // No change
                                })}
                            />
                        </dd>
                        <dd className={`mb-3 fw-bold ${clsErr}`} style={{ fontSize: '12px' }}>{idErr}</dd>
                        <dt>Email Address</dt>
                        <dd>
                            <input onKeyUp={handelVerifyMail} type="text" className="form-control" placeholder="Enter Email Address"
                                onChange={(e) => setUserDetails({
                                    UserId: userDetails.UserId, // No change
                                    UserEmail: e.target.value.toLowerCase(),  // Update Email
                                    Password: userDetails.Password  // No change
                                })}
                            />
                        </dd>
                        <dd className={`mb-3 fw-bold ${clsErr}`} style={{ fontSize: '12px' }}>{mailErr}</dd>
                        <dt>Password</dt>
                        <dd>
                            <input onKeyUp={handelVerifyPass} type="password" className="form-control" placeholder="Enter Password"
                                onChange={(e) => setUserDetails({
                                    UserId: userDetails.UserId,  // No change
                                    UserEmail: userDetails.UserEmail, // No change
                                    Password: e.target.value // Update Password
                                })}
                            />
                        </dd>
                        <dd className={`mb-3 fw-bold ${clsErr}`} style={{ fontSize: '12px' }}>{passErr}</dd>
                        <dd>
                            <button onClick={handelRegisterClick} className="btn btn-success w-100">
                                Register
                            </button>
                        </dd>
                        <dd className="fw-semibold">
                            Already have an account? <Link to="/login">Login</Link>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );
}
