import { Link } from "react-router-dom";

export function ManageComponent() {
    const reactVideos = [
        { url: 'https://www.youtube.com/embed/MHn66JJH5zs?si=aCeZU6Ogj71xj0tF', title: 'React Video 1' },
        { url: 'https://www.youtube.com/embed/R1B1PaD0sWU?si=tWsXOnq6GRXunutH', title: 'React Video 2' },
        { url: 'https://www.youtube.com/embed/jufPO-r6bt0?si=jb1rgtKYVEmfDna-', title: 'React Video 3' },
        { url: 'https://www.youtube.com/embed/mNdLo_UfwBE?si=Dvp3B8rzrxEul-Ff', title: 'React Video 4' },
        { url: 'https://www.youtube.com/embed/d5ooYpXioqE?si=9K222IoGBVCyhhYL', title: 'React Video 5' },
        { url: 'https://www.youtube.com/embed/Ncl6AIC844c?si=dvJad8mh2LrY2uNS', title: 'React Video 6' },
    ];
    return (
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
                            <td className="w-50">
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
    )
}