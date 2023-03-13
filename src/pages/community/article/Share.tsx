import React, { useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HiOutlineShare, HiOutlinePaperClip } from 'react-icons/hi';
import { AiOutlineAlert } from 'react-icons/ai';
import { ShareProps } from '../../../../@types/Article';
import './Share.scss';

function Share(props: ShareProps) {
  const { postTitle, createdAt, userName } = props;

  const [shareBtnOpen, setShareBtnOpen] = useState<boolean>(false);
  const currentUrl = window.location.href;

  const shareKakao = () => {
    const KAKA0_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
    console.log('KEY', KAKA0_KEY);
    console.log('type', typeof KAKA0_KEY);

    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKA0_KEY);
      }
      window.Kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: postTitle,
          description: `${userName}, ${createdAt.slice(0, 10)}`,
          imageUrl:
            'https://velog.velcdn.com/images/kby0908/post/040b52cb-f5b9-479a-bf37-b60a7540a45e/image.png',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    }
  };

  return (
    <section className="shareSirenIcons">
      <div className={shareBtnOpen ? 'shareToggle' : 'shareToggle hidden'}>
        <CopyToClipboard
          text={currentUrl}
          onCopy={() => alert('클립보드에 복사되었습니다!')}
        >
          <HiOutlinePaperClip className="urlIcon" />
        </CopyToClipboard>
        <div onClick={shareKakao} id="kakaotalk-sharing-btn">
          <img
            className="kakaoShareBtn"
            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
            alt="카카오톡 공유 보내기 버튼"
          />
        </div>
        <EmailShareButton url={currentUrl}>
          <EmailIcon
            size={48}
            round={true}
            borderRadius={24}
            className="emailIcon"
          />
        </EmailShareButton>
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={48} round={true} borderRadius={24} />
        </FacebookShareButton>
      </div>
      <HiOutlineShare
        className="share"
        onClick={() => setShareBtnOpen(prev => !prev)}
      />
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScpWOKF8SGFCZn8X8JQeDY0es-iuySbvZRBkf_-N9J_To6Eww/viewform?usp=sf_link"
        target="_blank"
        rel="noreferrer noopener"
      >
        <AiOutlineAlert className="siren" />
      </a>
    </section>
  );
}

export default Share;
