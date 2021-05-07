import React from "react";
import {useState} from "react";
import Box from '@material-ui/core/Box';
import SplitPane from "react-split-pane";

import Header from "./header";
import Path from "./path";
import ShowPanel from "./show/show"
import "../style/resizer.css"
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Flows from "./flows"


import {ApolloClient, InMemoryCache, ApolloProvider, useQuery} from '@apollo/client';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {GET_FLOWS} from "./graphql";

const DUMMY_FLOWS = Array(15).fill(null)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panel: {
      height: "100%",
      width: "100%"
    }
  })
);


function Main() {
  const classes = useStyles()
  
  
  const {loading, error, data} = useQuery(GET_FLOWS, {
    variables: {
      input: {},
    },
    // pollInterval: 5000,
  });
  
  
  
  return (
      <Box height="100%" width="100%">
        <Flows flows={(loading || error) ? DUMMY_FLOWS : data.get_flows}/>
      </Box>
      
  )
}

export default Main

