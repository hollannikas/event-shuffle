import {
    Event,
    Vote,
    sequelize
} from '../model/events';

function formatEvent(event) {
    const votes = [];
    event.votes.forEach(eventVote => {
        const index = votes.findIndex(vote => eventVote.date === vote.date );
        if(index === -1) {
            votes.push({date: eventVote.date, people: [eventVote.person]});
        } else {
            const vote = votes[index];
            votes[index] = ({date: vote.date, people: [...vote.people, eventVote.person]});
        }
    });
    return {
        id: event.id,
        name: event.name,
        dates: event.dates,
        votes: votes
    }
}

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
                attributes: ['date', 'person']
            }]
        })
        .then(event => {
            if(event) {
                return formatEvent(event);
            } else {
                return "Not found";
            }
        })
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

function createVote(eventId, vote) {
    const name = vote.name;
    const dates = vote.votes;
    return sequelize.transaction(() => {
        dates.forEach(date => {
            updateVote(eventId, date, name);
        });
    })
    .then(() => findById(eventId))
    .catch(err => {
        console.log(err);
        return {error: err};
    });
}

function updateVote(eventId, date, name) {
    return Vote.findOrCreate( {where: {EventId: eventId, date: date, person: name}});
}

export const eventList = (request, reply) => reply(getAll());
export const event = (request, reply) => reply(findById(request.params.id));
export const createEvent = (request, reply) => reply(create(request.payload)).code(201);
export const addVote = (request, reply) => reply(createVote(request.params.id, request.payload)).code(201);
