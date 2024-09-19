const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const { auth, JWT_SECRET } = require("./auth");
const {UserModel, TodoModel} = require("./config/db")

const app = express();
const users = [{ username: "we", password: "123456", email: "a@v.c" }];

app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_URL || "http://localhost:5173"}));

app.post("/api/signup", async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const joinDate = new Date().toLocaleDateString('en-GB').replace(/\//g, ':');    // 'en-GB' locale formats dates as dd/mm/yyyy
try{



  await UserModel.create({
    username,
    password,
    email,
    joinDate
  })
  res.send({
    message: "You have succesfully signed up as " + username,
  });
}
catch(err){
  console.error(err)
}  
 
});

// app.post("/api/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const user = users.find(
//     (user) => user.email === email && user.password === password
//   );

//   if (user) {
//     const username = user.username;
//     const token = jwt.sign({ username: username }, JWT_SECRET);

//     console.log(users);
//     res.send({
//       message: "You have signed in",
//       token: token,
//       username,
//     });
//   } else {
//     res.status(403).send({
//       message: "Invalid username or password",
//     });
//   }
// });

// app.post("/api/auth", auth, (req, res) => {
//   res.send({
//     message: "You are authenticated",
//     username: req.username,
//   });
// });

// app.get("/me", auth, (req, res) => {
//   res.send({
//     message: "You are logged in",
//     username: req.username,
//   });
// });

app.listen(3000);
