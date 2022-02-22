const express = require("express");
const app = express();

const cors = require("cors");
const studentRouter = require("./routes/student.routes");
const { render } = require("express/lib/response");

function loadApp() {
  try {
    // Middlewares
    // Enable CORS for all origin
    app.use(cors());

    // Purpose => Parse Request Body
    app.use(express.json());
    app.use("/", studentRouter);
    app.use("/",(req,res)=>{
      console.log("hello")
    })
    app.use("/",(req,res)=>{
      req.send("hello")
    })
    const port = process.env.PORT || 3002
    app.listen(port, () =>
      console.log(`Server listening at port 3002...`)
    );
  } catch (err) {
    console.error(err);sss
    process.exit();
  }
}

loadApp();
