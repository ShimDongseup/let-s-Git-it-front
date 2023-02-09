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
  blog: string;
  mail: string;
  language: string;
  image: string;
  followers: number;
  stars: number;
  contribution: number;
  total: number;
};
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  user: Rank[];
}
function Profile(props: Props) {
  const copyList = [...props.user];
  return (
    <>
      {copyList.map(
        ({
          id,
          language,
          userName,
          total,
          image,
          contribution,
          followers,
          stars,
        }) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div className="userInfoCardBox" key={id}>
              <Link to="/userDetail">
                <div className="userPicture">
                  <img src="./image/user.jpg" alt="userImage" />
                  <div className="userName">
                    {userName}
                    <img src="./image/user.jpg" alt="userImage" />
                  </div>
                </div>
              </Link>
              <div className="underInfo">
                <div className="repoInfo">
                  <div className="first">
                    <p className="number">{total}</p>
                    <p>Repos</p>
                  </div>
                  <div>
                    <p className="number">{language}</p>
                    <p>Followers</p>
                  </div>
                  <div>
                    <p className="number">{contribution}</p>
                    <p>Followings</p>
                  </div>
                </div>
                <div className="userInfoText">
                  <div>{followers}</div>
                  <div>{stars}</div>
                  <div>blog</div>
                  <div>github</div>
                  <div>mail</div>
                  <div>star</div>
                </div>
              </div>
            </div>
          );
        }
      )}
    </>
  );
}

export default Profile;
