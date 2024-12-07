# Node.js 22 버전을 베이스 이미지로 사용
FROM node:22

# 컨테이너 내의 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 개발 서버 포트 열기
EXPOSE 3000

# 개발 서버 실행
CMD ["npm", "start"]