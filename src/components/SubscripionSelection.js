import React, { useEffect, useState } from "react";
import "./SubscriptionSelection.scss";
import { Button, Loader } from "semantic-ui-react";
import PlanSelector from "../components/PlanSelector";
import axios from "axios";

function SubscriptionSelection({ onUpdateClick }) {
  const [subscriptionData, setSubscriptionData] = useState({});
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");
  const [cost, setCost] = useState("");

  async function getCurrentSubscription() {
    try {
      const res = await axios.get("http://localhost:5000/api/current");
      const { data } = res;
      setSubscriptionData(data);
      setSelectedPlan(data.plan);
      setSelectedSeats(data.seats);
      setCost(data.cost);
      setIsLoadingSubscription(false);
    } catch (e) {
      console.log(e);
    }
  }
  async function getSubscriptionPreview() {
    setIsLoadingPreview(true);
    try {
      const res = await axios.get("http://localhost:5000/api/preview", {
        params: {
          plan: selectedPlan,
          seats: selectedSeats
        }
      });
      setIsLoadingPreview(false);
      const { data } = res;
      setCost(data.cost);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCurrentSubscription();
  }, []);

  useEffect(() => {
    if (!isLoadingSubscription) {
      getSubscriptionPreview();
    }
  }, [selectedPlan, selectedSeats]);

  return (
    <div className="subscription-selection-container">
      {isLoadingSubscription ? (
        <Loader active />
      ) : (
        <>
          <PlanSelector
            currentPlan={selectedPlan}
            currentSeats={selectedSeats}
            cost={cost}
            onPlanChange={val => {
              setSelectedPlan(val);
            }}
            onSeatsChange={val => {
              setSelectedSeats(val);
            }}
            isLoadingCost={isLoadingPreview}
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
