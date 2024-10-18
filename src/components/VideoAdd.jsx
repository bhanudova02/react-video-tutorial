import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function VideoAdd() {
    var navigate = useNavigate();
    const [addVideo, setAddVideo] = useState({
        id: 0,
        title: '',
        url: '',
        views: 0,
        likes: 0,
        subscribed: false // update the key here
    });

    const [getVideo, setVideo] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/videos'
        }).then(res => {
            setVideo(res.data);
            console.log(res.data)
        });
    }, []);

    const [idError, setIdError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [urlError, setUrlError] = useState('');
    const [viewsError, setViewsError] = useState('');
    const [likesError, setLikesError] = useState('');



    const handelSubmitVideoClick = () => {
        let isValid = true;
    
        // Reset errors before validation
        setIdError("");
        setTitleError("");
        setUrlError("");
        setViewsError("");
        setLikesError("");
    
        // Check if the ID is already taken
        if (getVideo.some(video => video.id === addVideo.id)) {
            setIdError("Please fill the id (or) Id is already taken ");
            
            isValid = false;
        }
    
        // Check if the title is already taken
        if (getVideo.some(video => video.title === addVideo.title)) {
            setTitleError("fill the title  (or) Title is already taken");
            isValid = false;
        }
    
        // Check if the URL is already taken
        if (getVideo.some(video => video.url === addVideo.url)) {
            setUrlError("fill the url (or) URL is already taken");
            isValid = false;
        }
    
        // Check for missing or invalid views
        if (addVideo.views === 0) {
            setViewsError("Fill the views (or) Please enter views count");
            isValid = false;
        }
    
        // Check for missing or invalid likes
        if (addVideo.likes === 0) {
            setLikesError("Fill the likes (or) Please enter likes count");
            isValid = false;
        }
    
        // Only proceed with the axios request if there are no errors
        if (isValid) {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/add_video',
                data: addVideo
            })
                .then(() => {
                    alert("Video added successfully");
                    navigate("/manage");
                })
                .catch(error => {
                    console.error("Error adding video:", error);
                });
        }
    };
    

    return (
        <div className="py-5 d-flex justify-content-center align-items-center">
            <div className="w-50">
                <h2>Add New Video</h2>
                <dl>
                    <dt>Video Id</dt>
                    <dd>
                        <input className="form-control" type="number" onChange={(e) => setAddVideo({
                            ...addVideo, id: parseInt(e.target.value)
                        })} />
                    </dd>
                    <dd className="text-warning fw-bold mb-3" style={{fontSize:'12px'}}>{idError}</dd>
                    <dt>Title</dt>
                    <dd>
                        <input className="form-control" type="text" onChange={(e) => setAddVideo({
                            ...addVideo, title: e.target.value
                        })} />
                    </dd>
                    <dd className="text-warning fw-bold mb-3" style={{fontSize:'12px'}}>{titleError}</dd>

                    <dt>URL</dt>
                    <dd>
                        <input className="form-control" type="text" onChange={(e) => setAddVideo({
                            ...addVideo, url: e.target.value
                        })} />
                    </dd>
                    <dd className="text-warning fw-bold mb-3" style={{fontSize:'12px'}}>{urlError}</dd>

                    <dt>Views</dt>
                    <dd>
                        <input className="form-control" type="number" onChange={(e) => setAddVideo({
                            ...addVideo, views: parseInt(e.target.value)
                        })} />
                    </dd>
                    <dd className="text-warning fw-bold mb-3" style={{fontSize:'12px'}}>{viewsError}</dd>

                    <dt>Likes</dt>
                    <dd>
                        <input className="form-control" type="number" onChange={(e) => setAddVideo({
                            ...addVideo, likes: parseInt(e.target.value)
                        })} />
                    </dd>
                    <dd className="text-warning fw-bold mb-3" style={{fontSize:'12px'}}>{likesError}</dd>
                    
                    <dt>Subscribe</dt>
                    <dd className="form-switch">
                        <input
                            className="form-check-input" type="checkbox"
                            onChange={(e) => setAddVideo({
                                ...addVideo, subscribed: e.target.checked
                            })}
                        />

                    </dd>
                </dl>
                <button onClick={handelSubmitVideoClick} className="btn btn-primary w-100">Add Video</button>
            </div>
        </div>
    )
}
