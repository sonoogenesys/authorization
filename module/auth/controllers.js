const action = require('./actions');
const moment = require('moment');

const authController = {
    login: function (req, res){
        let data = {
            email: req.body.email.toLowerCase().trim(),
            password: String(req.body.password).trim()
        };
        action.login(data).then(result => {
            const meta = {
                message: result.message,
                success: result.success,
                status: result.status,
                action: 'signin'
            };
            const data = {
                token: result.token,
                user: result.user
            }
            res.json({meta, data});
        }).catch(err=>{
            res.json({meta: err});
        })
    },
    signup: function (req, res){
        let data = {
            email: req.body.email.toLowerCase().trim(),
            password: String(req.body.password).trim(),
            name: req.body.name,
            created_at: moment.utc().toDate()
        };
        action.signup(data).then(result=>{
            const meta = {
                message: result.message,
                success: result.success,
                status: result.status,
                action: 'signup'
            };
            const data = {
                token: result.token,
                user: result.user
            }
            res.json({meta, data});
        }).catch(err=>{
            res.json({meta: err});
        })
    }
};

module.exports = authController;