import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export function VideoComponent() {
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
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!cookies.userId) {
            setShowModal(true);
        }
    }, [cookies.userId]);

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
                {reactVideos.map(video => (
                    <div key={video.title} className='col-4 d-flex justify-content-center align-items-center mt-3' style={{ height: '230px' }}>
                        <iframe className='bg-white p-4 rounded-2 w-100 h-100' src={video.url} />
                    </div>
                ))}
            </div>

            {/* Modal for Login Alert */}
            {showModal && (
                <div className="modal show" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050, overflow: 'hidden', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog" style={{ margin: 'auto', top: '20%' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Login Required</h5>
                                <button type="button" className="close" onClick={handleCancel}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <p>Please login first to watch the videos.</p>
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
