const dao = require('./dao');
const { createLocalToken, encryptPass, isValidPassword } = require('../common/index');

const authAction = {
    login: function (data) {
        return new Promise((resolve, reject) => {
            dao.getOne({email: data.email}).then(user => {
                if (user.user) {
                    isValidPassword(data.password, user.user)
                        .then((result) => {
                            let token = createLocalToken(user.user);
                            resolve({
                                message: result.message,
                                status: result.status,
                                success: result.success,
                                token: token,
                                user: user.user
                            })
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    reject({
                        message: 'User not found',
                        status: 403,
                        success: false
                    })
                }
            }).catch(err => {
                console.log('--->', err)
                reject(err)
            })
        })
    },
    signup: function (data) {
        return new Promise((resolve, reject) => {
            dao.getOne({email: data.email}).then(user => {
                if (!user.user) {
                    encryptPass(data.password)
                        .then((hashPassword) => {
                            data.password = hashPassword;
                                dao.create(data).then(result => {
                                    let token = createLocalToken(result.user);
                                    resolve({
                                        message: result.message,
                                        status: result.status,
                                        success: result.success,
                                        token: token,
                                        user: result.user
                                    })
                                }).catch(err => {
                                    console.log(err)
                                    reject(err)
                                });
                            }).catch(err => {
                                console.log(err)
                                reject(err)
                            });
                } else {
                    reject({
                        message: 'User already exist',
                        status: 403,
                        success: false
                    })
                }
            }).catch(err => {
                console.log('--->', err)
                reject(err)
            })
        })
    }
}
module.exports = authAction;