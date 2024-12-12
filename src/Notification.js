import React, { useState, useEffect } from 'react';

const Notification = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태
  const [seconds, setSeconds] = useState(0); // 경과 시간 (초)
  const [timerId, setTimerId] = useState(null); // 타이머 ID
  const [selectedVoice, setSelectedVoice] = useState(null); // 사용자가 선택한 음성
  const [voices, setVoices] = useState([]); // 음성 목록
  const [selectedTime, setSelectedTime] = useState(3600); // 기본 시간 설정 (1시간)
  const [isAlertTriggered, setIsAlertTriggered] = useState(false); // 알림 상태

  // 음성 목록을 불러와서 상태에 저장
  useEffect(() => {
    const getVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    };

    window.speechSynthesis.onvoiceschanged = getVoices;
    getVoices(); // 초기 음성 목록 가져오기
  }, []);

  const startTimer = () => {
    setIsStarted(true);
    setIsPaused(false); // 시작 시 일시정지 해제
    setIsAlertTriggered(false); // 알림 상태 초기화
    if (!timerId) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000); // 1초마다 증가
      setTimerId(id);
    }
  };

  const pauseTimer = () => {
    setIsPaused(true);
    clearInterval(timerId); // 타이머 멈추기
    setTimerId(null);
  };

  const resetTimer = () => {
    clearInterval(timerId); // 기존 타이머 정지
    setIsStarted(false);
    setIsPaused(false);
    setSeconds(0); // 시간 초기화
    setTimerId(null);
    setIsAlertTriggered(false); // 알림 상태 초기화
  };

  // 알림 처리
  useEffect(() => {
    if (seconds === selectedTime && !isAlertTriggered) {
      setIsAlertTriggered(true); // 알림 상태를 true로 설정
      const messageText = '스트레칭 하셔요 ~';
      const speech = new SpeechSynthesisUtterance(messageText);
      speech.lang = 'ko-KR';
      speech.rate = 1.0;

      if (selectedVoice) {
        speech.voice = selectedVoice;
      }

      window.speechSynthesis.speak(speech);
      clearInterval(timerId); // 알림 후 타이머 정지
      setTimerId(null);
    }
  }, [seconds, selectedVoice, selectedTime, isAlertTriggered]);

  return (
    <div>
      <div>
        {/* 시간 설정 */}
        <label htmlFor="timeSelect">시간 설정: </label>
        <select
          id="timeSelect"
          value={selectedTime}
          onChange={(e) => setSelectedTime(Number(e.target.value))}
          disabled={isStarted} // 타이머 시작 중에는 변경 불가
        >
          <option value={1800}>30분</option>
          <option value={3600}>1시간</option>
          <option value={7200}>2시간</option>
        </select>
      </div>

      {/* 타이머 조작 버튼 */}
      <button onClick={startTimer} disabled={isStarted && !isPaused}>
        시작하기
      </button>
      <button onClick={pauseTimer} disabled={!isStarted || isPaused}>
        일시정지
      </button>
      <button onClick={resetTimer}>타이머 리셋</button>

      {/* 음성 선택 */}
      <div>
        <label htmlFor="voiceSelect">음성 선택: </label>
        <select
          id="voiceSelect"
          onChange={(e) => {
            const selected = voices.find(
              (voice) => voice.name === e.target.value,
            );
            setSelectedVoice(selected);
          }}
        >
          <option value="">알림 보이스 선택</option>
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>

      {isStarted && (
        <div>
          <p>경과 시간 : {seconds}초</p>
        </div>
      )}

      {/* 알림 문구 표시 */}
      {isAlertTriggered && <p>🤸‍♂️ 스트레칭 하자!</p>}
    </div>
  );
};

export default Notification;
