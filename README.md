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


    - PostDetailPage ("/recruitment/posts/:postId")
        - ParticipateIn ("button onClick={participateInHandler} participateIn /button")
        - Comment


    - PostRecruitmentPage ("/recruitment/posts/postId")


    - MyPage ("/users/profile")
        - MyInfo
            - UpdateInfoPage
        - MyRecruit
        - ApplyTo
        - ApplyFor


    - Footer


<br/>

- backend


    - "/users"


        - POST "/users/signup" // register users


        - POST "/users/signin" // login users


        - GET "/users/userId" // display user's avatar, name


        - POST "/users/logout" // logout users

        
        - GET "/users/mypage/profile/ // enter mypage, get user info


        - UPDATE "/users/mypage/profile" // udpate user's profile


        - DELETE "/users/mypage/profile" // witdrwal users


    - "/recruits"


        - GET "/recruits/post" // get latest posts or get a post


        - POST "/recruits/post" // users post recruitement post


        - UPDATE "/recruits/post" // update posts


        - DELETE "/recruits/post" // delete posts


<br/>

- database


    - users
        - id (string)
        - nickname (string)
        - password (string)
        - position (string)
        - skills (Array?)
        - career (string)
        - github address (string)


    - posts
        - writer (objectId)
        - title (string)
        - project detail (string)
        - meeting location (string)
        - recruit positions (string)


<br />


<br />


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