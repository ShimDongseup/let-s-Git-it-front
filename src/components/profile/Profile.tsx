import { Link } from 'react-router-dom';
import './Profile.scss';

function Profile() {
  return (
    <div className="userInfoCardBox">
      <div className="userPicture">
        <img src="./image/user.jpg" alt="userImage" />
        <div className="userName">
          <Link to="/userDetail"> user name</Link>
          <img src="./image/user.jpg" alt="userImage" />
        </div>
      </div>

      <div className="underInfo">
        <div className="repoInfo">
          <div>
            <p>216</p>
            <p>레포</p>
          </div>
          <div>
            <p>216</p>
            <p>팔로워</p>
          </div>
          <div>
            <p>216</p>
            <p>팔로잉</p>
          </div>
        </div>
        <div className="userInfoText">
          <div>information</div>
          <div>information</div>
          <div>blog</div>
          <div>github</div>
          <div>mail</div>
          <div>star</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
