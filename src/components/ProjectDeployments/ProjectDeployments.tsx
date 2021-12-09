// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import styles from './ProjectDeployments.module.css';
import { NewDeployment } from '../../models';
import moment from 'moment';
import { Copy } from '..';
import { useTranslation } from 'react-i18next';
import { Table, TableHead, TableBody, TableRow, TableCell } from '../Table';

type Deployment = NewDeployment & { createdAt?: Date };

type Props = {
  deployments: Deployment[];
};

const Row: React.FC<{ deployment: Deployment }> = ({ deployment }) => {
  const createdAt = React.useMemo(
    () => (deployment.createdAt ? moment(deployment.createdAt).fromNow() : 'N/A'),
    [deployment],
  );
  return (
    <TableRow>
      <TableCell>
        <p className={styles.value}>{deployment.version}</p>
      </TableCell>
      <TableCell>
        <div className={styles.deploymentId}>
          <p className={styles.value}>{deployment.deploymentId}</p>
          <Copy value={deployment.deploymentId} className={styles.copy} />
        </div>
      </TableCell>
      <TableCell>
        <p className={styles.value}>{deployment.description}</p>
      </TableCell>
      <TableCell>
        <p className={styles.value}>{createdAt}</p>
      </TableCell>
    </TableRow>
  );
};

const ProjectDeployments: React.FC<Props> = ({ deployments }) => {
  const { t } = useTranslation();
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>{t('deployments.header1')}</TableCell>
          <TableCell>{t('deployments.header2')}</TableCell>
          <TableCell>{t('deployments.header3')}</TableCell>
          <TableCell>{t('deployments.header4')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {deployments.map((indexer, index) => (
          <Row deployment={indexer} key={index} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProjectDeployments;
