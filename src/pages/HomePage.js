import React from 'react';
import picture from '../assets/homepage.jpg'

const HomePage = () => {
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-1'>.</div>
                <div className='col-md-10'>
                    <img
                        alt={`by Freepik`}
                        src={picture}
                        className="img-fluid"
                    // Image by < a href = "https://www.freepik.com/free-vector/flat-laboratory-room-illustrated_13176170.htm#query=laboratory&position=32&from_view=keyword&track=sph" > Freepik</ >
                    />
                </div>
                <div className='col-md-1'></div>
            </div>
        </div>
    );
};

export default HomePage;
