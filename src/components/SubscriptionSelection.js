import React, { useEffect, useState } from 'react';
import * as classNames from 'classnames';

import './SubscriptionSelection.scss';
import { Button } from 'semantic-ui-react';
import PlanSelector from './PlanSelector';
import axios from 'axios';

function SubscriptionSelection({
  subscriptionData,
  onUpdateSubscriptionClick,
}) {
  const [subscriptionPreviewData, setSubscriptionPreviewData] = useState({});
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(subscriptionData.plan);
  const [selectedSeats, setSelectedSeats] = useState(subscriptionData.seats);
  const [cost, setCost] = useState(subscriptionData.cost);

  const hasPlanOrSeatsChanged =
    subscriptionData.plan !== selectedPlan ||
    subscriptionData.seats !== selectedSeats;

  useEffect(() => {
    if (hasPlanOrSeatsChanged) {
      getSubscriptionPreview();
    }
  }, [selectedPlan, selectedSeats, hasPlanOrSeatsChanged]);

  async function getSubscriptionPreview() {
    setIsLoadingPreview(true);
    try {
      const res = await axios.get('http://localhost:5000/api/preview', {
        params: {
          plan: selectedPlan,
          seats: selectedSeats,
        },
      });
      setIsLoadingPreview(false);
      const { data } = res;
      setSubscriptionPreviewData(data);
      setCost(data.cost);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='subscription-selection-container'>
      <PlanSelector
        currentPlan={selectedPlan}
        currentSeats={selectedSeats}
        cost={cost}
        onPlanChange={(val) => {
          setSelectedPlan(val);
        }}
        onSeatsChange={(val) => {
          setSelectedSeats(val);
        }}
        isLoadingCost={isLoadingPreview}
      />

      <div className='update-sub-button'>
        <Button
          disabled={!hasPlanOrSeatsChanged || isLoadingPreview}
          floated='right'
          className={classNames({ 'zd-blue': hasPlanOrSeatsChanged })}
          onClick={() =>
            onUpdateSubscriptionClick({
              plan: selectedPlan,
              seats: selectedSeats,
              subscriptionPreviewData,
            })
          }
        >
          Update Subscription
        </Button>
      </div>
    </div>
  );
}

export default SubscriptionSelection;
