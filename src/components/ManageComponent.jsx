import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ManageComponent() {
    const [reactVideos, setReactVideos] = useState([{}])
    const [cookies] = useCookies();
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video
    const [showModal, setModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [showDelModal, setShowDelModal] = useState(false)


    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/videos'
        }).then(res => {
            setReactVideos(res.data)
        })
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

    const handleEditClick = (video) => {
        setSelectedVideo(video); // Store the selected video
        setShowEditModal(true); // Show the modal
    }

    const [videoIdToDelete, setVideoIdToDelete] = useState(null); // State to store the id of the video to delete

    const handelDeleteClick = (id) => {
        setVideoIdToDelete(id); // Store the id when delete is clicked
        setShowDelModal(true);
    }

    const handleConfirmDelete = () => {
        if(videoIdToDelete){
            axios({
                method:'delete',
                url:`http://127.0.0.1:5000/delete_video/${videoIdToDelete}`
            })
            setShowDelModal(false)
            window.location.reload()
        }
    };
    
    

    return (
        <div>
            <div className="p-5">
                <div className="mb-4">
                    <h3>Manage Videos</h3>
                    <Link to="/add_video" className="btn btn-primary">Add New Video <span className="bi bi-camera-video"></span></Link>
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
                        {reactVideos.map((video, index) =>
                            <tr key={index}>
                                <td>{video.title}</td>
                                <td>
                                    <iframe src={video.url} width={100} height={100} ></iframe>
                                </td>
                                <td className="w-50 ">
                                    <ul className="list-unstyled d-flex justify-content-center align-items-center gap-2">
                                        <li >
                                            <Link to={`/video/details/${video.id}`} className="btn btn-success">Details <span className="bi bi-eye-fill"></span></Link>
                                        </li>
                                        <li onClick={() => { handleEditClick(video) }}> {/* Set selected video on click */}
                                            <Link className="btn btn-warning">Edit <span className="bi bi-pen"></span> </Link>
                                        </li>
                                        <li onClick={() => { handelDeleteClick(video.id) }} >
                                            <Link className="btn btn-danger">Remove <span className="bi bi-trash-fill"></span></Link>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showDelModal && (
                <div className="modal show d-block position-fixed" style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050, overflow: 'hidden', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <div className="modal-dialog" style={{ margin: 'auto', top: '30%' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center">Are Sure Want To Delete?</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDelModal(false)} />
                            </div>
                            <div className="modal-body text-center d-flex justify-content-around">
                                <button type="button" className="btn btn-primary" onClick={handleConfirmDelete}>
                                    Yes
                                </button>
                                &nbsp;
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDelModal(false)}>No</button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {
                showEditModal && selectedVideo && (
                    <div className="modal show d-block position-fixed" style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050, overflow: 'hidden', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                        <div className="modal-dialog" style={{ margin: 'auto', top: '10%' }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title d-flex align-items-center fw-bold">Edit Course Video</h5>
                                    <button type="button" className="btn-close" onClick={() => { setShowEditModal(false) }} />
                                </div>
                                <div className="modal-body p-4">
                                    <dl>
                                        <dt className="mb-1" style={{ fontSize: '12px' }}>Video Id</dt>
                                        <dd>
                                            <input type="number" placeholder="Enter Id" value={selectedVideo.id} className="form-control" />
                                        </dd>
                                        <dt className="mb-1 mt-4" style={{ fontSize: '12px' }}>Video Title</dt>
                                        <dd>
                                            <input type="text" placeholder="Enter Title" value={selectedVideo.title} className="form-control fw-semibold" />
                                        </dd>
                                        <dt className="mb-1 mt-4" style={{ fontSize: '12px' }}>URL</dt>
                                        <dd>
                                            <input type="text" placeholder="Paste URL" value={selectedVideo.url} className="form-control" />
                                        </dd>
                                    </dl>
                                    <button className="btn btn-primary w-100">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

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