/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { isString } from 'min-dash';


export default class FormLinter {
  static lint(contents) {
    let schema;

    if (isString(contents)) {
      schema = JSON.parse(contents);
    } else {
      schema = contents;
    }

    const {
      executionPlatform,
      executionPlatformVersion
    } = schema;

    if (!executionPlatform) {
      return null;
    }

    const types = [
      'button',
      'default',
      'textfield'
    ];

    if ((executionPlatform === 'Camunda Platform' && executionPlatformVersion === '7.16')
      || (executionPlatform === 'Camunda Cloud' && executionPlatformVersion === '1.1')) {
      types.push(
        'checkbox',
        'number',
        'radio',
        'select',
        'text'
      );
    }

    return schema.components.reduce((results, formField) => {
      const {
        id,
        type
      } = formField;

      if (!types.includes(type)) {
        results.push({
          id: id,
          message: `Form field of type <${ type }> not supported in ${ executionPlatform } ${ executionPlatformVersion }.`
        });
      } else if (formField.values && !formField.values.length) {
        results.push({
          id: id,
          path: [ 'values' ],
          message: `Form field of type <${ type }> has no configured values.`
        });
      }

      return results;
    }, []);
  }
}