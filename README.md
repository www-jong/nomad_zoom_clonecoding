# Noom

Zoom Clone using Nodejs, WebRTC and Websockets.

npm run dev  --> 실행문

Nodemon -> 프로젝트 변경사항 존재 시, 서버를 재시작
           여기선 대신에 babel-node 실행(nodemon.js의 exec)
babel -> 작성한 코드를 일반 NodeJS코드로 컴파일해줌(src/server.js)

server.js -> express import, express 어플리케이션 구성, view engine을 
             Pug로 설정, views 디렉토리 설정
