const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const common = {
    createLocalToken: function (user) {
        user.id = user._id ? user._id : null;
        user.email = user.email ? user.email : null;
        delete user.password;
        return jwt.sign({
            user
        }, process.env.JWT_SECRET, {expiresIn: '7 days'});
    },
    encryptPass: function (password) {
        // this will auto-gen a salt bcrypt.hash(password,size of hash, function)
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, function (err, hashpassword) {
                if (hashpassword) {
                    resolve(hashpassword);
                } else {
                    reject({
                        success: false,
                        status: 500,
                        message: 'Error in processing Query'
                    });
                }
            });
        });
    },
    isValidPassword: function (password, user) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    reject({
                        error: err,
                        success: false,
                        status: 500,
                        message: 'Error in processing Query'
                    });
                } else {
                    if (!result) {
                        reject({
                            error: err,
                            status: 401,
                            success: false,
                            message: "Password does not match"
                        });
                    } else {
                        resolve({
                            status: 200,
                            success: true,
                            message: 'Logged In Successfully'
                        });
                    }
                }
            });
        });

    }
};

module.exports = common;