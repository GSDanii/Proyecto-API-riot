const router = require("express").Router();
const { CHALLENGER } = require("../const/user.const")
const { checkRoleUser, checkUser } = require('../utils/checkUsers')
const PostModel = require('../models/Post.model')

router.get('/', (req, res, next) => {
    PostModel
        .find()
        .then(AllPosts => res.render('index/forum', { AllPosts }))
        .catch((err) => next(err))
})

/* Si ya estas en el fichero de forum, no es necesario poner idPost, simplemente id
Para borrar cosas no se usa get se usa delete
router.delete
https://codedestine.com/jax-rs-delete-restful-web-services/#:~:text=In%20REST%20API%20DELETE%20is,it%20is%20removed%2C%20gone%20forever.
*/

// router.delete('/:id', (req, res, next) => {
//     PostModel.findByIdAndDelete(req.params.idPost)
//         .then(() => res.redirect('/forum'))
//         .catch((err) => next(err))
// });

router.get('/:idPost/delete', (req, res, next) => {
    PostModel.findByIdAndDelete(req.params.idPost)
        .then(() => res.redirect('/forum'))
        .catch((err) => next(err))
})

router.get('/:idPost', (req, res, next) => {
    let canView = false
    PostModel
        .findById(req.params.idPost)
        .populate('user', 'username role -_id')
        .then((post) => {
            const { user } = req.session;
            // checkUser tiene como parametros una session y un user, sin embargo aqui veo dos veces el username, esto es muy confuso
            /** Yo aqui, en vez de tener una funcion que fuese checkRoleUSer, crearia una funcion que fuese isAdmin, o hasPermissions
             * y esa funcion hace todos los checks que corresponda y devuelve true o false
             * isUserAllowToSeeView = (userSession, userRequest) => {
             *  return userSession.username === userRequest.username || userSession.role === CHALLENGER
             * }
             * 
             * canView = isUserAllowToSeeView(user, post.user);
             */
            if (checkUser(user.username, post.user.username) || checkRoleUser(user.role, CHALLENGER)) {
                canView = true
            }
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