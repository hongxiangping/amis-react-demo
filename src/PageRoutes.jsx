import React from 'react';
import { Route } from 'react-router-dom';
import { eachTree } from 'amis-core';
import { SchemaRender } from './SchemaRender';
import { getContextPath } from './App';
import { navigations } from './Navigations';

export function getRoutes(schemaProps) {
  let routes = [];
  let ContextPath = getContextPath();
  navigations.forEach((root) => {
    root.children &&
      eachTree(root.children, (item) => {
        if (item.path && item.component) {
          routes.push(
            <Route
              key={routes.length + 1}
              path={
                item.path[0] === '/'
                  ? ContextPath + item.path
                  : `${ContextPath}/${item.path}`
              }
              element={<SchemaRender schema={item.component} schemaProps={schemaProps} />}
            />
          );
        }
      });
  });
  console.log(routes);
  return routes;
}

