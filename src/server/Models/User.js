import Sequelize from 'sequelize';
import db from '../db';

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    timestamps: true,
    paranoid: true,
    underscored: true
});

export default User;