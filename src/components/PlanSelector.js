import React, { useState } from 'react';
import './PlanSelector.scss';
import { Dropdown, Input } from 'semantic-ui-react';

const planOptions = ['Basic', 'Good', 'Better', 'Best'].map((option) => ({
  value: option,
  text: option,
}));

function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState(planOptions[0].value);

  return (
    <div className='plan-selector-container'>
      <div className='plan-selector'>
        <div>
          <Dropdown
            options={planOptions}
            fluid
            selection
            value={selectedPlan}
            onChange={(e, { value }) => {
              setSelectedPlan(value);
            }}
          />
          <div className='quiet'>Plan</div>
        </div>
        <div>
          <Input defaultValue={1} />
          <div className='quiet'>Seats</div>
        </div>
        <div>
          $1000
          <div className='quiet'>Price</div>
        </div>
      </div>
    </div>
  );
}

export default PlanSelector;
