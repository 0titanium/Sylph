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

// get recruits checked positions
router.get("/positions/:pname", (req, res) => {
  Recruit.find({ recruitPositions: req.params.pname }).exec((err, recruits) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, recruits });
  });
});

// get recruits checked languages
router.get("/languages/:lname", (req, res) => {
  Recruit.find({ languages: req.params.lname }).exec((err, recruits) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, recruits });
  });
});

// get a specific recruit route
router.get("/recruitDetail/:rid", (req, res) => {
  Recruit.findById(req.params.rid, null, (err, recruit) => {
    if (!recruit) {
      return res.status(400).json({ success: false, err });
    } else {
      User.findById(recruit.writer, null, (err, writer) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }

        return res
          .status(200)
          .json({ success: true, recruitDetail: recruit, writer });
      });
    }
  });
});

// update a specific reqcruit route
router.patch("/recruit", (req, res) => {
  let {
    recruitId,
    title,
    projectDetail,
    recruitPositions,
    lanugages,
    Qualifications,
    meetingLocation,
  } = req.body.submitRecruitDetail;

  // recruitId = mongoose.Types.ObjectId(recruitId);
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
// "/applyment" + "/cancelApplyment" 합칠 수 있을 듯
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

// cancel application route
router.patch("/cancelApplyment", (req, res) => {
  let recruitId = mongoose.Types.ObjectId(req.body.recruitId);

  Recruit.findByIdAndUpdate(
    recruitId,
    { $pull: { applyfor: req.body.userId } },
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
      let recruitId;

      if (recruit) {
        applyFor = recruit.applyfor;
        title = recruit.title;
        recruitId = recruit._id;
      }

      User.find({ _id: { $in: applyFor } }, (err, user) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }

        let arrayApplyUsers = user;
        let usersNicknames = arrayApplyUsers.map((user) => user.nickname);

        return res
          .status(200)
          .json({ success: true, usersNicknames, user, recruit });
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
    let applyto;

    if (user.applyto) {
      applyto = user.applyto;
    } else {
      return res
        .status(200)
        .json({ success: true, recruitTitle: null, recruitId: null });
    }

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

// acceptance route
router.patch("/acceptance", (req, res) => {
  let recruitId = req.body.recruitId;
  let userId = req.body.addUserId;

  Recruit.findByIdAndUpdate(
    recruitId,
    { $push: { member: userId } },
    (err, applyUser) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true });
    }
  );
});

// refusal route
router.patch("/refusal", (req, res) => {
  let recruitId = mongoose.Types.ObjectId(req.body.recruitId);

  Recruit.findByIdAndUpdate(
    recruitId,
    { $pull: { applyfor: req.body.removeUserId } },
    (err, applyUser) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true });
    }
  );
});

// check apply route
router.get("/applicationInfo", (req, res) => {
  let userId = req.cookies.user_id;

  User.findById(userId, (err, user) => {
    let userApplyTo = user.applyto; // [...recruitId]
    let check = [];

    Recruit.find({ _id: { $in: userApplyTo } }, (err, recruits) => {
      // [...], [...], ... ,[...]
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      check = recruits.map((recruit) => {
        let applyFor = recruit.applyfor; // [...userId];

        if (applyFor.includes(userId) && !recruit.member.includes(userId)) {
          return 2;
        } else if (
          // accenptace - recruitId in user.applyto 1 && userId in recruit.applyfor 1 && userId in recruit.member 1 - push 1
          applyFor.includes(userId) &&
          recruit.member.includes(userId)
        ) {
          return 1;
        } else if (!applyFor.includes(userId)) {
          return 0;
        }
      });

      return res.status(200).json({ success: true, check });
    });
  });
});

module.exports = router;
