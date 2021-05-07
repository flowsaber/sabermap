import React from "react";
import Box from "@material-ui/core/Box";
import {useQuery} from '@apollo/client'
import {GET_RUNLOGS} from "../graphql";


import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {DataGrid, GridCellParams, GridColDef, GridToolbar, isOverflown,} from '@material-ui/data-grid';

interface GridCellExpandProps {
  value: string;
  width: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: 'center',
      lineHeight: '24px',
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      '& .cellValue': {
        whiteSpace: 'nowrap',
        overflow: 'auto',
        textOverflow: 'ellipsis',
      },
    },
  }),
);

const GridCellExpand = React.memo(function GridCellExpand(
  props: GridCellExpandProps,
) {
  const {width, value} = props;
  const wrapper = React.useRef<HTMLDivElement | null>(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);
  
  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current!);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };
  
  const handleMouseLeave = () => {
    setShowFullCell(false);
  };
  
  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }
    
    function handleKeyDown(nativeEvent: KeyboardEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);
  
  return (
    <div
      ref={wrapper}
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cellDiv}
        style={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <div ref={cellValue} className="cellValue">
        {value}
      </div>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{width, marginLeft: -17}}
        >
          <Paper
            elevation={1}
            style={{minHeight: wrapper.current!.offsetHeight - 3}}
          >
            <Typography variant="body2" style={{padding: 8, overflowWrap: "anywhere"}}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </div>
  );
});

function renderCellExpand(params: GridCellParams) {
  return (
    <GridCellExpand
      value={params.value ? params.value.toString() : ''}
      width={400}
    />
  );
}


const columns: GridColDef[] = [
  {field: 'level', headerName: "Level"},
  {field: 'message', headerName: "Message", flex: 1, renderCell: renderCellExpand},
  {field: 'time', headerName: "Time", type: "number"},
  {field: 'id', headerName: "ID"},
  {field: 'task_id', headerName: "TaskID", hide: true},
  {field: 'flow_id', headerName: "FlowID", hide: true},
  {field: 'taskrun_id', headerName: "TaskRunID", hide: true},
  {field: 'flowrun_id', headerName: "FlowRunID", hide: true},
  {field: 'agent_id', headerName: "AgentID", hide: true},
]


function Filter() {
  return (
    <Paper>
      Logs filter
    </Paper>
  )
}

// @ts-ignore
function LogsPanel({flow, flowrun}) {
  const {loading, error, data} = useQuery(GET_RUNLOGS, {
    variables: {
      input: {
        flowrun_id: flowrun ? [flowrun.id] : ["NoSuchId"],
      },
    },
  });
  
  return (
    <Box height="100%">
      <Filter/>
      <Box height="80%" style={{overflow: "auto"}}>
        <DataGrid
          rows={loading ? [] : data.get_runlogs}
          columns={columns}
          autoHeight={true}
          loading={true}
          components={{
            Toolbar: GridToolbar
          }}
        />
      </Box>
    </Box>
  )
}

export default LogsPanel;