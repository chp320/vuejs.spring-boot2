# vuejs.spring-boot2
#### 개발 환경
- spring-boot 3.3.3
- node.js 16.20.2
- npm 8.19.4
  - when you change the version of node.js, use nvm.
    ```
    $ nvm install {version}
    $ nvm use {version}     // to use default node.js
    ```
#### Vue 프로젝트 생성
- front-end 이름의 프로젝트 생성
- end-to-end 테스트 위해서 사용할 브라우저 선택하라고 나오는데.. chromedriver 관련한 오류가 계속 발생하면.. chrome 브라우저 선택 제외하고 진행! (크게 의미 x)
```
$ vue create front-end
```
