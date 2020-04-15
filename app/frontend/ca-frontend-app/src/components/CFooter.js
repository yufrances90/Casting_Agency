import React from 'react';

const CFooter = () => {

    const date = new Date();

    return (
        <div className="footer">
            &copy; Casting Agency  {date.getFullYear()}
        </div>
    );
}

export default CFooter;