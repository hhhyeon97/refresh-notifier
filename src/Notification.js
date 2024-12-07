import React, { useState, useEffect } from 'react';

const Notification = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [seconds, setSeconds] = useState(0); // 경과 시간 (초)
  const [timerId, setTimerId] = useState(null); // 타이머 ID
  const [selectedVoice, setSelectedVoice] = useState(null); // 사용자가 선택한 음성
  const [voices, setVoices] = useState([]); // 음성 목록

  // 음성 목록을 불러와서 상태에 저장
  useEffect(() => {
    const getVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    };

    // 음성 목록 로드 시 처리
    window.speechSynthesis.onvoiceschanged = getVoices;

    // 초기 음성 목록을 가져오는 시점
    getVoices();
  }, []);

  const startTimer = () => {
    setIsStarted(true);
    setSeconds(0); // 타이머 시작 시초기화
    const id = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000); // 1초마다 경과 시간 업데이트
    setTimerId(id);
  };

  // 1시간 후에 음성 알림 (테스트로 5초)
  useEffect(() => {
    if (seconds === 5) {
      // 5초가 경과하면 알림 시작
      const messageText = '1시간이 지났습니다! 스트레칭 하셔요';
      const speech = new SpeechSynthesisUtterance(messageText);
      speech.lang = 'ko-KR'; // 한국어 설정
      speech.rate = 1.0; // 음성 속도

      // 사용자가 선택한 음성으로 설정
      if (selectedVoice) {
        speech.voice = selectedVoice;
      }

      window.speechSynthesis.speak(speech);
      clearInterval(timerId); // 타이머 멈추기
    }
  }, [seconds, selectedVoice, timerId]); // 경과 시간 변경 시마다 실행

  // 타이머를 리셋하려면
  const resetTimer = () => {
    clearInterval(timerId); // 기존 타이머 정지
    setIsStarted(false);
    setSeconds(0); // 시간 초기화
  };

  return (
    <div>
      <button onClick={startTimer}>시작하기 (1시간 후 음성 알림)</button>
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
          {/* // todo : 일시정지 추가 or 작업 시간 누적해서 보여줄 수 있는 */}
          <p>타이머: {seconds}초</p> {/* 경과 시간 표시 */}
          {seconds < 5 ? <p>⏰ 작업중...</p> : <p>🤸‍♂️ 스트레칭 하자</p>}
        </div>
      )}
    </div>
  );
};

export default Notification;
