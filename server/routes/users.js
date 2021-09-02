const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

// signup route
router.post("/signup", (req, res) => {
  // 회원가입시 필요한 정보를 클라이언트에서 가져오면
  // 데이터베이스에 넣어준다.

  const user = new User(req.body.dataToSubmit);

  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
    });
  });
});

// signin route
router.post("/signin", (req, res) => {
  // 1 요청된 아이디가 db에 있는지 찾기

  User.findOne({ id: req.body.dataToSubmit.id }, (err, user) => {
    if (!user) {
      console.log("아이디 없음");
      return res.json({
        signinSuccess: false,
        message: "제공된 아이디에 해당하는 유저가 없습니다.",
      });
    }

    // 2 요청된 아이디가 db에 있으면 암호가 맞는지 확인
    user.comparePassword(req.body.dataToSubmit.password, (err, isMatch) => {
      if (!isMatch) {
        console.log("비밀번호 다름");
        return res.json({
          signinSuccess: false,
          message: "비밀번호가 다릅니다.",
        });
      }

      // 3 암호가 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) {
          console.log("???");
          return res.status(400).send(err);
        }

        // 토큰을 저장 (쿠키, 세션, 로컬스토리지등 어디가 제일 안전한지는 논란)
        // 여기선 쿠키에 저장
        return res
          .cookie("x_auth", user.token)
          .cookie("user_id", user._id.toString())
          .status(200)
          .json({ signinSuccess: true, userId: user._id });
      });
    });
  });
});

// auth route
router.get("/auth", auth, (req, res) => {
  // auth에서 req에 token, user를 넣어줌으로써 이 함수에서 사용가능해짐
  // 미들웨어 통과 - auth === true

  res.status(200).json({
    // 유저 정보 제공 / 원하는 항목
    _id: req.user._id,
    isAuth: true,
    id: req.user.id,
    nickname: !req.user.nickname ? "" : req.user.nickname,
    position: req.user.position,
    skills: req.user.skills,
    career: req.user.career,
    githubaddress: req.user.githubaddress,
    image: !req.user.image ? "" : req.user.image,
  });
});

// signout route
router.post("/signout", auth, (req, res) => {
  console.log(req.user);
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) {
      return res.json({ signoutSuccess: false, err });
    }
    res.clearCookie("x_auth");
    res.clearCookie("user_id");
    return res.status(200).send({ signoutSuccess: true });
  });
});

// 유저 데이터 보내기
router.get("/userInfo", (req, res) => {
  let userId = req.cookies.user_id;
  let userImage = "";

  User.find({ _id: userId }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    if (user[0].image) {
      userImage = user[0].image;
    }

    userNickname = user[0].nickname;

    return res.status(200).json({
      success: true,
      userImage: userImage,
      user,
    });
  });
});

// update user info

router.patch("/userInfo", (req, res) => {
  let userObjId = mongoose.Types.ObjectId(req.body.data.objId);
  console.log(req.body.data);
  User.findByIdAndUpdate(userObjId, req.body.data, (err, recruit) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    console.log("update");
    return res.status(200).json({ success: true });
  });
});

module.exports = router;