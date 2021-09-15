const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Recruit } = require("../models/Recruit");
const { User } = require("../models/User");

// post recruit content route
router.post("/recruit", (req, res) => {
  const recruit = new Recruit(req.body.submitRecruitDetail);

  recruit.save((err, recruitPost) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, recruitPost });
  });
});

// get latest recruits content route
router.get("/latestRecruits", (req, res) => {
  Recruit.find()
    .populate("writer")
    .exec((err, recruits) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, recruits });
      }
    });
});

// get a specific recruit route
router.get("/recruitDetail/:rid", (req, res) => {
  Recruit.findById(req.params.rid, null, (err, recruit) => {
    User.findById(recruit.writer, null, (err, writer) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res
        .status(200)
        .json({ success: true, recruitDetail: recruit, writer });
    });
  });
});

// update a specific reqcruit route
router.patch("/recruit", (req, res) => {
  let {
    recruitId,
    title,
    projectDetail,
    recruitPositions,
    requiredExperience,
    meetingLocation,
  } = req.body.submitRecruitDetail;

  recruitId = mongoose.Types.ObjectId(recruitId);

  Recruit.findByIdAndUpdate(
    recruitId,
    req.body.submitRecruitDetail,
    (err, recruit) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true });
    }
  );
});

// delete a specific reqcruit route
router.delete("/recruit", (req, res) => {
  let recruitId = mongoose.Types.ObjectId(
    req.body.submitRecruitDetail.recruitId
  );

  Recruit.findByIdAndRemove(recruitId, null, (err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});

// apply recruit route
router.patch("/applyment", (req, res) => {
  let recruitId = mongoose.Types.ObjectId(req.body.recruitId);

  Recruit.findByIdAndUpdate(
    recruitId,
    { $push: { applyfor: req.body.userId } },
    (err) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true });
    }
  );
});

// alarm to writer route
router.get("/applyment", (req, res) => {
  let userId = req.cookies.user_id;

  // find user writing recruit
  User.findById(userId, null, (err, user) => {
    let recruitId = user.recruitWriting;

    // find recruit written by upper user
    Recruit.findById(recruitId, null, (err, recruit) => {
      let applyFor = [];
      let title = "";

      if (recruit) {
        applyFor = recruit.applyfor;
        title = recruit.title;
      }

      User.find({ _id: { $in: applyFor } }, (err, user) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }

        let arrayApplyUsers = user;
        let usersNicknames = arrayApplyUsers.map((user) => user.nickname);

        return res.status(200).json({ success: true, title, usersNicknames });
      });
    });
  });
});

// my recruit route
router.get("/myRecruit", (req, res) => {
  let userId = req.cookies.user_id;

  User.findById(userId, null, (err, user) => {
    let recruitId = user.recruitWriting;

    Recruit.findById(recruitId, (err, recruit) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res
        .status(200)
        .json({ success: true, recruitDetail: recruit, user });
    });
  });
});

// get my apply to route
router.get("/myApply", (req, res) => {
  let userId = req.cookies.user_id;

  User.findById(userId, null, (err, user) => {
    let applyto = user.applyto;

    Recruit.find({ _id: { $in: applyto } }, (err, recruit) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      let arrayRecruit = recruit;
      let recruitTitle = arrayRecruit.map((recruit) => recruit.title);
      let recruitId = arrayRecruit.map((recruit) => recruit._id);

      return res.status(200).json({ success: true, recruitTitle, recruitId });
    });
  });
});

// complete recruit route

router.patch("/completion", (req, res) => {
  let recruitId = req.body.recruitId;
  let recruitTitle = req.body.title;

  Recruit.findByIdAndUpdate(
    recruitId,
    { title: "[모집완료] - " + recruitTitle, recruitCompleted: true },
    null,
    (err, recruit) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
