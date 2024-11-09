import { secondsToMinutes, secondsWithZero } from '../util';

const Clock = ({ isPrep, isPause, time, rounds }) => {
  return (
    <>
      <div className="clock-header">
        <div className="state"></div>
        <div className="rounds">
          <span>ROUND {rounds}</span>
        </div>
      </div>
      <div className="clock">
        <span>{isPrep ? secondsWithZero(time) : secondsToMinutes(time)}</span>
      </div>
    </>
  );
};

export default Clock;
