import React from 'react';
import './PlanSelector.scss';
import { Dropdown, Input, Loader } from 'semantic-ui-react';

const planOptions = ['Basic', 'Good', 'Better', 'Best'].map((option) => ({
  value: option.toLowerCase(),
  text: option,
}));

function PlanSelector({
  currentPlan,
  currentSeats,
  cost,
  onPlanChange,
  onSeatsChange,
  isLoadingCost,
}) {
  return (
    <div className='plan-selector-container'>
      <div className='plan-selector'>
        <div>
          <Dropdown
            options={planOptions}
            fluid
            selection
            value={currentPlan}
            onChange={(e, { value }) => {
              onPlanChange(value);
            }}
          />
          <div className='quiet'>Plan</div>
        </div>
        <div>
          <Input
            defaultValue={currentSeats}
            onBlur={(e) => {
              onSeatsChange(parseInt(e.target.value));
            }}
          />
          <div className='quiet'>Seats</div>
        </div>
        <div>
          {isLoadingCost ? <Loader inline active /> : <>{`$${cost}`}</>}
          <div className='quiet'>Price</div>
        </div>
      </div>
    </div>
  );
}

export default PlanSelector;
