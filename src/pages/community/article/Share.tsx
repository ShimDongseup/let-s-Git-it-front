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
import './Share.scss';

function Share() {
  const [shareBtnOpen, setShareBtnOpen] = useState<boolean>(false);
  const currentUrl = window.location.href;

  return (
    <section className="shareSirenIcons">
      <div className={shareBtnOpen ? 'shareToggle' : 'shareToggle hidden'}>
        <CopyToClipboard
          text={currentUrl}
          onCopy={() => alert('클립보드에 복사되었습니다!')}
        >
          <HiOutlinePaperClip className="urlIcon" />
        </CopyToClipboard>
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
