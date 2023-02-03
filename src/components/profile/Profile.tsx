/* eslint-disable react/destructuring-assignment */
import { userInfo } from 'os';
import { Link } from 'react-router-dom';
import Rank from '../../pages/rank/Rank';
import './Profile.scss';

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Rank = {
  id: string;
  userName: string;
  repo: string;
  follow: string;
  following: string;
  company: string;
  location: string;
  stars: string;
  blog: string;
  mail: string;
};
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  user: Rank[];
}
function Profile(props: Props) {
  const copyList = [...props.user];
  console.log(copyList[0]);
  return (
    <>
      {console.log(copyList[0])}
      {copyList.map(({ id, userName, repo, follow, following }) => {
        return (
          <div className="userInfoCardBox" key={id}>
            <div className="userPicture">
              <img src="./image/user.jpg" alt="userImage" />
              <div className="userName">
                <Link to="/userDetail">{userName} </Link>
                <img src="./image/user.jpg" alt="userImage" />
              </div>
            </div>
            <div className="underInfo">
              <div className="repoInfo">
                <div className="first">
                  <p className="number">{repo}</p>
                  <p>Repos</p>
                </div>
                <div>
                  <p className="number">{follow}</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p className="number">{following}</p>
                  <p>Followings</p>
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
      })}
    </>
  );
}

export default Profile;
