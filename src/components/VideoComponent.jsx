import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export function VideoComponent() {
    const [reactVideos, setReactVideos] = useState([{}])

    const [cookies] = useCookies();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/videos'
        }).then(res => {
            setReactVideos(res.data)
        })
        if (!cookies.UserId) {
            setShowModal(true);
        }
    }, [cookies.UserId]);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="p-5 bg-body-secondary">
            <h2 className="text-center fw-bold text-success mb-4">React.js Course Tutorial Videos</h2>
            <div className="row">
                <div className="row">
                    {reactVideos.map((video, index) => (
                        <div key={index} className='col-4 d-flex justify-content-center align-items-center mt-3' style={{ height: '230px' }}>
                            <iframe className='bg-white p-4 rounded-2 w-100 h-100' src={video.url} title={video.title} />
                        </div>
                    ))}
                </div>

            </div>

            {/* Modal for Login Alert */}
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
    );
}
