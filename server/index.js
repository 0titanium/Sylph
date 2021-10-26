const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const userRouter = require("./routes/users");
const recruitRouter = require("./routes/recruits");

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// application/json 형태의 데이터를 분석해서 가져올 수 있게 해준다.
app.use(express.json());

app.use(cookieParser());

const mongoose = require("mongoose");

// mongodb atlas connecting
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB atlas Connected"))
  .catch((err) => console.log(err));

app.use("/api/users", userRouter);
app.use("/api/recruits", recruitRouter);
// app.use("/api/comments", commentRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
