import React from 'react';
import Moment from 'react-moment';

type MomentWrapperProps = {
  createdAt: string;
};

export default function MomentWrapper({ createdAt }: MomentWrapperProps) {
  const isOlderThanAWeek =
    Date.now() - new Date(createdAt).getTime() > 7 * 24 * 60 * 60 * 1000;

  if (isOlderThanAWeek) {
    return (
      <Moment format="YYYY년 MM월 DD일" className="time">
        {createdAt}
      </Moment>
    );
  }

  return (
    <Moment fromNow className="time">
      {createdAt}
    </Moment>
  );
}
