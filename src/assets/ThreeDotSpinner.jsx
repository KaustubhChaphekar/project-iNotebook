// ThreeDotsSpinner.js
import React from 'react';

const ThreeDotsSpinner = () => {
    return (
        <svg
            width="80"
            height="20"
            viewBox="0 0 80 20"
            xmlns="http://www.w3.org/2000/svg"
            className="loader"
        >
            <circle cx="10" cy="10" r="5" fill="#3498db">
                <animate
                    attributeName="cy"
                    values="10;5;10;10"
                    dur="0.6s"
                    repeatCount="indefinite"
                    begin="0s"
                />
            </circle>
            <circle cx="40" cy="10" r="5" fill="#3498db">
                <animate
                    attributeName="cy"
                    values="10;5;10;10"
                    dur="0.6s"
                    repeatCount="indefinite"
                    begin="0.2s"
                />
            </circle>
            <circle cx="70" cy="10" r="5" fill="#3498db">
                <animate
                    attributeName="cy"
                    values="10;5;10;10"
                    dur="0.6s"
                    repeatCount="indefinite"
                    begin="0.4s"
                />
            </circle>
        </svg>
    );
};

export default ThreeDotsSpinner;
