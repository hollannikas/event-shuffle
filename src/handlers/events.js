import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Event = sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.TEXT,
    dates: DataTypes.ARRAY(DataTypes.DATEONLY)
});

Event.sync({force: false});

function getAll() {
    return Event.findAll({attributes: ['id', 'name']})
        .then(event => event)
        .catch(err => {
            console.log(err);
            return {error: err};
        });
}

function findById(id) {
    return Event.findById(id, {attributes: ['id', 'name', 'dates']})
        .then(event => event)
        .catch(err => {
            console.log(err);
            return {error: err};
        });
}

function create(event) {
    console.log(event);
    return Event.create(event)
        .then(event => {return {id: event.id}})
        .catch(err => {
            console.log(err);
            return {error: err};
        });
}

export const eventList = (request, reply) => reply(getAll());
export const event = (request, reply) => reply(findById(request.params.id));
export const createEvent = (request, reply) => reply(create(request.payload));
