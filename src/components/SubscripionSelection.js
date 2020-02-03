import React, { useEffect, useState } from "react";
import * as classNames from "classnames";

import "./SubscriptionSelection.scss";
import { Button } from "semantic-ui-react";
import PlanSelector from "../components/PlanSelector";
import axios from "axios";

function SubscriptionSelection({
  subscriptionData,
  onUpdateSubscriptionClick
}) {
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");
  const [cost, setCost] = useState("");

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
    setSelectedPlan(subscriptionData.plan);
    setSelectedSeats(subscriptionData.seats);
    setCost(subscriptionData.cost);
  }, []);

  useEffect(() => {
    getSubscriptionPreview();
  }, [selectedPlan, selectedSeats]);

  const hasPlanOrSeatsChanged =
    subscriptionData.plan !== selectedPlan ||
    subscriptionData.seats !== selectedSeats;

  return (
    <div className="subscription-selection-container">
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
        <Button
          disabled={!hasPlanOrSeatsChanged}
          floated="right"
          className={classNames({ "zd-blue": hasPlanOrSeatsChanged })}
          onClick={() =>
            onUpdateSubscriptionClick({
              plan: selectedPlan,
              seats: selectedSeats
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
