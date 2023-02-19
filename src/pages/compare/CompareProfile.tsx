/* eslint-disable react/destructuring-assignment */
import { userInfo } from 'os';
import { Link, useParams } from 'react-router-dom';
import Rank from '../../pages/rank/Rank';
import '../../components/profile/Profile';

// eslint-disable-next-line @typescript-eslint/no-redeclare
type UserOne = {
  firstUser: {
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
};

interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  user: UserOne[];
}
function ProfileOne(props: Props) {
  const copyList = [...props.user];
  const params = useParams();
  const userName = params.userName;

  return (
    <>
      {copyList.map(({ firstUser }) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div
            className="userInfoCardBox"
            key={firstUser.rankerDetail.rankerId}
          >
            <Link to={`/userDetail/${userName}`}>
              <div className="userPicture">
                <img
                  src={firstUser.rankerDetail.profileImage}
                  alt="userImage"
                  className="userimages"
                />
                <div className="userName">
                  {firstUser.rankerDetail.rankerName
                    ? firstUser.rankerDetail.rankerName
                    : 'none'}
                  <img
                    src={`../image/${firstUser.rankerDetail.tier}.png`}
                    alt="userImage"
                    className="tierImage"
                  />
                </div>
              </div>
            </Link>
            <div className="underInfo">
              <div className="repoInfo">
                <div className="first">
                  {firstUser.rankerDetail.personalRepoNumber && (
                    <p className="number">
                      {firstUser.rankerDetail.personalRepoNumber}
                    </p>
                  )}
                  <p>Repos</p>
                </div>
                <div>
                  <p className="number">
                    {firstUser.rankerDetail.followerNumber}
                  </p>
                  <p>Followers</p>
                </div>
                <div>
                  <p className="number">
                    {firstUser.rankerDetail.followingNumber}
                  </p>
                  <p>Followings</p>
                </div>
              </div>
              <div className="userInfoText">
                <div>{firstUser.rankerDetail.mainLang}</div>
                <div>
                  {firstUser.rankerDetail.company
                    ? firstUser.rankerDetail.company
                    : 'none'}
                </div>
                <div>
                  {firstUser.rankerDetail.blog
                    ? firstUser.rankerDetail.blog
                    : 'none'}
                </div>
                <div>
                  {firstUser.rankerDetail.region
                    ? firstUser.rankerDetail.region
                    : 'none'}
                </div>
                <div>
                  {firstUser.rankerDetail.tier
                    ? firstUser.rankerDetail.tier
                    : 'none'}
                </div>
                <div>
                  {firstUser.rankerDetail.myStarNumber
                    ? firstUser.rankerDetail.myStarNumber
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

export default ProfileOne;
