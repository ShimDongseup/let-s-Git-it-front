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

  if (!copyList) return null;
  return (
    <>
      {copyList.map(e => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div className="userInfoCardBox" key={e.rankerDetail.rankerId}>
            <Link to={`/userDetail/${userName}`}>
              <div className="userPicture">
                <img
                  src={e.rankerDetail.profileImage}
                  alt="userImage"
                  className="userimages"
                />
                <div className="userName">
                  {e.rankerDetail.rankerName
                    ? e.rankerDetail.rankerName
                    : 'none'}
                  <img
                    src={`../image/${e.rankerDetail.tier}.png`}
                    alt="userImage"
                    className="tierImage"
                  />
                </div>
              </div>
            </Link>
            <div className="underInfo">
              <div className="repoInfo">
                <div className="first">
                  {e.rankerDetail.personalRepoNumber && (
                    <p className="number">
                      {e.rankerDetail.personalRepoNumber}
                    </p>
                  )}
                  <p>Repos</p>
                </div>
                <div>
                  <p className="number">{e.rankerDetail.followerNumber}</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p className="number">{e.rankerDetail.followingNumber}</p>
                  <p>Followings</p>
                </div>
              </div>
              <div className="userInfoText">
                <div>{e.rankerDetail.mainLang}</div>
                <div>
                  {e.rankerDetail.company ? e.rankerDetail.company : 'none'}
                </div>
                <div>{e.rankerDetail.blog ? e.rankerDetail.blog : 'none'}</div>
                <div>
                  {e.rankerDetail.region ? e.rankerDetail.region : 'none'}
                </div>
                <div>{e.rankerDetail.tier ? e.rankerDetail.tier : 'none'}</div>
                <div>
                  {e.rankerDetail.myStarNumber
                    ? e.rankerDetail.myStarNumber
                    : 'none'}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Profile;
