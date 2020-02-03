import React from 'react';
import './SubscriptionSelection.scss';
import { Button } from 'semantic-ui-react';
import PlanSelector from '../components/PlanSelector';

function SubscriptionSelection({ onUpdateClick }) {
  return (
    <div className='subscription-selection-container'>
      <PlanSelector />
      <div className='update-sub-button'>
        <Button floated='right' onClick={onUpdateClick}>
          Update Subscription
        </Button>
      </div>
    </div>
  );
}

export default SubscriptionSelection;
