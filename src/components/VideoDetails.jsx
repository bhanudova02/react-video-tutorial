import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
export function VideoDetails() {
    const param = useParams();
    const [detailsData, setDetailsData] = useState([{}])
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:5000/videos/${param.id}`
        }).then(res => {
            setDetailsData(res.data)
            console.log(res.data)
        })
    }, [])
    return (
        <div className="py-5 d-flex justify-content-center">
            {detailsData.map((data, index) =>
                <div key={index} className="card w-50 shadow p-2">
                    <iframe className="card-img-top" src={data.url} style={{ height: '24rem' }} ></iframe>
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-2">
                                <button className="btn fw-bold text-primary border">Views {data.views}</button>
                                <button className="btn fw-bold text-black border"><span className="bi bi-heart-fill text-danger"></span> {data.likes}</button>
                            </div>
                            <div>
                                <h4 className="fw-bold shadow py-2 px-4 rounded-5">{data.title}</h4>
                            </div>
                        </div>
                        <Link to="/manage" className="btn btn-outline-primary"><span className="bi bi-arrow-left"></span> Back</Link>
                    </div>
                </div>
            )}
        </div>
    )
}