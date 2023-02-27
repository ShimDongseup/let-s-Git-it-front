/* eslint-disable react/destructuring-assignment */
import { Link, useParams } from 'react-router-dom';
import { FaBlogger, FaBuilding, FaCode } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import { RiNumbersFill } from 'react-icons/ri';
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
    totalScore: string;
  };
};

interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  user: User[];
}
function Profile(props: Props) {
  const copyList = [...props.user];

  return (
    <>
      {copyList.map(e => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div className="userInfoCardBox" key={e.rankerDetail.rankerId}>
            <Link to={`/userDetail/${e.rankerDetail.rankerName}`}>
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
                  <p className="number">{e.rankerDetail.personalRepoNumber}</p>
                  <p className="text">Repos</p>
                </div>
                <div>
                  <p className="number">{e.rankerDetail.followerNumber}</p>
                  <p className="text">Followers</p>
                </div>
                <div>
                  <p className="number">{e.rankerDetail.followingNumber}</p>
                  <p className="text">Followings</p>
                </div>
              </div>

              {window.screen.width > 480 ? (
                <div className="userInfoText">
                  <div>
                    <FaCode className="profileIcons" />
                    {e.rankerDetail.mainLang}
                  </div>
                  {e.rankerDetail.company ? (
                    <div>
                      <FaBuilding className="profileIcons" />
                      {e.rankerDetail.company}
                    </div>
                  ) : null}
                  {e.rankerDetail.blog ? (
                    <a
                      href={e.rankerDetail.blog}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <div>
                        <FaBlogger className="profileIcons" />
                        {e.rankerDetail.blog}
                      </div>
                    </a>
                  ) : null}
                  {e.rankerDetail.region ? (
                    <div>
                      <MdPlace className="profileIcons" />
                      {e.rankerDetail.region}
                    </div>
                  ) : null}
                  {e.rankerDetail.email ? (
                    <div> {e.rankerDetail.email}</div>
                  ) : null}
                  {e.rankerDetail.totalScore ? (
                    <div>
                      <RiNumbersFill className="profileIcons" />
                      {e.rankerDetail.totalScore}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="userInfoText" />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Profile;
