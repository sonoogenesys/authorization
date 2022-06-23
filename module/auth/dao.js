const Users = require('./models');

const dao = {
    getOne: function (obj){
        return new Promise((resolve, reject) => {
            let query = Users.findOne(obj);
            query.exec(function (err, userRecord) {
                if(err){
                    reject({message: 'Failed to fetch one user', status: 500, success: false});
                } else {
                    resolve({
                        status: 200,
                        success: true,
                        message: 'Successfully fetched one user',
                        user: userRecord
                    })
                }

            })
        });
    },
    create: function (obj){
        return new Promise((resolve, reject) => {
            let data = new Users(obj);
            data.save(function(err, userRecord){
                if (err) {
                    reject({message: 'Failed to create one user', status: 500, success: false});
                }
                resolve({
                    status: 200,
                    success: true,
                    message: 'Successfully created one user',
                    user: userRecord
                })
            })
        })
    }
}
module.exports = dao;