import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa'; // React Icons

const Notification = () => {
  const [timeLeft, setTimeLeft] = useState(1800); // 기본 시간: 30분 (초 단위)
  const [isRunning, setIsRunning] = useState(false); // 타이머 실행 여부
  const [intervalId, setIntervalId] = useState(null); // setInterval ID 저장
  const [isCompleted, setIsCompleted] = useState(false); // 타이머 완료 상태
  const [googleKoreanVoice, setGoogleKoreanVoice] = useState(null); // Google 한국의 음성

  // Google 한국의 목소리를 검색하여 상태 저장
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const koreanVoice = voices.find(
        (voice) => voice.name === 'Google 한국의',
      );
      setGoogleKoreanVoice(koreanVoice || null);
    };

    // 음성 로드 시점에 따라 이벤트 핸들러 연결
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  // 타이머 실행
  const startTimer = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0)); // 남은 시간을 1초씩 줄임
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
      setIsCompleted(false);
    }
  };

  // 타이머 일시정지
  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  // 타이머 리셋
  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTimeLeft(1800); // 시간 초기화
    setIsCompleted(false);
  };

  // 시간 포맷 변환 (XX분 XX초)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}분 ${String(
      remainingSeconds,
    ).padStart(2, '0')}초`;
  };

  // 타이머 완료 시 처리
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
      setIsCompleted(true);

      // 음성 알림
      const messageText = '스트레칭 하셔요 ~';
      const speech = new SpeechSynthesisUtterance(messageText);
      speech.lang = 'ko-KR'; // 한국어 설정
      speech.rate = 1.0; // 음성 속도

      // Google 한국의 목소리가 있으면 설정
      if (googleKoreanVoice) {
        speech.voice = googleKoreanVoice;
      }

      window.speechSynthesis.speak(speech); // 음성 재생
    }
  }, [timeLeft, isRunning, intervalId, googleKoreanVoice]);

  // 컴포넌트 언마운트 시 Interval 제거
  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div
      className="wrap"
      style={{
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      {/* <h1>⏰</h1> */}
      <svg
        className="clock_icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 40 40"
        id="Time-Lapse--Streamline-Flex-Remix"
        height="60"
        width="60"
      >
        <desc>Time Lapse Streamline Icon: https://streamlinehq.com</desc>
        <g id="time-lapse--time-lapse-mode-photo-picture-image-setting">
          <path
            id="Union"
            fill="#000000"
            fill-rule="evenodd"
            d="M20 0C13.84274285714286 0 8.780228571428571 1.737257142857143 5.258742857142857 5.258742857142857S0 13.84274285714286 0 20s1.737257142857143 11.219714285714286 5.258742857142857 14.741142857142856C8.780228571428571 38.26285714285714 13.84274285714286 40 20 40c7.827285714285714 0 13.852285714285715 -2.8194285714285714 17.181142857142856 -8.401428571428571 0.5051428571428572 -0.8471428571428571 0.22799999999999998 -1.9431428571428573 -0.6191428571428572 -2.4482857142857144 -0.8471428571428571 -0.5051428571428572 -1.9431428571428573 -0.22799999999999998 -2.4482857142857144 0.6191428571428572C31.602285714285717 33.98057142857143 26.94857142857143 36.42857142857143 20 36.42857142857143c-5.499885714285714 0 -9.544514285714286 -1.5414285714285714 -12.215885714285713 -4.212571428571429C5.112742857142857 29.54457142857143 3.5714285714285716 25.499885714285718 3.5714285714285716 20s1.5413142857142859 -9.544514285714286 4.212685714285715 -12.215885714285713C10.455485714285714 5.112742857142857 14.500114285714288 3.5714285714285716 20 3.5714285714285716c1.5512 0 2.9888285714285714 0.12317142857142858 4.312314285714286 0.35982857142857144 0.9708285714285714 0.17357142857142857 1.8985428571428573 -0.47271428571428575 2.072142857142857 -1.4435314285714287 0.17357142857142857 -0.9708257142857143 -0.47271428571428575 -1.8985571428571428 -1.4435428571428572 -2.0721457142857145C23.3886 0.1380182857142857 21.739085714285714 0 20 0Zm11.721714285714285 2.8929714285714287c-0.8428571428571429 -0.51236 -1.9414285714285715 -0.24456000000000003 -2.4537142857142857 0.5981428571428572 -0.5122857142857142 0.8426857142857143 -0.24457142857142855 1.9411714285714285 0.5982857142857143 2.4535142857142858 2.0045714285714284 1.2187428571428571 3.566 2.9001428571428574 4.664285714285715 5.038828571428572 0.4505714285714286 0.8772857142857142 1.5271428571428571 1.2232285714285716 2.4042857142857144 0.7726857142857143 0.8774285714285714 -0.45054285714285713 1.2234285714285715 -1.5269714285714286 0.7728571428571429 -2.404257142857143 -1.3942857142857144 -2.7149714285714284 -3.4088571428571433 -4.892028571428572 -5.986 -6.458914285714285Zm8.083714285714287 13.664428571428571c-0.11514285714285716 -0.9794571428571429 -1.0025714285714287 -1.6801142857142857 -1.982 -1.5649428571428574 -0.9794285714285714 0.11514285714285716 -1.68 1.0025428571428572 -1.5648571428571427 1.982 0.1122857142857143 0.9554 0.16999999999999998 1.964 0.16999999999999998 3.0255428571428573 0 1.5056 -0.11599999999999999 2.9042571428571424 -0.33914285714285713 4.1954 -0.168 0.9718 0.48342857142857143 1.8958 1.455142857142857 2.0638285714285716 0.972 0.168 1.896 -0.4836 2.064 -1.4554C39.87 23.291600000000003 40 21.68802857142857 40 20c0 -1.1905428571428571 -0.06457142857142857 -2.338857142857143 -0.19457142857142856 -3.4425999999999997Zm-17.30474285714286 -2.3163142857142858c0 -1.3807142857142858 -1.1192857142857142 -2.5 -2.5 -2.5s-2.5 1.1192857142857142 -2.5 2.5v6.487371428571429c0 0.5972571428571429 0.21382857142857145 1.1747714285714286 0.6027714285714285 1.6280285714285716l5.520428571428572 6.433228571428572c0.8991428571428571 1.0477142857142858 2.4774571428571432 1.1682857142857144 3.525285714285714 0.2691428571428572 1.0478 -0.8990571428571429 1.1683428571428571 -2.4773714285714283 0.2692 -3.5252L22.500685714285716 19.802857142857142V14.241085714285713Z"
            clip-rule="evenodd"
            stroke-width="1"
          ></path>
        </g>
      </svg>
      {/* 남은 시간 표시 */}
      <div
        className="timer"
        style={{
          fontSize: '3rem',
          margin: '20px 0',
          fontWeight: 'bold',
          color: isRunning ? '#4caf50' : '#f44336',
          letterSpacing: '10px',
        }}
      >
        {formatTime(timeLeft)}
      </div>

      {/* 컨트롤 버튼 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '10px',
        }}
      >
        <button
          onClick={startTimer}
          style={buttonStyle}
          title="시작"
          disabled={isRunning}
        >
          <FaPlay size={20} />
        </button>
        <button
          onClick={pauseTimer}
          style={buttonStyle}
          title="일시정지"
          disabled={!isRunning}
        >
          <FaPause size={20} />
        </button>
        <button onClick={resetTimer} style={buttonStyle} title="리셋">
          <FaRedo size={20} />
        </button>
      </div>
    </div>
  );
};

// 버튼 스타일 공통 정의
const buttonStyle = {
  padding: '10px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#eeeeee',
  cursor: 'pointer',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s ease',
};

export default Notification;
