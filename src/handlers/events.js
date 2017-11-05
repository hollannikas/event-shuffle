import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {dialect: 'postgres'});

const Event = sequelize.define('Event', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.TEXT,
    dates: DataTypes.ARRAY(DataTypes.STRING)
});

const Vote = sequelize.define('Vote', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: DataTypes.DATEONLY,
    people: DataTypes.ARRAY(DataTypes.STRING)
});

Event.hasMany(Vote, {as: 'votes'});

Event.sync({force: true})
    .then(() => Vote.sync({force: true}));


function getAll() {
    return Event.findAll({attributes: ['id', 'name']})
        .then(event => event)
        .catch(err => {
            console.log(err);
            return {error: err};
        });
}

function findById(id) {
    return Event.findById(id,
        {
            attributes: ['id', 'name', 'dates'],
            include: [{
                model: Vote,
                as: 'votes',
                attributes: ['date', 'people']
            }]
        })
        .then(event => event ? event : "Not found")
        .catch(err => {
            console.log(err);
            return {error: err};
        });
}

function create(event) {
    return Event.create(event)
        .then(event => {
            return {id: event.id};
        })
        .catch(err => {
            console.log(err);
            return {error: err};
        });
}

export const eventList = (request, reply) => reply(getAll());
export const event = (request, reply) => reply(findById(request.params.id));
export const createEvent = (request, reply) => reply(create(request.payload)).code(201);
