export function findDatesThatFitAllPeople(votes) {
    const people = extractPeopleFromVotes(votes);
    // all people have voted = the amount of voters === the amount of people
    return votes
        .filter(vote => vote.people.length === people.length)
        .map(vote => {
            return { date: vote.date, people: people }
        });
}

export function extractPeopleFromVotes(votes) {
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