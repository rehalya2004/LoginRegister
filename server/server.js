const express = require("express")
const router = require("./Routes/routes")
const jwt = require("jsonwebtoken")
require("./Models/db")
const app = express()
const loginModel = require("./Models/models")


app.use(express.json());
app.use("/", router);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);


  jwt.verify(token, "MRKWWRTFLAFWWTFTGINL", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}

app.get('/posts', authenticateToken, (req, res) => {
  console.log(req.user.name);
  console.log(req.user.email);
  console.log(req.user.phno);
  console.log(req.user.address);
  res.json({ "name": req.user.name, "email": req.user.email, "phno": req.user.phno, "address": req.user.address });
})

app.put('/update/:id',(req, res) => {
  let data = {
    name:req.body.name,
    address:req.body.address,
    phno:req.body.mobile
  };
  console.log(req.params.id);

  loginModel.updateOne({_id: req.params.id}, data ).then(
    () => {
      res.status(201).json({
        message: 'Data updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.delete('/delete/:email', authenticateToken, (req, res, next) => {
  if (req.params.email != req.user.email) {
    return res.json("User not authorized");
  }
  loginModel.deleteOne({ email: req.params.email }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.get("/users", async (req, res) => {
  try {
    const allUser = await loginModel.find({});
    res.send({ status: "ok", data: allUser })
  } catch (error) {
    console.log(error)
  }
})

app.post("/deleteUser", async (req, res) => {
  const userid = req.body.userid;
  try {
    loginModel.deleteOne({ _id: userid }).then(
      () => {
        res.send({ status: "ok", data: "Deleted" })
      })
  }
  catch (error) {
    console.log(error)
  }
})


app.listen("8000", (err) => {
  if (err) console.log(err)
  else console.log("Server has started in Port 8000")
})


