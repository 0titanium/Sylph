# Sylph

---

<br/>

Sylph means 'S'tart 'y'our 'l'ovely 'p'rojects 'h'ere.

Recruits project team members. Participate in the project.

# http://sylph-deploy.s3-website.ap-northeast-2.amazonaws.com/ 

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
