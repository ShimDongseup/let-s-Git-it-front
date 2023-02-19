/* eslint-disable react/destructuring-assignment */
import { userInfo } from 'os';
import { Link, useParams } from 'react-router-dom';
import Rank from '../../pages/rank/Rank';
import '../../components/profile/Profile';

// eslint-disable-next-line @typescript-eslint/no-redeclare
type UserTwo = {
  secondUser: {
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
  user: UserTwo[];
}
function ProfileTwo(props: Props) {
  const copyList = [...props.user];
  const params = useParams();
  const userName = params.userName;

  return (
    <>
      {copyList.map(({ secondUser }) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div
            className="userInfoCardBox"
            key={secondUser.rankerDetail.rankerId}
          >
            <Link to={`/userDetail/${userName}`}>
              <div className="userPicture">
                <img
                  src={secondUser.rankerDetail.profileImage}
                  alt="userImage"
                  className="userimages"
                />
                <div className="userName">
                  {secondUser.rankerDetail.rankerName
                    ? secondUser.rankerDetail.rankerName
                    : 'none'}
                  <img
                    src={`../image/${secondUser.rankerDetail.tier}.png`}
                    alt="userImage"
                    className="tierImage"
                  />
                </div>
              </div>
            </Link>
            <div className="underInfo">
              <div className="repoInfo">
                <div className="first">
                  {secondUser.rankerDetail.personalRepoNumber && (
                    <p className="number">
                      {secondUser.rankerDetail.personalRepoNumber}
                    </p>
                  )}
                  <p>Repos</p>
                </div>
                <div>
                  <p className="number">
                    {secondUser.rankerDetail.followerNumber}
                  </p>
                  <p>Followers</p>
                </div>
                <div>
                  <p className="number">
                    {secondUser.rankerDetail.followingNumber}
                  </p>
                  <p>Followings</p>
                </div>
              </div>
              <div className="userInfoText">
                <div>{secondUser.rankerDetail.mainLang}</div>
                <div>
                  {secondUser.rankerDetail.company
                    ? secondUser.rankerDetail.company
                    : 'none'}
                </div>
                <div>
                  {secondUser.rankerDetail.blog
                    ? secondUser.rankerDetail.blog
                    : 'none'}
                </div>
                <div>
                  {secondUser.rankerDetail.region
                    ? secondUser.rankerDetail.region
                    : 'none'}
                </div>
                <div>
                  {secondUser.rankerDetail.tier
                    ? secondUser.rankerDetail.tier
                    : 'none'}
                </div>
                <div>
                  {secondUser.rankerDetail.myStarNumber
                    ? secondUser.rankerDetail.myStarNumber
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

export default ProfileTwo;
