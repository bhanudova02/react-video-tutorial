import React from 'react';

export function VideoComponent() {
    const reactVideos = [
        { url: 'https://www.youtube.com/embed/MHn66JJH5zs?si=aCeZU6Ogj71xj0tF', title: 'React Video 1' },
        { url: 'https://www.youtube.com/embed/R1B1PaD0sWU?si=tWsXOnq6GRXunutH', title: 'React Video 2' },
        { url: 'https://www.youtube.com/embed/jufPO-r6bt0?si=jb1rgtKYVEmfDna-', title: 'React Video 3' },
        { url: 'https://www.youtube.com/embed/mNdLo_UfwBE?si=Dvp3B8rzrxEul-Ff', title: 'React Video 4' },
        { url: 'https://www.youtube.com/embed/d5ooYpXioqE?si=9K222IoGBVCyhhYL', title: 'React Video 5' },
        { url: 'https://www.youtube.com/embed/Ncl6AIC844c?si=dvJad8mh2LrY2uNS', title: 'React Video 6' },
    ];

    return (
        <div className="p-5 bg-body-secondary">
            <h2 className="text-center fw-bold text-success mb-4">React.js Course Tutorial Videos</h2>
            <div className="row">
                {reactVideos.map(video =>
                    <div key={video.title} className='col-4 d-flex justify-content-center align-items-center mt-3' style={{height:'230px'}}>
                        <iframe className='bg-white p-4 rounded-2 w-100 h-100' key={video.title} src={video.url}>

                        </iframe>
                    </div>
                )}
            </div>
        </div>
    );
}
