// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Spinner, Typography } from '@subql/react-ui';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { DeploymentMeta, EmptyList } from '@components';
import { useWeb3 } from '@containers';
import { mapAsync, notEmpty, renderAsyncArray } from '@utils';
import styles from './Specific.module.css';
import { useGetSpecificPlansQuery } from '@subql/react-hooks';
import List from '../List';
import { SUB_PLANS } from '@containers/IndexerRegistryProjectSub';

const Specific: React.FC = () => {
  const { t } = useTranslation();
  const { account } = useWeb3();

  // TODO find a way to query indexed projects that only have plans
  const specificPlans = useGetSpecificPlansQuery({ variables: { address: account ?? '' } });

  specificPlans.subscribeToMore({
    document: SUB_PLANS,
    updateQuery: (prev, { subscriptionData }) => {
      if (subscriptionData.data) {
        specificPlans.refetch();
      }
      return prev;
    },
  });

  return (
    <div className={'contentContainer'}>
      {renderAsyncArray(
        mapAsync(
          (d) =>
            d.deploymentIndexers?.nodes
              .filter(notEmpty)
              .map((d) => d.deployment)
              .filter((d) => d?.plans.nodes.filter(notEmpty).length), // Filter out indexed projects that have 0 plans
          specificPlans,
        ),
        {
          loading: () => <Spinner />,
          error: (e) => <Typography>{`Failed to load specific plans: ${e}`}</Typography>,
          empty: () => (
            <EmptyList
              title={t('indexerPlans.title')}
              description={t('indexerPlans.description')}
              infoI18nKey={'indexerPlans.learnMore'}
            />
          ),
          data: (deployments) => {
            return (
              <>
                <Typography variant="h6">{t('plans.specific.title')}</Typography>
                <div className={styles.plans}>
                  {deployments.map((deployment) => {
                    if (!deployment) return null;
                    const plans = deployment?.plans.nodes.filter(notEmpty);
                    return (
                      <div key={deployment.id} className={styles.plan}>
                        <div className={styles.header}>
                          <DeploymentMeta deploymentId={deployment.id} projectMetadata={deployment.project?.metadata} />
                        </div>

                        {plans ? (
                          <List data={plans} onRefresh={specificPlans.refetch} />
                        ) : (
                          <Typography>{t('plans.specific.nonDeployment')}</Typography>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            );
          },
        },
      )}
    </div>
  );
};

export default Specific;
