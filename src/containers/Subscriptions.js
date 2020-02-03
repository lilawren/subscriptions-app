import React, { useState } from 'react';
import './Subscriptions.scss';
import SubscriptionSelection from '../components/SubscripionSelection';
import SubscriptionChangeConfirmationPage from '../components/SubscriptionChangeConfirmationPage';

const subscriptionViewState = {
  SUBSCRIPTION_SELECTION: 'SUBSCRIPTION_SELECTION',
  SUBSCRIPTION_CHANGE_CONFIRMATION: 'SUBSCRIPTION_CHANGE_CONFIRMATION',
};

function Subscriptions() {
  const [currentView, setCurrentView] = useState(
    subscriptionViewState.SUBSCRIPTION_SELECTION
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case subscriptionViewState.SUBSCRIPTION_SELECTION:
        return (
          <div>
            <h1>Subscriptions</h1>
            <SubscriptionSelection
              onUpdateClick={() =>
                setCurrentView(
                  subscriptionViewState.SUBSCRIPTION_CHANGE_CONFIRMATION
                )
              }
            />
          </div>
        );
      case subscriptionViewState.SUBSCRIPTION_CHANGE_CONFIRMATION:
        return (
          <SubscriptionChangeConfirmationPage
            onBackClick={() =>
              setCurrentView(subscriptionViewState.SUBSCRIPTION_SELECTION)
            }
          />
        );
      default:
        throw new Error('Unknown case: ', currentView);
    }
  };

  return <div className='subscriptions-container'>{renderCurrentView()}</div>;
}

export default Subscriptions;
