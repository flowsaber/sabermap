import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Graph from "./graph";
import LogsPanel from "./logs"
import TasksPanel from "./tasks"

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{height: "100%"}}
    >
      {value === index && (
        <Box height="100%">
          {children}
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column"
  },
}));

// @ts-ignore
export default function ShowPanel({flow, flowrun}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Box className={classes.root} height="100%">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Graph" {...a11yProps(0)} />
          <Tab label="Tasks" {...a11yProps(1)} />
          <Tab label="Logs" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Graph  flow={flow} flowrun={flowrun}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TasksPanel flow={flow} flowrun={flowrun}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LogsPanel flow={flow} flowrun={flowrun}/>
      </TabPanel>
    </Box>
  );
}
