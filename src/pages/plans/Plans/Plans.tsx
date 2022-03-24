// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Typography } from '@subql/react-ui';
import clsx from 'clsx';
import * as React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { AppPageHeader } from '../../../components';
import Default from './Default';
import Create from './Create';
import Specific from './Specific';
import { useTranslation } from 'react-i18next';

const ROUTE = '/plans/plans';
const DEFAULT_PLANS = `${ROUTE}/default`;
const SPECIFIC_PLANS = `${ROUTE}/specific`;

export const Plans: React.VFC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <AppPageHeader title={t('plans.category.manageMyPlans')} />

      <div className="tabContainer">
        <NavLink to={DEFAULT_PLANS} className={(isActive) => clsx('tab', isActive && 'tabSelected')} replace>
          <Typography>{'Default'}</Typography>
        </NavLink>
        <NavLink to={SPECIFIC_PLANS} className={(isActive) => clsx('tab', isActive && 'tabSelected')} replace>
          <Typography>{'Specific'}</Typography>
        </NavLink>
      </div>
      <Create />
      <div className="content-width">
        <Switch>
          <Route exact path={DEFAULT_PLANS} component={Default} />
          <Route exact path={SPECIFIC_PLANS} component={Specific} />
          <Redirect from={ROUTE} to={DEFAULT_PLANS} />
        </Switch>
      </div>
    </div>
  );
};
