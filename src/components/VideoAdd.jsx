import axios from "axios";
import { useState } from "react";
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

    const handelSubmitVideoClick = () => {
        console.log(addVideo); // log the video object to check subscribed value before sending
        axios({
            method: 'post',
            url: `http://127.0.0.1:5000/add_video`,
            data: addVideo
        })
            .then(() => {
                alert("Video Added Successfully");
                navigate("/manage");
            })
            .catch(error => {
                console.error("Error adding video:", error);
            });
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
                    <dt>Title</dt>
                    <dd>
                        <input className="form-control" type="text" onChange={(e) => setAddVideo({
                            ...addVideo, title: e.target.value
                        })} />
                    </dd>
                    <dt>URL</dt>
                    <dd>
                        <input className="form-control" type="text" onChange={(e) => setAddVideo({
                            ...addVideo, url: e.target.value
                        })} />
                    </dd>
                    <dt>Views</dt>
                    <dd>
                        <input className="form-control" type="number" onChange={(e) => setAddVideo({
                            ...addVideo, views: parseInt(e.target.value)
                        })} />
                    </dd>
                    <dt>Likes</dt>
                    <dd>
                        <input className="form-control" type="number" onChange={(e) => setAddVideo({
                            ...addVideo, likes: parseInt(e.target.value)
                        })} />
                    </dd>
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
