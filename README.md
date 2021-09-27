# Sylph


***

<br/>


Sylph means Start your lovely projects here.




Recruits project team members. Participate in the project.


<br/>

***


<br/>
- frontend: react, antd


- backend: nodejs, express


- database: mongodb atlas


<br/>

***


<br/>

- frontend

    - NavBar
        - not login
            - logo ("a href="/" Sylph /a")
            - dropdown ("li a href="/category/positions" postions /a /li")
                - dropdown ("li a href="/category/techs" techs /a /li")
            - searchBar ("? /?")
            - sign in ("a href="/signin" /a")
            - sign up ("a href="/signup" /a")
        - login
            - logo ("a href="/" Sylph /a ")
            - dropdown ("li a href="/category/positions" postions /a /li")
                - dropdown ("li a href="/category/techs" techs /a /li")
            - searchBar ("? /?")
            - dropdown ("a href="/myPage" myPage /a") && ("a logout /a")

    - RegisterPage ("/register")


    - LoginPage ("/login")


    - LandingPage ("/")
        - position || tech stack filter dropdown
        - project recruitment cards ("a href="/recruitment/posts/:postId" detail /a")


    - RecruitDetailPage ("/recruit/:recruitId")
        - Apply ("button onClick={onApplyHandler} Apply /button")
        - Comment


    - RecruitPage ("/recruit/post")


    - UpdateRecruitPage ("/recruit/update/:recruitId")


    - MyPage ("/mypage")
        - MyInfo
            - UpdateMyInfo("/mypage/update)
        - MyRecruit
        - ApplyTo
        - ApplyFor


    - Footer


<br/>

- backend


    - "/users"


        - POST "/users/signup" // signup users


        - POST "/users/signin" // signin users


        - GET "/users/auth" // user authentication


        - POST "/users/signout" // signout users


        - GET "/users/userInfo" // user info


        - PATCH "/users/userInfo" // udpate user's profile


        - DELETE "/users/witdrwal" // witdrwal users


        - PATCH "/users/applyment" // apply


        - PATCH "/user/recruit" // save data writting recruit


    - "/recruits"


        - POST "/recruits/recruit" // users post recruitement recruit


        - GET "/recruits/latestRecruits" // get latest recruits


        - GET "/recruits/recruitDetail:rid" // get a specific recruit


        - PATCH "/recruits/recruit" // update recruit


        - DELETE "/recruits/recruit" // delete recruit


        - PATCH "/recruits/applyment" // apply to recruit


        - GET "/recruits/applyment" // get data applying to recruit


        - GET "/recruits/myRecruit" // get data recruit written by user


        - GET "/recruits/myApply" // get data apply


<br/>

- database


    - user
        - id (string)
        - nickname (string)
        - password (string)
        - position (Array)
        - skills (Array)
        - career (string)
        - github address (string)
        - image (String?)
        - recruitWriting (objectId)
        - applyto (Array)


    - recruit
        - writer (objectId)
        - title (string)
        - project detail (string)
        - meeting location (string)
        - recruit positions (Array)
        - Qualifications (string)
        - applyfor (Array)


<br />


***

2021-09-27



- MyPage - MyRecruit 긴 글 "..." 적용 기능. v


-> 작성.


***

2021-09-24

<br />

- 지원자 프로필 보기 기능. ViewProfile.js. v


-> 작성.


- MyPage - MyRecruit 긴 글 "..." 적용 기능.


- 지원 관련. 
    - 지원 수락 기능 - 지원 수락 버튼 -> 모집 데이터에 지원자 아이디 추가? 
    - 지원 거절 기능 - 지원 거절 버튼 -> 거절 메세지 전달? 재지원 불가? 


- 모바일 화면에서의 디자인을 위한 css 작업이 필요. <component style={{}} /> -> component.css로 바꿔야


***


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


***


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


***


2021-09-17



- 체크박스 문제 v



***

2021-09-16


- 모집 시 포지션을 체크박스로 선택, 필드를 array로 변경.


-> 체크박스는 선택하면 저절로? 배열로 값이 채워진다?


- 유저당 모집을 하나만 할 수 있게 하는 방법?


-> 나중에 v


- 포지션, 언어를 체크박스로 바꾸니 수정할 때 값이 제대로 전달되지 않음. 수정 필요. v



***


2021-09-15

- 모집완료 기능 작성 v


- click positions, tech stacks -> page filtered 작성중 (landigpage base)


-> 모집 모델이 키워드를 포함하고 있어야 할 것 같다.


- 1인 1모집 기능 작성 중.


-> 작동하긴 하지만 딜레이가 있음.


- 글을 삭제했을 때 유저 정보도 업데이트 해야함.


-> 해결



***


2021-09-14


- 이미 지원한 리쿠르트 버튼 disabled


- 남은 일
    - 모집완료 기능
    - nav left menu detail
    - one user, one recruit


- recruit detail loading spinner


***


2021-09-13


- 서버에서 데이터가 도착하지 않은 것, 저장된 데이터가 없는 것을 구분하는 방법.


-> data === undefined ? loading state : data.length !== 0 ? component : string no data로 처리함.


- left menu dropdown.


-> each menu click -> landing page -> display recruits matching menu



***

2021-09-10


- for loop에서 쿼리를 돌리면 안되나?


-> findById -> find { _id : { $in: } }로 해결.


- apply to 흐름: 유저를 찾음 -> 유저 지원을 찾음 -> 지원한 모집들을 찾음


- apply to, apply for 작성. 디자인은 나중에?


- 남은 것 
    - 지원 시 apply button disabled 처리 문제
    - 모집글은 아이디당 한개씩만 쓸 수 있게 처리하는 문제.
    - positions dropdown (o)
    - tech stacks dropdown (o)
    - when someone apply to recruit change alarm bell of right menu () 


<br />

***


2021-09-09

- apply for, apply to에 표시할 데이터를 서버에서 처리하지 못하는 문제. 비동기 문제? 스코프 문제?


-> apply for 흐름: 유저를 찾음/ -> 유저 모집글 찾음/ -> 모집글 지원자 아이디 찾음/ -> 아이디 별로 유저를 찾음/ 


-> 유저별 닉네임 배열에 담음.(여기서 안됨. 콘솔에는 찍힘.) -> 배열을 클라이언트에 리턴.


- 지원 시 apply button disabled 처리 문제.


- 모집글은 아이디당 한개씩만 쓸 수 있게 처리하는 문제.


***


2021-09-08


- 여러 글이 있어도 하나의 글만 불러오는 문제.


-> 수정 완료.


- 글 수정 페이지에서 원본 내용을 가져오지 못하는 문제.


-> 수정 완료.


- recruitId, useParams의 rid가 같은 값이라고 생각하는데 recrutId는 알 수없는 문제가 있음.


- applyto 다듬기


***


2021-09-07


- 지원 버튼 클릭 -> 지원한 유저 데이터베이스에 지원 정보 저장, 리쿠르트 데이터베이스에 지원자 정보 저장 -> 리쿠르트 작성자에게 알림


-> 대략 완성에 가까움. 지원자를 objectid가 아닌 아이디나 닉네임으로 표시해야함.


***


2021-09-06


- firefox에서는 <br />로 여백이 만들어지지 않음. 검색 결과 좋은 방법도 아니라고 함. 


-> 제거 후 margin을 통해 여백 생성.


<br />


- 지원 관련 기능. User, Recruit schema에 추가 필요.


-> 지원 버튼 클릭 -> 지원한 유저 데이터베이스에 지원 정보 저장, 리쿠르트 데이터베이스에 지원자 정보 저장 -> 리쿠르트 작성자에게 알림


<br />

***

2021-09-03


- 회원 탈퇴 기능 작성


- 지원 기능 작성


***


2021-09-02


- update user info 작업


-> 과정은 잘되지만 db data는 바뀌지않는 문제 발생.


-> 변수명을 잘못 쓴 것이 원인이었다.


- 해야할 일


-> 회원 탈퇴 기능, 지원 기능, 지원 확인 기능, 지원 취소 기능, 지원 수락 기능, 지원 거절 기능, ...etc


<br />

***


2021-09-01


- update recruit page 작업


- method patch 중에 에러 발생. "Unexpected token < in JSON at position 0".


-> mongoose findByIdAndUpdate()를 사용하니까 해결됨.


- roughly finish recruit basic CRUD


***


2021-08-31


- notice icon 삽입하면 li 렌더링 순서가 1 2 3에서 1 3 2로 바뀌는 문제발생.


- my page/my info 작업


<br />

***


2021-08-27


- my page 작업


***


2021-08-26


- fetch에 mode, credential을 추가하니까 로그인 상태 유지 해결.


- navBar right menu 작업.


- RecruitPage 작업.


***


2021-08-25


<br />

- axios말고 fetch를 사용하려고한다. 이유는 axios는 프록시 설정을 해줘야하는데 fetch api는 없었던 것으로 기억해서. 설정을 다르게 해줘야 하긴 하지만. 보안상 어떤 문제가 있는지는 잘 모르겠다.


- 안쓰던 것을 사용하려니 좀 헷갈린다. 현재 sign up을 하면 db에 저장은 되지만 redux쪽에서 뭔가 잘못된 것이 있는 것 같다.


-> 해결. fetch 후 then 사용.


- sign in 완료. sign in하면 navBar right menu 변경 작업 필요.


-> 인줄 알았으나 sign in이 유지되지 않는 문제 발생. 토큰은 생기는 것을 보면 완전히 안되는 것은 아닌 모양이다.


-> fetch쓰지 말걸 그랬나? 로그인은 됐지만 auth가 안된다. 쿠키는 받았는데. 로그아웃도 안된다. cors 문제 때문인듯?



<br />

***

2021-08-24


<br/>
간략한 화면설계. frontend, backend, db 설계.


<br/>

***