import React from 'react';
import { mount } from 'enzyme';
import PlanSelector from '../components/PlanSelector';

describe('[UNIT] Testing the PlanSelector component', () => {
  let wrapper;

  describe('Initial render', () => {
    let initialProps = {
      currentPlan: 'good',
      currentSeats: 5,
      cost: 50,
    };

    beforeEach(() => {
      wrapper = mount(<PlanSelector {...initialProps} />);
    });

    it('displays the initial currentPlan', () => {
      let dropdown = wrapper.find({ role: 'listbox' }).find({ role: 'alert' });
      expect(dropdown.text()).toEqual('Good');
    });

    it('displays the initial currentSeats', () => {
      expect(wrapper.find('input').instance().value).toEqual(
        initialProps.currentSeats.toString()
      );
    });

    it('displays the initial cost', () => {
      expect(
        wrapper.find('.plan-selector').contains(`$${initialProps.cost}`)
      ).toEqual(true);
    });
  });

  describe('Loading render', () => {
    it('should display the loader when isLoadingCost is true', () => {});
  });
});
