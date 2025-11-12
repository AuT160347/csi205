import React, { useEffect, useRef, useState } from 'react';
import './Animation.css'

const animation = () => {
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
    const runBtnRef = useRef(null);

    useEffect(() => {
        let rafId = null;
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
                    ballRef.current.style.left = xRef.current + 'px';
                    ballRef.current.style.top = yRef.current + 'px';
                }

                if (runBtnRef.current) {
                    runBtnRef.current.innerHTML = '<span class="bi bi-pause"></span>&nbsp;PAUSE';
                    runBtnRef.current.classList.remove('btn-success');
                    runBtnRef.current.classList.add('btn-warning');
                }
            } else {
                if (runBtnRef.current) {
                    runBtnRef.current.innerHTML = '<span class="bi bi-play"></span>&nbsp;RUN';
                    runBtnRef.current.classList.remove('btn-warning');
                    runBtnRef.current.classList.add('btn-success');
                }
            }
            rafId = requestAnimationFrame(step);
        };
        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [running, maxX, maxY]);

    useEffect(() => {
        if (fieldRef.current) {
            fieldRef.current.style.width = fieldWidth + 'px';
            fieldRef.current.style.height = fieldHeight + 'px';
        }
        if (ballRef.current) {
            ballRef.current.style.width = ballDiameter + 'px';
            ballRef.current.style.height = ballDiameter + 'px';
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
            ballRef.current.style.backgroundImage = `url(./img/${cur}.png)`;
        }
    };

    return (
        <>
            <div className="anim-container">
                <div id="field" ref={fieldRef} className="anim-field">
                    <div id="ball" ref={ballRef} className="anim-ball" />
                </div>

                <div className="anim-control d-flex justify-content-between">
                    <button
                        id="run"
                        ref={runBtnRef}
                        className={`btn ${running ? 'btn-warning' : 'btn-success'}`}
                        onClick={toggleRun}
                        dangerouslySetInnerHTML={{ __html: running ? '<span class="bi bi-pause"></span>&nbsp;PAUSE' : '<span class="bi bi-play"></span>&nbsp;RUN' }}
                    />

                    <div className="controls-row">
                        <button id="none" className={`btn ${selected === 'none' ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={handleNone}>
                            None
                        </button>
                        {['Basketball', 'Football', 'Volleyball', 'Human', 'Cartoon'].map((label) => (
                            <button
                                key={label}
                                className={`btn btn-gold-font ${selected === label.toLowerCase() ? 'btn-dark' : 'btn-outline-dark'}`}
                                onClick={() => handleSelect(label)}
                            >
                                {label}
                            </button>
                        ))}

                    </div>
                </div>
            </div>

            <br />

        </>
    );
};

export default animation;
