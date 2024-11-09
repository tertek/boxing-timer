import { secondsToMinutes, secondsWithZero } from '../util';

const Clock = ({ isPrep, isPause, time, rounds }) => {
  return (
    <>
      <div className="state"></div>
      <div className="rounds">
        <span>ROUND {rounds}</span>
      </div>
      <div className="clock">
        {isPrep ? secondsWithZero(time) : secondsToMinutes(time)}
      </div>
    </>
  );
};

export default Clock;
