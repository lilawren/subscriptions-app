import React, { useState } from 'react';
import './PlanSelector.scss';
import { Dropdown, Loader, Form } from 'semantic-ui-react';

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
  const [seats, setSeats] = useState(currentSeats);

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
          <Form onSubmit={() => onSeatsChange(seats)}>
            <Form.Input
              value={seats}
              onBlur={(e) => {
                onSeatsChange(seats);
              }}
              onChange={(e) =>
                setSeats(
                  isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
                )
              }
            />
          </Form>
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
