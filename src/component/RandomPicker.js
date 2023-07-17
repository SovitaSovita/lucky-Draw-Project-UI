import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function RandomPicker({ items }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const [currentChoice, setCurrentChoice] = useState('');

  let interval = null;
  const intervalDuration = 25;
  const duration = 5000;

  const isRunningRef = useRef(false);

  const start = () => {
    clearInterval(interval);
    interval = setInterval(setChoice, intervalDuration);
    setIsRunning(true);
    isRunningRef.current = true;
    setTimeout(() => {
      if (isRunningRef.current) {
        stop();
      }
    }, duration);
  };


  const stop = () => {
    clearInterval(interval);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(interval);
    setIsRunning(false);
    setCurrentChoice('');
  };

  const pickChoice = () => {
    const choice = items[Math.floor(Math.random() * items?.length)];
    return choice;
  };

  const setChoice = () => {
    setCurrentChoice(pickChoice());
  };

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="RandomPicker">
      <RandomPickerChoice choice={currentChoice} />
      <RandomPickerControls
        isRunning={isRunning}
        hasChoice={currentChoice.trim()?.length > 0}
        start={start}
        stop={() =>stop()}
        reset={reset}
      />
    </div>
  );
}

RandomPicker.propTypes = {
  items: PropTypes.array,
  duration: PropTypes.number
};

function RandomPickerChoice({ choice }) {
  const content = choice.trim()?.length > 0 ? choice : '?';

  return (
    <div className="RandomPicker__choice">
      <span className="RandomPicker__choiceItem">{content}</span>
    </div>
  );
}

RandomPickerChoice.propTypes = {
  choice: PropTypes.string
};

function RandomPickerControls({ isRunning, hasChoice, start, stop, reset }) {
  return (
    <div className="RandomPicker__controls">
      <button
        className={`RandomPicker__button ${isRunning && 'RandomPicker__button--stop'}`}
        onClick={isRunning ? stop : start}
      >
        {isRunning ? 'stop' : 'start'}
      </button>
      <button
        disabled={isRunning || !hasChoice}
        className="RandomPicker__button RandomPicker__button--reset"
        onClick={reset}
      >
        reset
      </button>
    </div>
  );
}

RandomPickerControls.propTypes = {
  isRunning: PropTypes.bool,
  hasChoice: PropTypes.bool,
  start: PropTypes.func,
  stop: PropTypes.func,
  reset: PropTypes.func
};

export default RandomPicker;
