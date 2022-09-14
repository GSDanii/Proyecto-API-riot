const router = require("express").Router();
const UserModel = require('../models/User.model')
const PostModel = require('../models/Post.model')
const ComentModel = require('../models/Comment.model')


router.get('/', (req, res, next) => {
    PostModel.find()
        .then((AllPosts) => res.render('index/forum', { AllPosts }))
        .catch((err) => next(err))
})

router.get('/:idPost', (req, res, next) => {
    PostModel.findById(req.params.idPost)
        .populate('user', 'username role -_id')
        .then((post) => res.render('index/post-details', post))
        .catch((err) => next(err))
})





router.post("/post", (req, res, next) => {

    const { description, imgChamp, imgItems, title } = req.body
    const user = req.session.user._id
    PostModel.create({ user, description, imgChamp, imgItems, title })
        .then((user) => res.redirect('/forum'))
        .catch((err) => next(err))
})


module.exports = router