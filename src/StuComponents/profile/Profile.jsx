import React from 'react';
import Details from './Details';

const Profile = (props) => {
    console.log(props.location.state.doc);
    return (
        <div>
            {/* student details */}
            < div id="Details" >
                <h2 className="subHeading">Your Details: </h2>
            </ div>
            <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
            <Details details={props.location.state.doc} />
        </div>
    );
}

export default Profile;
