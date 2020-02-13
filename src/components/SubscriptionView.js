import React from 'react';
import classNames from 'classnames';
import './SubscriptionView.scss';

// updatedFields is an array of fields that were updated
function SubscriptionView({ title, plan, seats, price, updatedFields }) {
  const renderSubscriptionViewRow = ({ title, value }) => {
    return (
      <>
        <span className='quiet'>{title}</span>
        <span
          className={classNames('bold', {
            updated:
              updatedFields &&
              updatedFields.indexOf(title.toLowerCase()) !== -1,
          })}
        >
          {value}
        </span>
      </>
    );
  };

  return (
    <div className='subscription-view'>
      <h4>{title}</h4>
      <div className='details'>
        {renderSubscriptionViewRow({
          title: 'Plan',
          value: plan,
        })}
        {renderSubscriptionViewRow({
          title: 'Seats',
          value: seats,
        })}
        {renderSubscriptionViewRow({
          title: 'Price',
          value: `$${price}`,
        })}
      </div>
    </div>
  );
}

export default SubscriptionView;
