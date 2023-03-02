/* eslint-disable react/destructuring-assignment */
import { Link } from 'react-router-dom';
import { FaBlogger, FaBuilding, FaCode } from 'react-icons/fa';
import { MdPlace, MdMail } from 'react-icons/md';
import { AiFillStar, AiFillGithub } from 'react-icons/ai';
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

  if (!copyList) return null;
  return (
    <>
      {copyList.map(({ rankerDetail }) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div className="userInfoCardBox" key={rankerDetail.rankerId}>
            <Link to={`/userDetail/${rankerDetail.rankerName}`}>
              <div className="userPicture">
                <img
                  src={rankerDetail.profileImage}
                  alt="userImage"
                  className="userimages"
                />
                <div className="userName">
                  {rankerDetail.rankerName ? rankerDetail.rankerName : 'none'}
                  <img
                    src={`../image/${rankerDetail.tier}.png`}
                    alt="userImage"
                    className="tierImage"
                  />
                </div>
              </div>
            </Link>
            <div className="underInfo">
              <div className="repoInfo">
                <div className="first">
                  <p className="number">{rankerDetail.personalRepoNumber}</p>
                  <p className="text">Repos</p>
                </div>
                <div>
                  <p className="number">{rankerDetail.followerNumber}</p>
                  <p className="text">Followers</p>
                </div>
                <div>
                  <p className="number">{rankerDetail.followingNumber}</p>
                  <p className="text">Followings</p>
                </div>
              </div>

              {window.screen.width > 480 ? (
                <div className="userInfoText">
                  <div>
                    <FaCode className="profileIcons" />
                    {rankerDetail.mainLang}
                  </div>
                  {rankerDetail.company ? (
                    <div>
                      <FaBuilding className="profileIcons" />
                      {rankerDetail.company}
                    </div>
                  ) : null}
                  {rankerDetail.blog ? (
                    <a
                      href={rankerDetail.blog}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <div>
                        <FaBlogger className="profileIcons" />
                        {rankerDetail.blog}
                      </div>
                    </a>
                  ) : null}
                  {rankerDetail.region ? (
                    <div>
                      <MdPlace className="profileIcons" />
                      {rankerDetail.region}
                    </div>
                  ) : null}
                  {rankerDetail.email ? (
                    <a href={`mailto:${rankerDetail.email}`}>
                      <div>
                        <MdMail className="profileIcons" /> {rankerDetail.email}
                      </div>
                    </a>
                  ) : null}
                  {rankerDetail.myStarNumber ? (
                    <div>
                      <AiFillStar className="profileIcons" />
                      {rankerDetail.myStarNumber}
                    </div>
                  ) : null}
                  <a
                    href={`https://github.com/${rankerDetail.rankerName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <AiFillGithub className="profileIcons" />
                      github
                    </div>
                  </a>
                </div>
              ) : (
                <div className="userInfoText">
                  <a
                    href={`https://github.com/${rankerDetail.rankerName}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <div>
                      <AiFillGithub className="profileIcons" />
                      github
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Profile;
