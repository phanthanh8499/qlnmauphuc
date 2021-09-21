import React, { Fragment } from "react";
import { Route } from "react-router-dom";

const RouteList = (props) => {
  return (
    <Fragment>
      {props.routes.map(
        ({ component: Component, path, isPrivate, ...rest }) => {
          return (
            <Fragment key={path}>
                <Route component={Component} path={path} {...rest} />    
            </Fragment>
          );
        }
      )}
    </Fragment>
  );
};

export default RouteList;
