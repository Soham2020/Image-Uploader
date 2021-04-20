const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const User = require('./user');
dotenv.config({ path: './config.env' });

const app = express();

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(() => {
    console.log('MONGODB Connected...');
  }).catch((err) => {
    console.log('Not Connected...')
  })
  

app.use(express.json());
app.use(fileUpload());

app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


app.get('/', checkAuthenticated, (req, res) => {
    res.send("Image Uploader!!")
})

app.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) throw err;
        if(!user) res.send("No User exists")
        else{
            req.logIn(user, (err) => {
                if(err) throw err;
                res.send("User authenticated")
                console.log(req.user);
            })
        }
    })(req, res, next);
});

app.post("/register", (req, res, next) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if(err) throw err;
        if(doc) res.send("User Already Exists")
        if(!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User ({
                username: req.body.username,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("New User created");
        }
    });
});

// app.delete('/logout/:id', async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ msg: "User removes!!" })
//     } catch(err) {
//         return res.status(500).json({msg: err.message});
//     }
// })

app.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

app.post('/upload', checkAuthenticated, (req, res) => {
    if( req.files === null ){
        return res.status(404).json({ msg: "No file upload!!" })
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/upload/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
    })
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});