import React from 'react';
import './SubscriptionChangeConfirmationPage.scss';
import { Button } from 'semantic-ui-react';
import SubscriptionView from './SubscriptionView';

function SubscriptionChangeConfirmationPage({
  oldSubscription,
  newSubscription,
  onBackClick,
}) {
  let updatedFields = [];
  for (const key in oldSubscription) {
    if (newSubscription[key] !== oldSubscription[key]) {
      if (key === 'cost') {
        updatedFields.push('price');
      } else {
        updatedFields.push(key);
      }
    }
  }

  return (
    <div className='subscription-change-confirmation-container'>
      <div className='subscriptions'>
        <SubscriptionView
          title='Previous Subscription'
          plan={oldSubscription.name}
          seats={oldSubscription.seats}
          price={oldSubscription.cost}
        />
        <SubscriptionView
          title='Updated Subscription'
          plan={newSubscription.name}
          seats={newSubscription.seats}
          price={newSubscription.cost}
          updatedFields={updatedFields}
        />
      </div>
      <Button className='zd-blue' onClick={onBackClick}>
        Back
      </Button>
    </div>
  );
}

export default SubscriptionChangeConfirmationPage;
