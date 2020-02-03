import React, { useEffect, useState } from "react";
import "./SubscriptionSelection.scss";
import { Button, Loader } from "semantic-ui-react";
import PlanSelector from "../components/PlanSelector";

function SubscriptionSelection({ onUpdateClick }) {
  const [subscriptionData, setSubscriptionData] = useState({});
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");

  async function getCurrentSubscription() {
    try {
      const res = await fetch("http://localhost:5000/api/current");
      console.log({ res });
      const data = await res.json();
      setSubscriptionData(data);
      setSelectedPlan(data.plan);
      setSelectedSeats(data.seats);
      setIsLoadingSubscription(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCurrentSubscription();
  }, []);

  return (
    <div className="subscription-selection-container">
      {isLoadingSubscription ? (
        <Loader active />
      ) : (
        <>
          <PlanSelector
            currentPlan={selectedPlan}
            currentSeats={selectedSeats}
            cost={subscriptionData.cost}
            onPlanChange={val => {
              setSelectedPlan(val);
            }}
            onSeatsChange={val => {
              setSelectedSeats(val);
            }}
          />

          {JSON.stringify(subscriptionData)}
          <div className="update-sub-button">
            <Button floated="right" onClick={onUpdateClick}>
              Update Subscription
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default SubscriptionSelection;
