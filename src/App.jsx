import { useEffect, useState } from 'react';
import { useNowPlaying } from 'react-nowplaying';
import NoSleep from '@zakj/no-sleep';
import useLongPress from './useLongPress';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import Timer from './timer';
import { useInterval } from './util';
import Clock from './components/clock';
import './App.css';

import boxingbell2xSfx from './assets/audio/boxing_bell_2x.mp3';
//import boxingbell3xSfx from './assets/audio/boxing_bell_3x.mp3';
import countdownSfx from './assets/audio/countdown.mp3';

function App() {
  const [timer, setTimer] = useState(new Timer(180, 60, 3));
  const [time, setTime] = useState(timer.trainingTime);
  const [rounds, setRounds] = useState(1);
  const [stopped, setStopped] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const [isPrep, setIsPrep] = useState(false);
  const [isUnmute, setIsUnmute] = useState(true);

  //  play sounds also on iOS
  const { play } = useNowPlaying();
  const playBoxingBell = () => {
    play(boxingbell2xSfx, 'audio/mp3');
  };
  const playCountDownSound = () => {
    play(countdownSfx, 'audio/mp3');
  };

  // keep display on also on iOS
  useEffect(() => {
    let isEnableNoSleep = false;
    const noSleep = new NoSleep();
    document.addEventListener(
      `click`,
      function enableNoSleep() {
        document.removeEventListener(`click`, enableNoSleep, false);
        noSleep.enable();
        isEnableNoSleep = true;
      },
      false
    );
    return () => {
      if (isEnableNoSleep) {
        noSleep.disable();
      }
    };
  }, []);

  const tick = () => {
    timer.tick();

    if (timer.isTurn && isUnmute) {
      playBoxingBell();
    }

    if (timer.time <= timer.prepTime) {
      playCountDownSound();
    }

    setIsPrep(timer.isPrep);
    setIsIdle(false);
    setTime(timer.time);
    setIsPause(timer.isPause);
    setRounds(timer.rounds);
  };

  // the timer's interval
  useInterval(tick, stopped ? null : 1000);

  // reset clock
  const _reset = (trainingTime) => {
    setIsPrep(false);
    setIsIdle(true);
    setTime(trainingTime);
    setIsPause(false);
    setRounds(1);
    setStopped(true);
  };

  const resetTimer = () => {
    // set the old timer as a new one
    setTimer(new Timer(timer.trainingTime, timer.pauseTime));

    // reset
    _reset(timer.trainingTime);
  };

  const startTimer = () => {
    // tick one time at start, to prevent sucking a second
    if (stopped) tick();

    // set stopped false to start interval
    setStopped(!stopped);
  };

  const onLongPress = () => {
    resetTimer();
  };

  const onClick = () => {
    startTimer();
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 750,
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  // backgroundcolor for background and status bar
  const backgroundColor = isPrep
    ? '#f39c12'
    : isIdle
    ? '#7f8c8d'
    : isPause
    ? '#1abc9c'
    : '#c0392b';

  document.body.style.backgroundColor = backgroundColor;

  return (
    <>
      <div className="timer-info">
        <span>Ready: {timer.prepTime - 1}</span>
        <span>Train: {timer.trainingTime}</span>
        <span>Rest: {timer.pauseTime}</span>
      </div>
      <Clock isPause={isPause} isPrep={isPrep} rounds={rounds} time={time} />
      <div className="card">
        <button className="button" {...longPressEvent}>
          {stopped ? (
            <FontAwesomeIcon icon={faPlay} />
          ) : (
            <FontAwesomeIcon icon={faPause} />
          )}
        </button>
      </div>
    </>
  );
}

export default App;
