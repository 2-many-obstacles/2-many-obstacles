import React from 'react';

const Intro: React.FC = () => {
    return (
        <div
            style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            padding: '40px',
            }}
        >
            <div
            style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px',
            }}
            >
            Google Maps has a <span style={{ color: 'rgb(66, 133, 244)' }}>wheelchair</span> mode <br />
            but one size <span style={{ color: 'rgb(66, 133, 244)' }}>doesn't</span> fit all!
            </div>
            <img
            src="/googlemaps_example.jpg"
            alt="Google Maps Example"
            style={{
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: '300px', // Adjusted width
            height: 'auto',
            margin: '30px',
            }}

            />
            <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                <button
                style={{
                    padding: '15px 30px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'rgb(252, 252, 252)',
                    backgroundColor: 'rgb(66, 133, 244)',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={() => {localStorage.clear(); window.location.href = '/';}}
                >
                Let's Get Started
                </button>
            </div>
        </div> 
    );
};

export default Intro;