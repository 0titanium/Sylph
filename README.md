# Sylph

---

<br/>

Sylph means 'S'tart 'y'our 'l'ovely 'p'rojects 'h'ere.

Recruits project team members. Participate in the project.

<br/>

---

<br/>

# `Frontend`

react, antd

# `Backend`

nodejs, express

# `Database`

mongodb atlas(mongoose)

<br/>

---

<br/>

- Frontend

  - \_actions

    - types
    - user_action

  - \_reducers

    - index
    - user_reducer

  - Alarm // modal

  - Footer

  - LandingPage ("/")

    - positions || languages filter dropdown
    - project recruitment cards

  - MyPage ("/mypage")

    - MyInfo
      - UpdateMyInfo("/mypage/update)
      - Withdrawal
    - MyRecruit
    - ProjectInProgress
    - ApplyTo
    - ApplyFor
      - ViewProfile

  - NavBar

    - not login

      - logo

      - LeftMenu

        - positions (dropdown)
        - languages (dropdown)

      - RightMenu
        - sign in
        - sign up

    - login

      - logo

      - LeftMenu

        - positions (dropdown)
        - languages (dropdown)

      - RightMenu
        - my page, sign out (dropdwon)

  - NotFoundpage ("\*")

  - PagesFiltedByPositions ("/positions/:pname)

  - PagesFiltedByLanguages ("/languages/:lname)

  - RecruitDetailPage ("/recruit/:recruitId")

    - Apply / Cancel
    - Edit - UpdateRecruitPage
    - Complete
    - Delete

  - RecruitPage ("/recruit/post")

  - SignInPage ("/signin")

  - SignUpPage ("/signup")

  - UpdateMyInfo("/mypage/update)

  - UpdateRecruitPage ("/recruit/update/:recruitId")

  - hoc

    - auth

  - utils
    - getCookie

<br/>

- Backend

  - "/users"

    - POST "/users/signup" // signup users

    - POST "/users/isOverlappedId" // check duplicated id

    - POST "/users/isOverlappedNick" // check duplicated nickname

    - POST "/users/signin" // signin users

    - GET "/users/auth" // user authentication

    - POST "/users/signout" // signout users

    - GET "/users/userInfo" // user info

    - PATCH "/users/userInfo" // udpate user's profile

    - DELETE "/users/withdrawl" // withdraw users

    - PATCH "/users/applyment" // apply

    - PATCH "/users/cancelApplyment" // cancel apply

    - PATCH "/users/recruit" // save data writting recruit

    - PATCH "/users/completion" // save data project member

    - GET "/users/myProject" // get project in progress

  - "/recruits"

    - POST "/recruits/recruit" // users post recruitement recruit

    - GET "/recruits/latestRecruits" // get latest recruits

    - GET "/recruits/positions/:pname" // get recruits filtered by positions

    - GET "/recruits/languages/:lanme" // get recruits filtered by languages

    - GET "/recruits/recruitDetail:rid" // get a specific recruit

    - PATCH "/recruits/recruit" // update recruit

    - DELETE "/recruits/recruit" // delete recruit

    - PATCH "/recruits/applyment" // apply to recruit

    - PATCH "/recruits/cancelApplyment" // cancel apply

    - GET "/recruits/applyment" // get data applying to recruit

    - GET "/recruits/myRecruit" // get data recruit written by uts/myApply" // get data apply

    - GET "/recruits/myApply" // get recruit user apply

    - PATCH "/recruits/completion" // complete recruit

    - PATCH "/recruits/acceptance" // push user in project member

    - PATCH "/recruits/refusal" // pop user in recruit apply

    - GET "/recruits/applicationInfo" // alarm to user if user accepted or refused

<br/>

- Database

  - user

    - id (String)
    - nickname (String)
    - password (String)
    - position (Array)
    - skills (Array)
    - careers (String)
    - githubaddress (String)
    - image (String?)
    - applyto (Array)
    - recruitWriting (ObjectId)
    - projectInProgress (ObjectId)
    - token (String)
    - tokenExp (Number)

  - recruit
    - writer (ObjectId)
    - title (String)
    - projectDetail (String)
    - recruitPositions (Array)
    - languages (Array)
    - Qualifications (String)
    - meetingLocation (String)
    - personnel (Number)
    - applyfor (Array)
    - member (Array)
    - recruitCompleted (Boolean)

<br />

---

2021-11-10

- aws 문서를 읽어보니 s3에서는 쿠키를 처리하지 않는다고 하는데 이것 때문이 아닌가 싶다.

  - jwt를 json으로 보냄 -> json data -> setCookie -> getCookie?
  - user_id, x_auth가 쿠키에 저장된 것은 확인했지만 오류가 난다.
  - 로컬스토리지를 사용해야할 것 같다.

- git pull origin main error

  - git stash -> git pull origin main

- aws ec2에서 역시 요금이 발생했다. 0.09불이긴 하지만. 근데 이거 프리티어 아닌가
  - 정상 작동이 확인되면 즉시 삭제하고 무료 호스팅으로 바꿔야겠다.
  - github actions를 써보려고 했는데 firebase, heroku에서 재배포와 연동시킬 수 있는지 모르겠다.
  - 중지 후 재시작했더니 ip가 바뀌어서 mongodb와 연결하려면 white list ip를 바꿔줘야한다.
  - 위의 말은 client Config.js도 바꿔줘야한다는 뜻이다.

- cookie를 못쓰면 get method는 못쓸것 같은데 어떻게 해야할까.

---

2021-11-09

- index.html을 폴더 안에 넣지않고 업로드해야 버킷 웹사이트 엔드포인트에 접속할 수 있다.

- cli는 깔았지만 git bash에서 작동하지 않고 명령프롬프트에서 사용해야하는 점이 맘에 안든다.

  - 배포 명령어 $ aws s3 sync ./build s3://"bucketName" --profile="folderName"

- github actions와 연결하여 git push때 마다 바뀔 수 있도록.

- cloudFront 사용?

- aws ec2에 서버.

  - ubuntu 18.04를 많이 쓰는 것 같다. 20.04나 리눅스 같은 다른 것들을 쓰지 않는 이유는 잘 모르겠다.
  - instance 생성
  - 접속방법 - .pem 읽기전용 - git bash - ssh -i "pemKey" name@"ec2Name"
  - sudo apt-get update, sudo apt install nodejs, sudo apt install npm, git clone
  - npm install, npm run
  - bcrypt를 찾을 수 없다는 에러메세지.
  - sudo npm cache clean -f / sudo npm install -g n / sudo n stable / sudo npm install --unsafe-perm=true --allow-root
    - 처리를 해줬더니 됐다. 아마도 nodejs를 삭제하고 안정버전으로 설치하여 bcrypt가 install되도록 한다는 뜻인것 같다.
  - mongodb atlas에 연결하려면 ec2 instance의 ip를 white list에 등록해야한다.
  - mongodb atlas에 연결 확인
  - public ipv4:5000 연결 확인

- aws ec2 to s3 connection

  - change client's config
  - 연결됨을 확인. laptop, mobile 연결확인.
  - sign up 작동 확인.
  - sign in 작동 안됨.
  - 사용할 때마다 get에러가 나는데 작동은 한다. sign in 빼고.
  - 인증에 쿠키를 사용하는데 쿠키가 저장이 안된다.
  - req는 잘받는다.
  - firefox에서 접속해서 로그인해보니 cookie를 잘못 사용하고 있다고 한다.
  - s3 cors 설정은 의미가 있는건지 잘모르겠다.

- ec2 주소가 노출되어도 괜찮은가?
  - gitignore가 적용이 안된다. 뭔가 찝찝하지만 괜찮을 수도 있고 아니면 인스턴스 삭제하자.

---

2021-11-08

- 배포 예상

  - aws s3 - git clone client folder

    - npm build?

  - aws ec2 - git clone server folder
  - connect server to mongodb atlas
  - change config url
  - add ec2 url to .gitignore

- aws IAM

  - MFA 등록
  - 사용자 추가

- AWS CLI 설치

  - AWS CLI - 사용자 등록

- AWS S3 버킷 생성

- client - npm run build

- AWS S3 build folder upload

- 업로드 후 권한을 설정하고 정적 웹 호스팅했으나 엔드포인트로 접속하면 404 not found
  - 문제점 파악.
  - firebase, heroku가 편한 것이었다.

---

2021-11-05

- recruit -> 뒤로가기 -> landing page (v)

- recruit detail -> 삭제 -> 뒤로가기 -> landing page with get error, 400 bad request

  - 수정: recruit detail -> 삭제 -> 뒤로가기 -> not found page (v)

- 존재하지 않는 페이지 만들기.

  - NotFoundPage component -> App.js Route path = "\*" -> url에 맞는 컴포턴트를 순서대로 찾다가 없으면 설정한 컴포넌트를 보여주게 만드는 것으로 이해했다.

- chrome 개발자도구 - network - throttling -> 느린 인터넷 환경으로 테스트해본 결과 Suspense 컴포넌트는 나타나지 않는다.

  - 잘못한 점이 있을 수도 있고 Suspense가 필요하지 않을 수도 있는데 정확히는 모르겠다.

- 생각나는 것은 다 한 것 같고 진짜로 배포.

---

2021-11-04

- recruit 작성 후 뒤로가기하면 글을 작성할 수 있는 문제.

  - recruit에서 reatc-redux - useSelector로 작성한 글이 있다면 또 작성할 수 없게 하긴 했다.
  - 페이지 진입을 못하게 하는게 더 낫지 않을까?
    - 뒤로가기로 모집글 작성 url에 진입하면 랜딩페이지로 이동하도록 하는 것에 성공했으나 에러메세지가 나온다.
    - error : Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    - useSelector가 문제라는 것 같다.
    - useDispatch를 사용하면 문제가 없어진다.
    - 뒤로가기로 진입하면 잽싼데, url 입력으로 진입하면 모집 작성 페이지로 이동했다가 랜딩페이지로 이동하는 속도가 좀 느리다.

- 삭제한 글을 뒤로가기하면 볼 수 있고 다시 버튼을 클릭할 수 있는 문제.
- 가 아니고 failed to fetch로 나온다.

  - history stack 때문이라는 것 같다.
  - 서버에서 recruit가 없을 경우 {success: false}를 보내고 recruitDetail에서 {data.success: false}를 받으면
    일단 랜딩페이지로 이동하게 했다. 왜 이동했는지 알려주는 방법을 찾아야 할 것 같다.

- 존재하지 않는 url을 입력했을 때의 처리(v)
  - not found page로 어떻게 이동시킴.

---

2021-11-03

- sign up 수정(v)

- update my info 수정(v)

  - career 선택했던 경우 디폴트 밸류 유지필요 (v)
  - github address 작성하지 않았던 경우 기본 스트링 필요(v)

- recruit, recruit detail 수정(v)

- recruit 작성 완료 후 뒤로가기에서 글을 작성할 수 있는 문제.
  - 예상방안1. 뒤로가기 방지
  - 예상방안2. recruit에서 작성한 글이 있는지 확인.

---

2021-11-02

- 모집인원 필드 추가(v)

- recruit 모집 select 추가(v)

  - change value string to number, post 필요.(v)

- sign up - careers select로 변경(v)

  - post 필요.(v)

- 아무래도 aws 프리티어로 요금 부과안되게 잘 해봐야겠다. 계속 수정할 부분이 생긴다.
  - Frontend: aws s3
  - Backend: aws ec2 linux 2? ubuntu 18.04? ubuntu 20.04?

---

2021-11-01

- alert to modal (v)

- recruit content(title, meeting location) max length (v)

- current number of members in recruitDetailPage (v)

- 모집인원 필드 추가할 것.

---

2021-10-29

- alert to modal

- modify sign up (v)

---

2021-10-28

- image upload 할까 말까.

  - antd upload component가 있다.
  - 이미지는 따로 저장해야하겠지.
  - 용량 제한이 필요.

- sign in - 아이디 혹은 비밀번호가 다릅니다. modal (v)

- sign up - 중복 modal, 비밀번호 자리수, 확인과 일치 여부 (v)

- alert to modal

  - 무수히 많은 alert의 알림이

- 하면 할수록 할 일이 많아지는 느낌이다.

---

2021-10-27

- applyto - 지원한 프로젝트 - 메세지 버그

  - map() 써서 해결. 데이터를 잘못 이해한 것이 원인이었다.

- 여러 모집에 지원했을 경우, 한 프로젝트에 멤버가 되었다면 다른 프로젝트 멤버가 되는 것을 제한. (v)

  - apply for에서 지원자 데이터에서 projectInProgress 검사 -> 있으면 수락 버튼 클릭 시 수락 불가 메세지 전달. (v)
  - "거절했습니다" 메세지는 볼 일이 없다. 거절 버튼 클릭 시 apply for에서 삭제해버리기 때문. 삼항연산자 때문에 써놓긴 해야할 것 같다.

- 배포

  - 1. (FE: aws s3 && BE: aws ec2)
    - firebase, heroku보단 처음 로딩 속도가 빠를 것으로 예상되는 것, 코드 수정이 쉬운 것이 장점.
    - 까딱하다간 요금 폭탄을 맞을 지도 모르는 것이 단점.
  - 2. (FE: firebase && BE: heroku) || (FE: heroku && BE: firebase)
    - 무료로 할 수 있는 것이 장점.
    - 코드 수정하려면 재배포해야하는 것과 첫 로딩이 느린 것이 단점.

- sign up - id, nickname 중복여부 확인 기능. (v)
  - sign up id, nickname 중복확인 버튼
  - 클릭 - fetch(user_server) - user.find - return value
  - 0 - "사용 가능한 아이디, 닉네임입니다.", 1 - "중복된 아이디, 닉네임입니다."

---

2021-10-26

- 1유저 1프로젝트

  - 작성한 모집글이 있다면 모집글 제한. (v)
  - 여러 모집에 지원했을 경우, 한 프로젝트에 멤버가 되었다면 다른 프로젝트 멤버가 되는 것을 제한. ()
    - apply for에서 지원자 데이터에서 projectInProgress 검사 -> 있으면 수락 버튼 클릭 시 수락 불가 메세지 전달.

- 배포

---

2021-10-25

- 왜 갑자기 로그인이 안될까.
- css 밖에 안건드렸을 텐데.
- onsubmit을 삭제했었다. 확인을 잘하자.

- inline styles 중에서 import css 하면 이상해지는 부분말고는 다 옮겼다.

  - mobile에서 이상한 부분을 찾아서 고쳐보자.
  - @media 처리만 하면 되는 것이 아닐까.
  - 디자인이 진짜 별로다.

- image upload 할까?

- 기능 제한은 해보자.

- 배포는 어떻게 할 것인가?

---

2021-10-22

- change css using css module

  - responsive design is required

- maybe need to make api folder

---

2021-10-21

- 기능

  - 회원 가입 //
  - 회원 탈퇴 //
  - 로그인 //
  - 로그아웃 //
  - 포지션별 모집글 확인 //
  - 언어별 모집글 확인 //
  - 모집글 작성 //
  - 모집글 열람 //
  - 모집글 수정 //
  - 모집글 삭제 //
  - 프로젝트 지원 //
  - 프로젝트 지원 취소 //
  - 유저 정보 열람 //
  - 유저 정보 수정 //
  - 유저 모집글 확인 // 모집글 개수를 하나로 제한하지 않으면 문제가 생길듯.
  - 유저 모집글 바로가기 //
  - 유저 진행 중인 프로젝트 확인 // 진행 중인 프로젝트를 하나로 제한하지 않으면 문제가 생길듯.
  - 유저 진행 중인 프로젝트 모집글 바로가기 //
  - 유저 지원한 프로젝트 모집글 확인 //
  - 유저 지원한 프로젝트 지원 상태 확인(대기, 거절, 수락) //
  - 프로젝트 지원자 확인 //
  - 프로젝트 지원자 프로필 열람 //
  - 프로젝트 지원자 참가 수락 //
  - 프로젝트 지원자 참가 거절 //

- css

  - inline style // 코드가 지저분해보인다. 없어도 깔끔한 것 같지는 않음.
  - styled component // 이 방법은 가장 인기있다고 하는데 좋은 점이 무엇인지는 잘 모르겠다.
  - import css file // 피곤하다.

- 배포
  - firebase & heroku - update가 힘든 것 같다.
  - aws s3 & ec2 - 프리티어에서 요금이 청구된 경험때문에 꺼려짐.

---

2021-10-20

- applyfor 버튼, 수락, 거절 작성.

- 모집글 개수 제한?

- 리팩터링

---

2021-10-19

- projectInProgress

  - 멤버필드에는 들어가는 것이었고, 각 멤버 프로젝트 필드에 들어가지않는다.
  - 쿼리 블록 중 가장 안쪽에 있는 블록에서 리턴을 해줘야한다.

- 이번엔 applyfor, applyto에 fetch error -> cannot read property

- 예외처리.

- recruit.js - "/applicaitonInfo" 다시.

  - 데이터 타입을 잘 숙지할 것.

- applyfor - 수락한 메세지의 버튼 처리.
  - 미처리
  - 수락 - recruit.member에 있음 - recruit.member를 확인해서
    - applyUser in recruit.member ? 수락(버튼 가리기) : 수락 && 거절 버튼
  - 거절 - applyfor에서 삭제됨.

---

2021-10-18

- projectInProgress.js
  - fetchMyProject - 400 error - why? - 없는 필드를 불러서? - 클라이언트 잘못?
  - 수정 전엔 완료버튼 클릭시 멤버 필드에 들어갔는데 error를 고치니까 안들어간다.

---

2021-10-15

- mongoose query 비동기 문제?

  - recruit는 로그에 찍힌다.
  - recruit.applyfor는 undefined.
  - 왜?
  - 배열에 담겨있었기 때문.

- 거절 메세지 기능 작성. v

- projectInProgress.js 작성중
  - 모집 완료 기능 추가사항 - member.map(eachMember=> eachMember.projectInProgress = eachMember.applyto).은 있었음.

---

2021-10-14

- 거절 메세지 기능 작성중.

  - 미지원 - 처리 없음
  - 지원
    - 대기 recruit applyfor, user applyto 둘 다 존재
    - 수락 recruit applyfor, user applyto 둘 다 존재하면서 recruit member에 존재
    - 거절 recruit applyfor 없음, user applyto 있음.

- 모집 완료 후 유저들 기능 제한은 어떻게?

- projectInProgress.js 작성중.

---

2021-10-13

- 수락 기능 작성. v

  - 수락 후 수락/거절 버튼 처리 필요.

- 거절 기능 작성. v

  - 거절 후 recruit applyfor에서 지원자 제거. v
  - 지원자 applyTo - 거절 메세지. 작성중

- 모집 완료 기능 작성. v
  - 모집 완료 - 프로젝트 시작 - 프로젝트 멤버 모집, 모집 완료 기능 제한?

---

2021-10-12

- 수락 기능 v

- 거절 기능 - 어떤 처리? (alarm에서 제거 && 지원자에게 거절 메세지)?

- 모집 완료 기능 - add recruit id in projectInProgress of User

---

2021-10-01

1. 수락 기능 - 버튼 클릭 - push recruit member
2. 거절 기능 - 버튼 클릭 - recruit app
3. 모집 완료 기능 - 버튼 클릭 - add projectInProgress

---

2021-09-29

- 모집글 작성 시 작성자 member에 추가 v

- 0. 지원 취소 기능 - 버튼 클릭 - update user applyto, update recruit applyfor v
  1. 수락 기능 - 버튼 클릭 - push recruit member
  2. 거절 기능 - 버튼 클릭 - recruit app
  3. 모집 완료 기능 - 버튼 클릭 - add projectInProgress

---

2021-09-28

- click complete -> 모집자, 팀원들 projectInProgress 필드에 리쿠르트 아이디 저장. mypage progressinproject에 정보 표시.

---

2021-09-27

- MyPage - MyRecruit 긴 글 "..." 적용 기능. v

-> 작성.

---

2021-09-24

<br />

- 지원자 프로필 보기 기능. ViewProfile.js. v

-> 작성.

- MyPage - MyRecruit 긴 글 "..." 적용 기능.

- 지원 관련.

  - 지원 수락 기능 - 지원 수락 버튼 -> 모집 데이터에 지원자 아이디 추가?
  - 지원 거절 기능 - 지원 거절 버튼 -> 거절 메세지 전달? 재지원 불가?

- 모바일 화면에서의 디자인을 위한 css 작업이 필요. <component style={{}} /> -> component.css로 바꿔야

---

2021-09-23

- pagesFilterd: /positions/:pid, /languages/:lid ?

-> positions, languages 별 모집글 보여주기 완료.

- myPage에서
  -MyRecruit - 인원 수 표시
  -ApplyTo - 지원 프로젝트 바로가기 기능 v
  -ApplyFor - 지원자 프로필 보기 기능 필요.

-> ApplyTo - 지원 프로젝트 바로가기 기능 완료.

- 지원 수락하기 기능 필요.

- recruit card에서 긴 글은 ... 처리하기. v

-> 완료

---

2021-09-20

- 체크박스문제가 아니고 모집글 아이디를 제대로 넘기지 않아서 생긴 문제였다.

-> recruitId: RecruitId -> recruitId: rid로 변경해서 해결.

- MyRecruit.js 수정

- one user, one recruit 문제.
  - 1. 모집글을 작성한 직후 모집글 존재 여부를 확인하는 속도가 느려서? 모집글을 작성할 수 있음.
  - 2. 모집글을 삭제한 직후 모집글 존재 여부를 확인하는 속도가 느려서? 모집글을 작성할 수 없음.

-> 작성, 삭제 리퀘스트 보낸 뒤 랜딩페이지로 이동시키고 window.location.reload()를 실행시키면 정상작동하긴 함.
-> 리로드 하기 때문에 시간 지연이 발생하므로 사용자 경험 측면에서 좋은 방법은 아닌 것 같다.

- filteredPage 작성 필요. v

---

2021-09-17

- 체크박스 문제 v

---

2021-09-16

- 모집 시 포지션을 체크박스로 선택, 필드를 array로 변경.

-> 체크박스는 선택하면 저절로? 배열로 값이 채워진다?

- 유저당 모집을 하나만 할 수 있게 하는 방법?

-> 나중에 v

- 포지션, 언어를 체크박스로 바꾸니 수정할 때 값이 제대로 전달되지 않음. 수정 필요. v

---

2021-09-15

- 모집완료 기능 작성 v

- click positions, tech stacks -> page filtered 작성중 (landigpage base)

-> 모집 모델이 키워드를 포함하고 있어야 할 것 같다.

- 1인 1모집 기능 작성 중.

-> 작동하긴 하지만 딜레이가 있음.

- 글을 삭제했을 때 유저 정보도 업데이트 해야함.

-> 해결

---

2021-09-14

- 이미 지원한 리쿠르트 버튼 disabled

- 남은 일

  - 모집완료 기능
  - nav left menu detail
  - one user, one recruit

- recruit detail loading spinner

---

2021-09-13

- 서버에서 데이터가 도착하지 않은 것, 저장된 데이터가 없는 것을 구분하는 방법.

-> data === undefined ? loading state : data.length !== 0 ? component : string no data로 처리함.

- left menu dropdown.

-> each menu click -> landing page -> display recruits matching menu

---

2021-09-10

- for loop에서 쿼리를 돌리면 안되나?

-> findById -> find { \_id : { $in: } }로 해결.

- apply to 흐름: 유저를 찾음 -> 유저 지원을 찾음 -> 지원한 모집들을 찾음

- apply to, apply for 작성. 디자인은 나중에?

- 남은 것
  - 지원 시 apply button disabled 처리 문제
  - 모집글은 아이디당 한개씩만 쓸 수 있게 처리하는 문제.
  - positions dropdown (o)
  - tech stacks dropdown (o)
  - when someone apply to recruit change alarm bell of right menu ()

<br />

---

2021-09-09

- apply for, apply to에 표시할 데이터를 서버에서 처리하지 못하는 문제. 비동기 문제? 스코프 문제?

-> apply for 흐름: 유저를 찾음/ -> 유저 모집글 찾음/ -> 모집글 지원자 아이디 찾음/ -> 아이디 별로 유저를 찾음/

-> 유저별 닉네임 배열에 담음.(여기서 안됨. 콘솔에는 찍힘.) -> 배열을 클라이언트에 리턴.

- 지원 시 apply button disabled 처리 문제.

- 모집글은 아이디당 한개씩만 쓸 수 있게 처리하는 문제.

---

2021-09-08

- 여러 글이 있어도 하나의 글만 불러오는 문제.

-> 수정 완료.

- 글 수정 페이지에서 원본 내용을 가져오지 못하는 문제.

-> 수정 완료.

- recruitId, useParams의 rid가 같은 값이라고 생각하는데 recrutId는 알 수없는 문제가 있음.

- applyto 다듬기

---

2021-09-07

- 지원 버튼 클릭 -> 지원한 유저 데이터베이스에 지원 정보 저장, 리쿠르트 데이터베이스에 지원자 정보 저장 -> 리쿠르트 작성자에게 알림

-> 대략 완성에 가까움. 지원자를 objectid가 아닌 아이디나 닉네임으로 표시해야함.

---

2021-09-06

- firefox에서는 <br />로 여백이 만들어지지 않음. 검색 결과 좋은 방법도 아니라고 함.

-> 제거 후 margin을 통해 여백 생성.

<br />

- 지원 관련 기능. User, Recruit schema에 추가 필요.

-> 지원 버튼 클릭 -> 지원한 유저 데이터베이스에 지원 정보 저장, 리쿠르트 데이터베이스에 지원자 정보 저장 -> 리쿠르트 작성자에게 알림

<br />

---

2021-09-03

- 회원 탈퇴 기능 작성 v

- 지원 기능 작성 v

---

2021-09-02

- update user info 작업

-> 과정은 잘되지만 db data는 바뀌지않는 문제 발생.

-> 변수명을 잘못 쓴 것이 원인이었다.

- 해야할 일

-> 회원 탈퇴 기능 v, 지원 기능 v, 지원 확인 기능 v, 지원 취소 기능 v, 지원 수락 기능 v, 지원 거절 기능 v, ...etc

<br />

---

2021-09-01

- update recruit page 작업

- method patch 중에 에러 발생. "Unexpected token < in JSON at position 0".

-> mongoose findByIdAndUpdate()를 사용하니까 해결됨.

- roughly finish recruit basic CRUD

---

2021-08-31

- notice icon 삽입하면 li 렌더링 순서가 1 2 3에서 1 3 2로 바뀌는 문제발생.

- my page/my info 작업

<br />

---

2021-08-27

- my page 작업

---

2021-08-26

- fetch에 mode, credential을 추가하니까 로그인 상태 유지 해결.

- navBar right menu 작업.

- RecruitPage 작업.

---

2021-08-25

<br />

- axios말고 fetch를 사용하려고한다. 이유는 axios는 프록시 설정을 해줘야하는데 fetch api는 없었던 것으로 기억해서. 설정을 다르게 해줘야 하긴 하지만. 보안상 어떤 문제가 있는지는 잘 모르겠다.

- 안쓰던 것을 사용하려니 좀 헷갈린다. 현재 sign up을 하면 db에 저장은 되지만 redux쪽에서 뭔가 잘못된 것이 있는 것 같다.

-> 해결. fetch 후 then 사용.

- sign in 완료. sign in하면 navBar right menu 변경 작업 필요.

-> 인줄 알았으나 sign in이 유지되지 않는 문제 발생. 토큰은 생기는 것을 보면 완전히 안되는 것은 아닌 모양이다.

-> fetch쓰지 말걸 그랬나? 로그인은 됐지만 auth가 안된다. 쿠키는 받았는데. 로그아웃도 안된다. cors 문제 때문인듯?

<br />

---

2021-08-24

<br/>
간략한 화면설계. frontend, backend, db 설계.

<br/>

---
