import React from 'react';
import './Profile.scss';

function Profile() {
  return (
    <div className="userInfoCardBox">
      <div className="userPicture">
        <img src="./image/user.jpg" className="image" alt="userImage" />
        <p>user name</p>
      </div>

      <div className="underInfo">
        <div className="repoInfo">
          <div>
            <p>레포</p>
          </div>
          <div>
            <p>팔로워</p>
          </div>
          <div>
            <p>팔로잉</p>
          </div>
        </div>
        <div className="userInfoText">
          <div>information</div>
          <div>information</div>
          <div>information</div>
          <div>information</div>
          <div>information</div>
          <div>information</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
