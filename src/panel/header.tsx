import React, {useState} from "react";
import Box from "@material-ui/core/Box"
import {createStyles, Divider, makeStyles, Theme} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton"
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';


const useServerChooserStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 200,
      flexDirection: "row",
      zIndex: 999999999999
    },
    input: {
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
)


const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
    }
  })
)


// @ts-ignore
function ServerChooser({server, setServer}) {
  const classes = useServerChooserStyles()
  const [inputServer, setInputServer] = useState(server)
  
  
  const onChangeHandler = (e: any) => {
    setInputServer(e.target.value)
  }
  
  const onClickHandler = () => {
    setServer(inputServer)
  }
  
  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton}>
        <MenuIcon/>
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Server address"
        defaultValue={server}
        onChange={onChangeHandler}
      />
      <Divider className={classes.divider} orientation="vertical"/>
      <IconButton color="primary" className={classes.iconButton} onClick={onClickHandler}>
        <CenterFocusStrongIcon/>
      </IconButton>
    </Paper>
  )
}

// @ts-ignore
function Header({server, setServer}) {
  const classes = useHeaderStyles()
  return (
    <Box className={classes.root}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Flowsaber
          </Typography>
          <ServerChooser server={server} setServer={setServer}/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header