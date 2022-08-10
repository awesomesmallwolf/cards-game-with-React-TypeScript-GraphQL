import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Stage from './pages/Stage';
import styles from './App.module.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App(): React.ReactElement {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <section className={styles.body}>
          <Routes>
            <Route path="/" element={<Stage />} />
          </Routes>
        </section>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
