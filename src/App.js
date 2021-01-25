import './App.css';
import "./iconos";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


import People from './components/People';


const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache()
});




function App() {




  return (
    <ApolloProvider client={client}>
      <div className="container">
      <div className = "headerRAVN" > Ravn Star Wars Registry</div>

      </div>
      <People  />
    </ApolloProvider>
  );
}

export default App;
