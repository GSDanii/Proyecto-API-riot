const router = require("express").Router();
const UserModel = require('../models/User.model')
const PostModel = require('../models/Post.model')
const ComentModel = require('../models/Comment.model')
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const { checkRoleUser, checkUser } = require('../utils/checkUsers')


router.get('/', (req, res, next) => {
    PostModel.find()
        .then((AllPosts) => res.render('index/forum', { AllPosts }))
        .catch((err) => next(err))
})

router.get('/:idPost/delete', (req, res, next) => {
    PostModel.findByIdAndDelete(req.params.idPost)
        .then(() => res.redirect('/forum'))
        .catch((err) => next(err))
})

router.get('/:idPost', (req, res, next) => {
    let canView = false
    PostModel.findById(req.params.idPost)
        .populate('user', 'username role -_id')
        .then((post) => {
            const { user } = req.session;
            if (checkUser(user.username, post.user.username) || checkRoleUser(user.role, CHALLENGER)) {
                canView = true
            }
            console.log({ post, canView })
            res.render('index/post-details', { post, canView })
        })

        .catch((err) => next(err))
})





router.post("/post", (req, res, next) => {

    const { description, imgChamp, imgItems, title } = req.body
    const user = req.session.user._id
    PostModel.create({ user, description, imgChamp, imgItems, title })
        .then(() => res.redirect('/forum'))
        .catch((err) => next(err))
})


module.exports = router