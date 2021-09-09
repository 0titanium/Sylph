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


        - DELETE "/users/mypage/profile" // witdrwal users


    - "/recruits"


        - GET "/recruits/latestRecruits" // get latest recruits


        - GET "/recruits/recruitDetail" // get a specific recruit


        - POST "/recruits/recruit" // users post recruitement recruit


        - PATCH "/recruits/recruit" // update recruit


        - DELETE "/recruits/recruit" // delete recruit


        - POST "/recruits/apply" // apply to recruit


<br/>

- database


    - user
        - id (string)
        - nickname (string)
        - password (string)
        - position (string)
        - skills (string)
        - career (string)
        - github address (string)
        - image (String?)
        - recruit (string? boolean?)
        - applyto (string)
        - applyfor (string)


    - recruit
        - writer (objectId)
        - title (string)
        - project detail (string)
        - meeting location (string)
        - recruit positions (string)
        - required experience (string)


<br />


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