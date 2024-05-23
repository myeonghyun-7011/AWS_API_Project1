# 베이스 이미지 설정
FROM node:14-alpine

# 작업 디렉토리 생성
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install --only=prod

# 소스코드 복사
COPY . .

# 이미지 파일 복사
COPY src/img/* /app/src/img/
COPY src/js/img/* /app/src/js/img/

# 앱 실행을 위한 사용자 생성
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

# 앱 실행
CMD ["npm", "start"]
