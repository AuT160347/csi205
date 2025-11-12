import React, { useEffect, useRef, useState } from 'react';
import './Animation.css';

import wood from '/img/woodBG.jpg';
import cartoon from '/img/cartoon.png';
import basketball from '/img/basketball.png';
import football from '/img/football.png';
import human from '/img/human.png';
import volleyball from '/img/volleyball.png';

const Animation = () => {
  const fieldWidth = 650;
  const fieldHeight = 400;
  const ballDiameter = 100;
  const maxX = fieldWidth - ballDiameter - 2;
  const maxY = fieldHeight - ballDiameter - 2;

  const xRef = useRef(0);
  const yRef = useRef(0);
  const vxRef = useRef(5);
  const vyRef = useRef(5);
  const goRightRef = useRef(true);
  const goDownRef = useRef(true);

  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState('none');

  const ballRef = useRef(null);
  const fieldRef = useRef(null);

  // เก็บภาพทั้งหมดใน object เพื่อเรียกใช้ง่าย
  const images = { basketball, football, volleyball, human, cartoon };

  useEffect(() => {
    let rafId;
    const step = () => {
      if (running) {
        if (goRightRef.current) {
          xRef.current += vxRef.current;
          if (xRef.current >= maxX) goRightRef.current = false;
        } else {
          xRef.current -= vxRef.current;
          if (xRef.current <= 0) goRightRef.current = true;
        }

        if (goDownRef.current) {
          yRef.current += vyRef.current;
          if (yRef.current >= maxY) goDownRef.current = false;
        } else {
          yRef.current -= vyRef.current;
          if (yRef.current <= 0) goDownRef.current = true;
        }

        if (ballRef.current) {
          ballRef.current.style.left = `${xRef.current}px`;
          ballRef.current.style.top = `${yRef.current}px`;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [running, maxX, maxY]);

  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.style.width = `${fieldWidth}px`;
      fieldRef.current.style.height = `${fieldHeight}px`;
    }
    if (ballRef.current) {
      ballRef.current.style.width = `${ballDiameter}px`;
      ballRef.current.style.height = `${ballDiameter}px`;
    }
  }, []);

  const toggleRun = () => setRunning((r) => !r);

  const handleNone = () => {
    setSelected('none');
    if (ballRef.current) {
      ballRef.current.style.backgroundImage = '';
      ballRef.current.style.backgroundColor = 'lightblue';
    }
  };

  const handleSelect = (label) => {
    const cur = label.toLowerCase();
    setSelected(cur);
    if (ballRef.current) {
      ballRef.current.style.backgroundColor = 'transparent';
      ballRef.current.style.backgroundImage = `url(${images[cur]})`;
      ballRef.current.style.backgroundSize = 'cover';
      ballRef.current.style.backgroundPosition = 'center';
    }
  };

  return (
    <div className="anim-container text-center">
      <div id="field" ref={fieldRef} className="anim-field">
        <img src={wood} className="anim-bg" alt="wood background" />
        <div id="ball" ref={ballRef} className="anim-ball"></div>
      </div>

      <div className="anim-control d-flex justify-content-between align-items-center mt-3">
        <button
          id="run"
          className={`btn ${running ? 'btn-warning' : 'btn-success'}`}
          onClick={toggleRun}
        >
          {running ? (
            <>
              <i className="bi bi-pause"></i>&nbsp;PAUSE
            </>
          ) : (
            <>
              <i className="bi bi-play"></i>&nbsp;RUN
            </>
          )}
        </button>

        <div className="controls-row">
          <button
            id="none"
            className={`btn ${selected === 'none' ? 'btn-secondary' : 'btn-outline-secondary'}`}
            onClick={handleNone}
          >
            None
          </button>

          {['Basketball', 'Football', 'Volleyball', 'Human', 'Cartoon'].map((label) => (
            <button
              key={label}
              className={`btn btn-gold-font ${
                selected === label.toLowerCase() ? 'btn-dark' : 'btn-outline-dark'
              }`}
              onClick={() => handleSelect(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animation;
