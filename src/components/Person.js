import React from 'react';
import { useQuery, gql } from '@apollo/client';

const PERSON_FRAGMENT = gql`
  fragment PersonFragment on PeopleConnection {
    edges{
      node{
        id
        name
        gender
        species {
          name
        }
        homeworld {
          name
        }
      }
    }
  }
`;


function Person({allPeople}){
  return (
    <ul>
       {allPeople.edges.map(Person => (
         <li key = {Person.node.id}>
            {Person.node.id}
         </li>
       ))}

    </ul>
  );
}

Person.fragments = {
  PeopleConnection: PERSON_FRAGMENT
};

export {Person};
