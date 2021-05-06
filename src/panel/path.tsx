import React from "react";
import {emphasize, withStyles} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';


const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip) as typeof Chip;


function Path(props: { pathList: any, onClick: any}) {
  const {pathList, onClick} = props
  
  
  return (
    <Breadcrumbs>
      {pathList.map((path: any) =>
        <StyledBreadcrumb
          key={path.label}
          component="a"
          href={path.link}
          label={path.label}
          icon={path.icon}
          onClick={onClick(path.label)}
        />
      )}
    </Breadcrumbs>
  )
}


export default Path;