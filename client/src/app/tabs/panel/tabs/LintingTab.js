/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import React from 'react';

import Panel from '../Panel';

import css from './LintingTab.less';

import ErrorIcon from '../../../../../resources/icons/Error.svg';


export default function LintingTab(props) {
  const {
    layout,
    linting,
    onAction,
    onLayoutChanged
  } = props;

  const onClick = ({ id, path }) => () => {
    onAction('selectElement', {
      id,
      path
    });
  };

  return <Panel.Tab
    id="linting"
    label="Errors"
    layout={ layout }
    number={ linting.length }
    onLayoutChanged={ onLayoutChanged }
    priority={ 1 }>
    { linting.length ? null : <span className={ css.LintingIssue }>No errors.</span> }
    {
      linting.map((issue => {
        return <LintingIssue
          key={ issue.id }
          issue={ issue }
          onClick={ onClick(issue) } />;
      }))
    }
  </Panel.Tab>;
}

function LintingIssue(props) {
  const {
    issue,
    onClick
  } = props;

  const {
    id,
    label,
    message
  } = issue;

  return <div className={ css.LintingIssue }>
    <ErrorIcon /> Error : <span className="linting-issue_link" onClick={ onClick }>{ label || id }</span> - { message }
  </div>;
}