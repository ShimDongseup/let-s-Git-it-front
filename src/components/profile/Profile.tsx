/* eslint-disable react/destructuring-assignment */
import { userInfo } from 'os';
import { Link, useParams } from 'react-router-dom';
import Rank from '../../pages/rank/Rank';
import './Profile.scss';

// eslint-disable-next-line @typescript-eslint/no-redeclare
type User = {
  rankerDetail: {
    rankerId: string;
    rankerName: string;
    personalRepoNumber: number;
    company: string;
    region: string;
    blog: string;
    email: string;
    profileImage: string;
    followingNumber: number;
    followerNumber: number;
    myStarNumber: number;
    mainLang: string;
    curiosityScore: string;
    passionScore: string;
    fameScore: string;
    abilityScore: string;
    tier: string;
  };
};
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  user: User[];
}
function Profile(props: Props) {
  const copyList = [...props.user];
  const params = useParams();
  const userName = params.userName;
  return (
    <>
      {copyList.map(({ rankerDetail }) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div className="userInfoCardBox" key={rankerDetail.rankerId}>
            <Link to={`/userDetail/${userName}`}>
              <div className="userPicture">
                <img src={rankerDetail.profileImage} alt="userImage" />
                <div className="userName">
                  {rankerDetail.rankerName ? rankerDetail.rankerName : 'none'}
                  <img src="./image/user.jpg" alt="userImage" />
                </div>
              </div>
            </Link>
            <div className="underInfo">
              <div className="repoInfo">
                <div className="first">
                  <p className="number">{rankerDetail.personalRepoNumber}</p>
                  <p>Repos</p>
                </div>
                <div>
                  <p className="number">{rankerDetail.followerNumber}</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p className="number">{rankerDetail.followingNumber}</p>
                  <p>Followings</p>
                </div>
              </div>
              <div className="userInfoText">
                <div>{rankerDetail.mainLang}</div>
                <div>
                  {rankerDetail.company ? rankerDetail.company : 'none'}
                </div>
                <div>{rankerDetail.blog}</div>
                <div>{rankerDetail.region}</div>
                <div>{rankerDetail.tier}</div>
                <div>{rankerDetail.myStarNumber}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Profile;
