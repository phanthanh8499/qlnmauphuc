
import './../css/App.css';
import { Backdrop, CircularProgress } from "@mui/material";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Suspense } from 'react';
import RouteList from '../routers/RouterList';
import { routes } from "./../routers/Routers";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    background: "#fff",
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Switch>
        <Suspense
          fallback={
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="primary" />
            </Backdrop>
          }
        >
          <RouteList routes={routes} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
