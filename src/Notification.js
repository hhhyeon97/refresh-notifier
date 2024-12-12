import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa'; // React Icons 추가

const Notification = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 기본 시간: 30분 (초 단위)
  const [isRunning, setIsRunning] = useState(false); // 타이머 실행 여부
  const [intervalId, setIntervalId] = useState(null); // setInterval ID 저장

  // 타이머 실행
  const startTimer = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0)); // 남은 시간을 1초씩 줄임
      }, 1000);
      setIntervalId(id); // Interval ID 저장
      setIsRunning(true); // 타이머 상태 업데이트
    }
  };

  // 타이머 일시정지
  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalId); // Interval 중지
      setIsRunning(false); // 타이머 상태 업데이트
    }
  };

  // 타이머 리셋
  const resetTimer = () => {
    clearInterval(intervalId); // Interval 중지
    setIsRunning(false); // 타이머 상태 초기화
    setTimeLeft(1800); // 시간 초기화 (30분)
  };

  // 시간 포맷 변환 (XX분 XX초)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}분 ${String(
      remainingSeconds,
    ).padStart(2, '0')}초`;
  };

  // 컴포넌트가 언마운트되거나 타이머가 리셋되면 Interval 제거
  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      <h1>⏰ 리프레시 타이머</h1>

      {/* 남은 시간 표시 */}
      <div
        style={{
          fontSize: '2rem',
          margin: '20px 0',
          fontWeight: 'bold',
          color: isRunning ? '#4caf50' : '#f44336',
        }}
      >
        {formatTime(timeLeft)}
      </div>

      {/* 컨트롤 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={startTimer}
          style={buttonStyle}
          title="시작"
          disabled={isRunning} // 실행 중일 땐 비활성화
        >
          <FaPlay size={20} />
        </button>
        <button
          onClick={pauseTimer}
          style={buttonStyle}
          title="일시정지"
          disabled={!isRunning} // 멈춰 있을 땐 비활성화
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
