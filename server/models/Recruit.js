const mongoose = require("mongoose");

const recruitSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxLength: 50,
    },
    projectDetail: {
      type: String,
    },
    recruitPositions: {
        type: String,
    },
    recruitCompleted: {
        type: Boolean,
        default: null,
    }
  },
  { timestamps: true }
);

const Recruit = mongoose.model("Recruit", recruitSchema);

module.exports = { Recruit };
