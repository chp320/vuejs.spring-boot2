# vuejs.spring-boot2
- 본 프로젝트는 spring-boot 로 백엔드를 구성하고, vue.js 를 활용해서 화면(프론트엔드)을 구성한다.
- 개발을 시작하기에 앞서서 사용하는 프로그램 버전 간 호환성 문제로 시간을 많이 잡아 먹어서 기본적인 환경을 남겨 놓는다.
- 참고로 node.js 버전을 여러 번 바꾼다고 삭제, 재설치를 진행하였는데 node.js 의 여러 버전을 사용하고자 한다면 nvm 을 사용하자! (아래 개발환경 참고)

### 개발 환경
- spring-boot 3.3.3
- node.js v18.20.4
- npm 10.7.0
  - when you change the version of node.js, use nvm.
    ```
    $ nvm install {version}
    $ nvm use {version}     // to use default node.js
    ```

### 오류 조치
1. appcast 관련 에러 메시지
```
Error: Unexpected method 'appcast' called on Cask adoptopenjdk11.
```
- homebrew 로 패키지를 설치/관리하고 있는데, 어느 순간부터 brew 명령어 수행하면 위와 같은 오류를 발생했다.
- 조치: brew 에서 adoptopenjdk11 삭제 ( brew uninstall adoptopenjdk11 )

2. chromedriver 관련 설치 오류
```
...
Current existing ChromeDriver binary is unavailable, proceeding with download and extraction.
...
url: 'https://cdn.npmmirror.com/binaries/chromedriver/chrome-for-testing/128.0.6613.86.json',
```
- 아마 삽질의 대부분 시간을 이것 때문에 버렸을 것이다..;;
- 결론부터 말하면. 별도로 chromedriver 를 다운로드 받고, bash_profile 에 export 등록시켜놓자.
  - 자동화 테스트 시 chrome 브라우저 관련하여 필요한 항목인데. 위의 저 링크가 유효하지 않거나 불안정했던 것 같다.
- 다운로드 경로
  - https://googlechromelabs.github.io/chrome-for-testing/#stable
    - binary 가 ``chromedriver`` 인 항목 중 자신의 OS 에 맞는 링크로 다운로드 받으면 된다.
    - 나의 경우, wget URL 호출하여 다운로드 받았고, .bash_profile PATH 에 chromedriver 경로를 지정하였다.

3. node-sass 관련 오류
```
...
npm ERR! path <path>/node_modules/node-sass
...
npm ERR! gyp ERR! stack Error: Command failed: /Library/Frameworks/Python.framework/Versions/3.7/bin/python3 -c import sys; print "%s.%s.%s" % sys.version_info[:3];
...
npm ERR! gyp info using node-gyp@3.8.0
,,.
npm ERR! gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.
```
- 이 오류는 결국 "파이썬"을 제대로 수행하지 못해 발생한 오류이다.
- 파이썬 3.10 버전이 설치되어 있었지만 node-gyp 가 제대로 인식하지 못하고 있어서 환경변수 설정을 하였다.
- 조치
  - ~/.bash_profile 에 export PYTHON=$(which python3.10) 추가 후 재인식 (source ~/.bash_profile)
  - 프로젝트 빌드 결과인 node_modules 디렉토리 삭제
    ```
    $ rm -rf node-modules
    $ rm package-lock.json
    ```
  - node-gyp 가 파이썬(3.10) 사용 가능하도록 글로벌 설정 후 리빌드 수행
    ```
    $ npm config set python $(which python3.10)
    $ npm rebuild node-sass
    ```
  - 위와 같이 진행했음에도 오류가 지속되는 경우가 있다. 
    node-sass 는 node-gyp 에 의존적이고, node-gyp 또한 파이썬과 플랫폼 특성 등 환경 영향을 많이 받는다.
    따라서, node-sass 대신에 순수 JavaScript 로 구현한 sass 로 대체해보자
    ```
    // 1) remove node-sass
    $ npm uninstall node-sass
    // 2) install sass
    $ npm install sass --save-dev
    // 3) update sass-loader
    $ npm install sass-loader@latest --save-dev
    // 4) update configuration file. (ex. package.json)
    "devDependencies" : {
        "node-sass": "^4.12.0",    -> "sass": "^1.58.0",
        "sass-loader": "^8.0.0"    -> "sass-loader": "^12.0.0"
    }
    // 5) re install
    $ npm install 
    ```
  - 

#### Vue 프로젝트 생성
- front-end 이름의 프로젝트 생성
- end-to-end 테스트 위해서 사용할 브라우저 선택하라고 나오는데.. chromedriver 관련한 오류가 계속 발생하면.. chrome 브라우저 선택 제외하고 진행! (크게 의미 x)
```
$ vue create front-end
```

#### 호환성
- node.js@16.20.2
- npm@8.19.4
- eslint@7.0.0
- eslint-plugin-vue@7.0.0
- eslint-webpack-plugin@2.5.4
- @vue/cli-plugin-eslint@3.0.1
- @vue/eslint-config-standard@4.0.0
- bable-eslint@10.0.1
- sass-loader@12.6.0
- chokidar@3.5.3
- fsevents@2.3.2

##### 참고
- https://github.com/wikibook/spring-vuejs
