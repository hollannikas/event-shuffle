/* global describe, it */

import { expect } from 'chai';
import { extractPeopleFromVotes } from "../handlers/result-helper";

describe('result helper', () => {
    describe('extractPeopleFromVotes', () => {
        it('should return no people, if there are no votes', () => {
            const votes = [];
            const length = extractPeopleFromVotes(votes).length;
            expect(length).to.equal(0);
        });

        it('should extract all people from one vote', () => {
            const votes = [ {date: '', people: ['bob', 'elsa']}];
            const people = extractPeopleFromVotes(votes);
            expect(people.length).to.equal(2);
            expect(people).to.include('bob');
        });
    });
});