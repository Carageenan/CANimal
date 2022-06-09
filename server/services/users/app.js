const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4001;
const { connect } = require("./config/mongodb");
const userRouter = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json("This is mongoDB REST API by Muhammad Ihsan Erdiansyah!");
});

app.use("/user", userRouter);

connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
