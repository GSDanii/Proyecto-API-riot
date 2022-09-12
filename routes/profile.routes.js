const router = require("express").Router();
const UserModel = require('../models/User.model')



//GET ROUTES

router.get('/:id', (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((foundUser) => {
            res.render('profile/myProfile', foundUser)
        })
        .catch((err) => next(err));
})

router.get("/:id/update", (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => res.render("profile/profile-update", user))
        .catch((err) => next(err))
})


//POST ROUTES

router.post("/:id/update", (req, res, next) => {
    const { username } = req.body

    const updatedUser = {
        username,
    }

    UserModel.findByIdAndUpdate(req.params.id, updatedUser)
        .then(() => res.redirect('/profile/myProfile'))
        .catch((err) => next(err))
})


module.exports = router


