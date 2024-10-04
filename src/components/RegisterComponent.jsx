import { Link } from "react-router-dom";

export function RegisterComponent() {
    return (
        <div>
            <div className="p-4 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="border shadow rounded-2 p-4" style={{ width: '460px' }}>
                    <h5 className="text-center text-success">Welcome To Register Page</h5>
                    <dl>
                        <dt>User ID</dt>
                        <dd>
                            <input type="text" className="form-control" placeholder="Enter UserId" />
                        </dd>
                        <dd className="mb-3"></dd>
                        <dt>Email Address</dt>
                        <dd>
                            <input type="text" className="form-control" placeholder="Enter Email Address" />
                        </dd>
                        <dd className="mb-3"></dd>
                        <dt>Password</dt>
                        <dd>
                            <input type="password" className="form-control" placeholder="Enter Password" />
                        </dd>
                        <dd className="mb-3"></dd>
                        <dd>
                            <button className="btn btn-success w-100">
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
    )
}