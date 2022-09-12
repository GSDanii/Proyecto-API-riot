const router = require("express").Router();
const UserModel = require("../models/User.model")





router.get('/signUp', (req, res, next) => res.render('auth/signup'))

router.get('/login', (req, res, next) => res.render('auth/login'))








router.post('/signUp', (req, res) => {
    const { username, password, summonerName } = req.body;

    UserModel.create({ username, password, summonerName })
        .then(() => res.redirect('/auth/login'))
        .catch((err) => {
            console.log(err);
            res.render('auth/signup', { messageError: 'Ha ocurrido un error' });
        });
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username }).then((user) => {
        if (user) {
            if (user.comparePassword(password)) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.render('/auth/login', {
                    messageError: 'Username or password invalid',
                });
            }
        } else {
            res.render('/auth/login', {
                messageError: 'Username or password invalid',
            });
        }
    });
});


module.exports = router