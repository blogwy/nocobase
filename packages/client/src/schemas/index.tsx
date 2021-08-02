import React from 'react';
import { ISchema, observer, Schema, useField } from '@formily/react';
import constate from 'constate';
import { useState } from 'react';
import { createContext } from 'react';

import { extend } from 'umi-request';
import { isVoidField } from '@formily/core';
import { useCookieState, useRequest } from 'ahooks';

export * from '../components/schema-renderer';

export function useDefaultAction() {
  return {
    async run() {},
  };
}

export const request = extend({
  prefix: process.env.API_URL,
  timeout: 1000,
});
console.log('process.env.API_URL', process.env.API_URL);

export async function createOrUpdateCollection(data: any) {
  return await request('collections:createOrUpdate', {
    method: 'post',
    data,
  });
}

export async function createCollectionField(collectionName: string, data: any) {
  return await request(`collections/${collectionName}/fields:create`, {
    method: 'post',
    data,
  });
}

export async function deleteCollection(name) {
  await request('collections:destroy', {
    method: 'post',
    params: {
      filter: {
        name,
      },
    },
  });
}

export async function createSchema(schema: ISchema) {
  if (!schema) {
    return;
  }
  if (!schema['key']) {
    return;
  }
  return await request('ui_schemas:create', {
    method: 'post',
    data: schema.toJSON(),
  });
}

export async function updateSchema(schema: ISchema) {
  if (!schema) {
    return;
  }
  if (!schema['key']) {
    return;
  }
  return await request(`ui_schemas:update/${schema.key}`, {
    method: 'post',
    data: Schema.isSchemaInstance(schema) ? schema.toJSON() : schema,
  });
}

export async function removeSchema(schema: ISchema) {
  if (!schema['key']) {
    return;
  }
  await request('ui_schemas:destroy', {
    method: 'post',
    params: {
      filter: {
        key: schema['key'],
      },
    },
  });
}
