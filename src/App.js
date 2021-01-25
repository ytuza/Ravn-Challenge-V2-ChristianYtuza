import './App.css';

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
      <h1>Ravn Star Wars Registry</h1>
      </div>
      <People/>
    </ApolloProvider>
  );
}

export default App;
