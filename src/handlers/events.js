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
    console.log(event);
    console.log(event.name);
    return Event.create(event)
        .then(event => {
            console.log(event.name);
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

function getResult(eventId) {
    return findById(eventId)
        .then(event => {
            const suitableDates = findDatesThatFitAllPeople(event.votes);
            // find all people
            // check that a date has all people => push
            return {
                id: event.id,
                name: event.name,
                suitableDates: suitableDates
            }
        })
        .catch(err => {
            console.log(err);
            return {error: err};
        });
}

function findDatesThatFitAllPeople(votes) {
    const people = extractPeopleFromVotes(votes);
    // all people have voted = the amount of voters === the amount of people
    return votes
        .filter(vote => vote.people.length === people.length)
        .map(vote => {
            return { date: vote.date, people: people }
        });
}

function extractPeopleFromVotes(votes) {
    const people = [];
    votes.forEach(vote => {
        vote.people.forEach(person => {
            if(people.indexOf(person) === -1) {
                people.push(person);
            }
        });
    });
    return people;
}

export const eventList = (request, reply) => reply(getAll());
export const event = (request, reply) => reply(findById(request.params.id));
export const result = (request, reply) => reply(getResult(request.params.id));
export const createEvent = (request, reply) => reply(create(request.payload)).code(201);
export const addVote = (request, reply) => reply(createVote(request.params.id, request.payload)).code(201);
