import React, {Component} from 'react'

import { useQuery, gql } from '@apollo/client';
import {Person} from "./Person";
import {filter} from "graphql-anywhere";

const PEOPLE_QUERY = gql`
  query peopleQuery( $after : String){
    allPeople(first: 30 after: $after){
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

  if (loading) return <p>Loading...</p>;
  if (error){
    console.log(error);
    return <p>Error :(</p>;
  }
  //console.log(data);
  return (
    <div>
      <Person allPeople = {filter(Person.fragments.PeopleConnection, data.allPeople)}/>
      <button onClick={()=>{
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

      }
      }>
        more
      </button>
    </div>
  )
}

export default People;
