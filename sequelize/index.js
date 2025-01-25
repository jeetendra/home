const Sequelize = require('sequelize');

const username = 'postgres';
const password = 'postgres';
const database = 'learn-postgres';

const sequelize = new Sequelize(database, username, password, {
   host: 'localhost',
   dialect: 'postgres'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.log('Unable to connect to the database:', err);
});

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

const Post = sequelize.define('post', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    // authorId: {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: User,
    //     key: 'id',
    //   }
    // }
});

const Project = sequelize.define('project', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
});

User.hasMany(Project);
User.hasMany(Post);
Project.belongsTo(User);
Post.belongsTo(User);

User.sync().then(() => {
    // Table created
    // return User.create({
    //   username: 'jeetendoex',
    //   birthday: new Date(1983, 12, 12)
    // });
});

Post.sync().then(() => {
    // Post.create({
    //     title: "Hello",
    //     description: "Description",
    //     authorId: 1
    // })
});

Project.sync()


User.findAll({
    include: [{
      model: Post,
      required: false
    }]
});