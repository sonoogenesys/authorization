const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DBList = {
    "app": () => {
        let user_pass = '';
        return`mongodb://${user_pass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    }
};

const connections = {};

module.exports = function (dataSource) {
    let connection = DBList[dataSource]();
    if (connections[dataSource]) return connections[dataSource];
    return mongoose.createConnection(connection, {
        useNewUrlParser: true,
        autoIndex: true,
        useUnifiedTopology: true
    }, function (err) {
        if (err) console.log(err);
        else {
            console.log(`${connection}\nmongoose connection '${dataSource}' to ${process.env.DB_HOST} successful!`);
        }
    });
};