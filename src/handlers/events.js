/* global Promise */

import {
  Event,
  Vote,
} from '../model/events';
import { findDatesThatFitAllPeople } from './result-helper';

function handleError(err) { // eslint-disable-next-line no-console
  console.log(err);
  return { error: err };
}

function formatEvent(event) {
  const votes = [];
  event.votes.forEach((eventVote) => {
    const index = votes.findIndex(vote => eventVote.date === vote.date);
    if (index === -1) {
      votes.push({ date: eventVote.date, people: [eventVote.person] });
    } else {
      const vote = votes[index];
      votes[index] = ({ date: vote.date, people: [...vote.people, eventVote.person] });
    }
  });
  return {
    id: event.id,
    name: event.name,
    dates: event.dates,
    votes,
  };
}

function getAll() {
  return Event.findAll({ attributes: ['id', 'name'] })
    .then(event => event)
    .catch(handleError);
}

function findById(id) {
  return Event.findById(
    id,
    {
      attributes: ['id', 'name', 'dates'],
      include: [{
        model: Vote,
        as: 'votes',
        attributes: ['date', 'person'],
      }],
    },
  )
    .then((event) => {
      if (event) {
        return formatEvent(event);
      }
      return 'Not found';
    })
    .catch(handleError);
}

function create(event) {
  return Event.create(event)
    .then(dbEvent => ({ id: dbEvent.id }))
    .catch(handleError);
}

function updateVote(eventId, date, name) {
  return Vote.findOrCreate({ where: { EventId: eventId, date, person: name } });
}

function createVote(eventId, vote) {
  const { name, dates } = vote;

  return Promise.all(dates.map(date => updateVote(eventId, date, name)))
    .then(() => findById(eventId))
    .catch(handleError);
}

function getResult(eventId) {
  return findById(eventId)
    .then((event) => {
      const suitableDates = findDatesThatFitAllPeople(event.votes);

      return {
        id: event.id,
        name: event.name,
        suitableDates,
      };
    })
    .catch(handleError);
}

export const eventList = (request, reply) => reply(getAll());
export const event = (request, reply) => reply(findById(request.params.id));
export const result = (request, reply) => reply(getResult(request.params.id));
export const createEvent = (request, reply) => reply(create(request.payload)).code(201);
export const addVote = (request, reply) => reply(createVote(request.params.id, request.payload))
  .code(201);
