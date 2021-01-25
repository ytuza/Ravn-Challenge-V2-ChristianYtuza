import './people.css';

import React, {Component} from 'react'

import { useQuery, gql } from '@apollo/client';
import {Person} from "./Person";
import {filter} from "graphql-anywhere";
import {Waypoint} from 'react-waypoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const PEOPLE_QUERY = gql`
  query peopleQuery( $after : String){
    allPeople(first: 5 after: $after){
      totalCount
      ...PersonFragment
      pageInfo{
        endCursor
        hasNextPage
      }
    }
  }
  ${Person.fragments.PeopleConnection}

`;


function People() {
  const { loading, error, data, fetchMore } = useQuery(PEOPLE_QUERY, {
    variables: { after: null }
  });

  if (loading) return <div className = "Loading">
    <FontAwesomeIcon icon= "spinner" spin = {true}/> <div className = "loadtext">Loading</div>
  </div>;
  if (error){
    console.log(error);
    return <div className = "failed">Failed to Load Data</div>;
  }
  //console.log(data);
  return (
    <div className = "listPeople">
      <Person allPeople = {filter(Person.fragments.PeopleConnection, data.allPeople)}/>
      <Waypoint bottomOffset  = "5%" onEnter={()=>{
        console.log("paltas2");
        if(data.allPeople.pageInfo.hasNextPage){
          const {endCursor} = data.allPeople.pageInfo;
          fetchMore({
            variables: {after: endCursor},
            updateQuery:(prevResult, {fetchMoreResult}) => {
              fetchMoreResult.allPeople.edges = [...prevResult.allPeople.edges,
              ...fetchMoreResult.allPeople.edges];
              return fetchMoreResult;
            }

          })
        }else{
          console.log("Ya no hay mas");
        }

      }}>
        <div className = "Loading">
           <FontAwesomeIcon className = "mx-3" icon= "spinner" spin = {true}/><div className = "loadtext">Loading</div>
        </div>
      </Waypoint>

    </div>
  )
}

export default People;
