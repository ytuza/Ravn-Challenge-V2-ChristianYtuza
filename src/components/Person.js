import React , {useState} from 'react';

import { useQuery, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './person.css';



const PERSON_FRAGMENT = gql`
  fragment PersonFragment on PeopleConnection {
    edges{
      node{
        id
        name
        eyeColor
        hairColor
        skinColor
        birthYear

        vehicleConnection{
          edges{
            node{
              id
              name
            }
          }
        }

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


function Specie({Person}){
  const isHuman = Person.node.species;

  if(!isHuman){
    return(<div className = "specie" >Human from {Person.node.homeworld.name} </div>)
  }else{
    return(<div className = "specie">{Person.node.species.name} from {Person.node.homeworld.name}</div>)
  }
}


function Person({func, allPeople}){

  return (
    <div >
       {allPeople.edges.map(Person => (
         <div className = "person" key = {Person.node.id}  >
            <div className = "name">{Person.node.name}</div>
            <Specie Person = {Person}/>
            <FontAwesomeIcon icon="chevron-right" className= "arrow button" onClick={()=>{
              func(Person);
            }
            }/>

         </div>

       ))}

    </div>
  );
}

Person.fragments = {
  PeopleConnection: PERSON_FRAGMENT
};

export {Person};
