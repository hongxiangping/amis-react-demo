import React from 'react';
import { render } from 'amis';
import { getAmisEnv } from './AmisEnv';

/**
 *
 * @param {*} schema schema配置
 * @param {*} schemaProps 
 * @returns
 */
export function SchemaRender({ schema, schemaProps }) {
  const env = getAmisEnv(schemaProps.locale);
  return (
    <>
      <div className="schema-wrapper">
        {
          render(
            schema,
            {
              ...schemaProps,
              context: {
                // 上下文信息，无论哪层，都可以获取到这个
                amisUser: {
                  id: 1,
                  name: 'AMIS User'
                }
              },
            },
            env
          )
        }
      </div >
    </>
  );
}