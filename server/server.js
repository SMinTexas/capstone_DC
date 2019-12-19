require('dotenv').config()

const express = require('express');
const app = express()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


app.use(express.json())


app.post('/login', async (req, res) => {
    const username =  req.body.username
    const password = req.body.password

    models.User.findOne({
        where: {
            username: username
        }
    }).then((user) => { 

        if (user) {
            bcrypt.compare(password, user.password, (error, 
                result) => {
                    if(result) {
                        jwt.sign({ username: username}, process.env.ACCESS_TOKEN_SECRET,
                            function (error, token) {
                                if(token){
                                    res.json({ username: username, token: token, id: user.id, status: 200 })
                                    
              } else {
                res.status(500).json({ message: 'unable to generate token', status: 500 })
              }
            })
        }
        else {
          let message = "wrong username and password"
          res.status(500).json({ message: message, status: 500 })
        }
      })
    }
  })
})



app.listen(3001)