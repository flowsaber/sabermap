import React, {useState} from 'react';
import './style/App.css';
import Main from "./panel/main"
import Box from "@material-ui/core/Box";
import Header from "./panel/header";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./panel/theme"


function App() {
  const [server, setServer ]= useState("http://127.0.0.1:8000/graphql")
  const client = new ApolloClient({
    uri: server,
    cache: new InMemoryCache()
  })
  return (
    <ThemeProvider theme={theme}>
      <Box className="App" height="100vh">
        <Box height="10vh">
          <Header server={server} setServer={setServer}/>
        </Box>
        <ApolloProvider client={client}>
          <Main/>
        </ApolloProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
