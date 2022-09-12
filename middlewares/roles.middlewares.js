const roleValidation = (roles) => (req, res, next) => {

    const user = req.session.user;

    if (req.session.user && roles.includes(req.session.user.role)) {
        console.log('estas dentrooooooo')
        req.app.locals.role = user.role
        next();
    } else {
        req.app.locals.role = null
        res.redirect('/auth/login');
    }
}


const userValidation = (roles) => (req, res, next) => {

    const user = req.session.user;

    if (req.session.user._id === req.params.id && roles.includes(req.session.user.role)) {
        console.log('estas dentrooooooo')
        next();
    } else {
        res.redirect('/auth/login');
    }
}






module.exports = roleValidation