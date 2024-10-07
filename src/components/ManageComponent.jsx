import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ManageComponent() {
    const reactVideos = [
        { url: 'https://www.youtube.com/embed/MHn66JJH5zs?si=aCeZU6Ogj71xj0tF', title: 'React Video 1' },
        { url: 'https://www.youtube.com/embed/R1B1PaD0sWU?si=tWsXOnq6GRXunutH', title: 'React Video 2' },
        { url: 'https://www.youtube.com/embed/jufPO-r6bt0?si=jb1rgtKYVEmfDna-', title: 'React Video 3' },
        { url: 'https://www.youtube.com/embed/mNdLo_UfwBE?si=Dvp3B8rzrxEul-Ff', title: 'React Video 4' },
        { url: 'https://www.youtube.com/embed/d5ooYpXioqE?si=9K222IoGBVCyhhYL', title: 'React Video 5' },
        { url: 'https://www.youtube.com/embed/Ncl6AIC844c?si=dvJad8mh2LrY2uNS', title: 'React Video 6' },
    ];

    const [cookies] = useCookies();
    const navigate = useNavigate();
    const [showModal, setModal] = useState(false);

    useEffect(() => {
        if (!cookies.UserId) {
            setModal(true)
        }
    }, [cookies.UserId])

    const handleLogin = () => {
        navigate("/login")
    }

    const handleCancel = () => {
        navigate("/")
    }

    return (
        <div>
            <div className="p-5">
                <div className="mb-4">
                    <h3>Manage Videos</h3>
                    <button className="btn btn-primary">Add New Video <span className="bi bi-camera-video"></span></button>
                </div>
                <table className="table border mx-auto text-center shadow shadow-sm">
                    <thead>
                        <tr>
                            <th><h4>Title</h4></th>
                            <th><h4>Preview</h4></th>
                            <th><h4>Action</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reactVideos.map(video =>
                            <tr key={video.title}>
                                <td>{video.title}</td>
                                <td>
                                    <iframe src={video.url} width={100} height={100} ></iframe>
                                </td>
                                <td className="w-50 ">
                                    <ul className="list-unstyled d-flex justify-content-center align-items-center gap-2">
                                        <li>
                                            <Link className="btn btn-success">Details <span className="bi bi-eye-fill"></span></Link>
                                        </li>
                                        <li>
                                            <Link className="btn btn-warning">Edit <span className="bi bi-pen"></span> </Link>
                                        </li>
                                        <li>
                                            <Link className="btn btn-danger">Remove <span className="bi bi-trash-fill"></span></Link>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="modal show d-block position-fixed" style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050, overflow: 'hidden', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <div className="modal-dialog" style={{ margin: 'auto', top: '30%' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center">Login Required <i class="bi bi-box-arrow-in-right" style={{ marginTop: '3px' }}></i></h5>
                                <button type="button" className="btn-close" onClick={handleCancel} />
                            </div>
                            <div className="modal-body text-center">
                                <p className='my-auto'>Please login first to watch the videos.</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}