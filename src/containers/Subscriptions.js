import React, { useState, useEffect } from "react";
import "./Subscriptions.scss";
import SubscriptionSelection from "../components/SubscripionSelection";
import SubscriptionChangeConfirmationPage from "../components/SubscriptionChangeConfirmationPage";
import axios from "axios";
import { Loader } from "semantic-ui-react";

const subscriptionViewState = {
  SUBSCRIPTION_SELECTION: "SUBSCRIPTION_SELECTION",
  SUBSCRIPTION_CHANGE_CONFIRMATION: "SUBSCRIPTION_CHANGE_CONFIRMATION"
};

function Subscriptions() {
  const [currentView, setCurrentView] = useState(
    subscriptionViewState.SUBSCRIPTION_SELECTION
  );

  const [
    isLoadingUpdateSubscription,
    setIsLoadingUpdateSubscription
  ] = useState(false);

  const [subscriptionData, setSubscriptionData] = useState({});
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
  const [subscriptionPreviewData, setSubscriptionPreviewData] = useState({});

  useEffect(() => {
    if (currentView === subscriptionViewState.SUBSCRIPTION_SELECTION) {
      getCurrentSubscription();
    }
  }, [currentView]);

  async function getCurrentSubscription() {
    try {
      const res = await axios.get("http://localhost:5000/api/current");
      const { data } = res;
      setSubscriptionData(data);
      setIsLoadingSubscription(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function onUpdateSubscriptionClick({
    plan,
    seats,
    subscriptionPreviewData
  }) {
    setIsLoadingUpdateSubscription(true);
    try {
      await axios.put("http://localhost:5000/api/current", {
        plan,
        seats
      });
      setIsLoadingUpdateSubscription(false);
      setSubscriptionPreviewData(subscriptionPreviewData);
      setCurrentView(subscriptionViewState.SUBSCRIPTION_CHANGE_CONFIRMATION);
    } catch (e) {
      console.log(e);
    }
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case subscriptionViewState.SUBSCRIPTION_SELECTION:
        return (
          <div>
            <h1>Subscriptions</h1>
            {isLoadingUpdateSubscription || isLoadingSubscription ? (
              <Loader active />
            ) : (
              <SubscriptionSelection
                subscriptionData={subscriptionData}
                onUpdateSubscriptionClick={payload =>
                  onUpdateSubscriptionClick(payload)
                }
              />
            )}
          </div>
        );
      case subscriptionViewState.SUBSCRIPTION_CHANGE_CONFIRMATION:
        return (
          <SubscriptionChangeConfirmationPage
            oldSubscription={subscriptionData}
            newSubscription={subscriptionPreviewData}
            onBackClick={() =>
              setCurrentView(subscriptionViewState.SUBSCRIPTION_SELECTION)
            }
          />
        );
      default:
        throw new Error("Unknown case: ", currentView);
    }
  };

  return <div className="subscriptions-container">{renderCurrentView()}</div>;
}

export default Subscriptions;
