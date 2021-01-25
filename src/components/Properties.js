import React , {useState} from 'react';
import './people.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Properties({node}){

  if(node != null){
  return(
    <div className = "properties ">

      <div className = "tituloPro">General Information</div>
      <div className = "character">
        <div className = "datapro"> Eye Color </div>

        <div className = "dataproV">{capitalizeFirstLetter(node.eyeColor)}</div>
      </div>
      <div className = "character">
        <div className = "datapro"> Hair Color </div>
        <div className = "dataproV"> {capitalizeFirstLetter(node.hairColor)} </div>
      </div>
      <div className = "character">
        <div className = "datapro"> Skin Color </div>
        <div className = "dataproV"> {capitalizeFirstLetter(node.skinColor)} </div>
      </div>

      <div className = "character">
        <div className = "datapro"> Birth Year </div>
        <div className = "dataproV"> {capitalizeFirstLetter(node.birthYear)} </div>
      </div>

      <div className = "tituloPro" > Vehicles </div>

      <div >
         {node.vehicleConnection.edges.map(Vehicle => (

           <div className = "character2 " key = {Vehicle.node.id}  >
              <div className = "datapro">{Vehicle.node.name}</div>

           </div>


         ))}

      </div>



    </div>
  )}else{return(<div></div>)}
}

export default Properties;
