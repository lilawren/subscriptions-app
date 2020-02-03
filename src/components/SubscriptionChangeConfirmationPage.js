import React from 'react';
import './SubscriptionChangeConfirmationPage.scss';
import { Button } from 'semantic-ui-react';
import SubscriptionView from './SubscriptionView';

function SubscriptionChangeConfirmationPage({ onBackClick }) {
  return (
    <div className='subscription-change-confirmation-container'>
      <div className='subscriptions'>
        <SubscriptionView
          title='Previous Subscription'
          plan='Better'
          seats='3'
          price='$300'
        />
        <SubscriptionView
          title='Updated Subscription'
          plan='Better'
          seats='4'
          price='$200'
          updatedFields={['Seats', 'Price']}
        />
      </div>
      <Button className='zd-blue' onClick={onBackClick}>
        Back
      </Button>
    </div>
  );
}

export default SubscriptionChangeConfirmationPage;
