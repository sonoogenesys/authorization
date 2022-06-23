const authController = require('./controllers');

const err = (res, message) => {
    return res.json({meta: { success: false, status: 422, message: message } });
}
const verifier = (req, res, next) => {
    if(!/^(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/.test(req.body.password)){
        err(res, "Password should contain atleast a number and a special character");
    } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){
        err(res, "Email should be valid");
    } else {
        next();
    }
}

module.exports = (route) => {
    route.post('/signup', verifier, authController.signup);
    route.post('/signin', verifier, authController.login);
    return route;
}