import React, { useState } from "react";
import "./PlanSelector.scss";
import { Dropdown, Input } from "semantic-ui-react";

const planOptions = ["Basic", "Good", "Better", "Best"].map(option => ({
  value: option.toLowerCase(),
  text: option
}));

function PlanSelector({
  currentPlan,
  currentSeats,
  cost,
  onPlanChange,
  onSeatsChange
}) {
  return (
    <div className="plan-selector-container">
      <div className="plan-selector">
        <div>
          <Dropdown
            options={planOptions}
            fluid
            selection
            defaultValue={currentPlan}
            onChange={(e, { value }) => {
              onPlanChange(value);
            }}
          />
          <div className="quiet">Plan</div>
        </div>
        <div>
          <Input
            defaultValue={currentSeats}
            onBlur={e => {
              onSeatsChange(e.target.value);
            }}
          />
          <div className="quiet">Seats</div>
        </div>
        <div>
          {`$${cost}`}
          <div className="quiet">Price</div>
        </div>
      </div>
    </div>
  );
}

export default PlanSelector;
