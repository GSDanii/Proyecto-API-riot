const router = require("express").Router();
const UserModel = require('../models/User.model')
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")

//GET ROUTES

router.get('/:id', roleValidation(ROLES), (req, res, next) => {
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

router.get("/:id/delete", (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/auth/signup'))
        .catch((err) => next(err))
})

//POST ROUTES

router.post("/:id/update", (req, res, next) => {
    const { username, summonerName } = req.body

    UserModel.findByIdAndUpdate(req.params.id, { username, summonerName })
        .then((user) => res.redirect(`/profile/${user._id}`))
        .catch((err) => next(err))
})


module.exports = router


