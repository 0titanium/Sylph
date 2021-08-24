# Sylph


***


Sylph means Start your lovely projects here.




Recruits project team members. Participate in the project.


***


- frontend: react, antd


- backend: nodejs, express


- database: mongodb atlas


***


- frontend

    - NavBar
        - not login
            - logo ("<a href="/">Sylph</a>")
            - dropdown ("<li><a href="/category/positions">postions</a></li>")
                - dropdown ("<li><a href="/category/techs">techs</a></li>")
            - searchBar ("<?></?>")
            - sign in ("<a href="/signin"></a>")
            - sign up ("<a href="/signup"></a>")
        - login
            - logo ("<a href="/">Sylph</a>")
            - dropdown ("<li><a href="/category/positions">postions</a></li>")
                - dropdown ("<li><a href="/category/techs">techs</a></li>")
            - searchBar ("<?></?>")
            - dropdown ("<a href="/myPage">myPage</a>") && ("<a>logout</a>")

    - RegisterPage ("/register")


    - LoginPage ("/login")


    - LandingPage ("/")
        - project recruitment cards (<a href="/recruitment/posts/:postId">detail</a>)


    - PostDetailPage ("/recruitment/posts/:postId")
        - ParticipateIn (<button onClick={participateInHandler}>participateIn</button>)
        - Comment


    - PostRecruitmentPage ("/recruitment/posts/postId")


    - MyPage ("/users/)


    - Footer




- backend


    - "/users"


        - POST "/users/signup" // register users


        - POST "/users/signin" // login users


        - GET "/users/userId" // display user's avatar, name


        - POST "/users/logout" // logout users


        - UPDATE "/users/mypage/profile" // udpate user's profile


        - DELETE "/users/mypage/profile" // witdrwal users


    - "/posts"


        - GET "/posts/postId" // get latest posts or get a post


        - POST "/posts/users/post" // users post recruitement post


        - UPDATE "/posts/users/postId" // update posts


        - DELETE "/posts/users/postId" // delete posts


- database


    - users
        - id
        - nickname
        - password
        - position
        - skills
        - career
        - github address


    - posts
        - title
        - content




***

2021-08-24




간략한 화면설계. frontend, backend, db 설계.



***