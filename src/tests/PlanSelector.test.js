import React from 'react';
import { mount } from 'enzyme';
import PlanSelector from '../components/PlanSelector';

describe('[UNIT] Testing the PlanSelector component', () => {
  let initialProps = {
    currentPlan: 'good',
    currentSeats: 5,
    cost: 50,
  };

  let wrapper;

  describe('Initial render', () => {
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

  describe('Loading spinner', () => {
    beforeEach(() => {
      wrapper = mount(
        <PlanSelector
          {...{
            ...initialProps,
            isLoadingCost: true,
          }}
        />
      );
    });

    it('should display the loader when isLoadingCost is true', () => {
      expect(wrapper.find('div.ui.active.inline.loader').exists());
    });
  });

  describe('Trigger plan cost recalculation', () => {
    let baseProps = {
      ...initialProps,
      onSeatsChange: jest.fn(),
    };

    beforeEach(() => {
      wrapper = mount(<PlanSelector {...baseProps} />);
    });

    it('should call props function onSeatsChange when user blurs the seats input', () => {
      let input = wrapper.find('input');
      input.simulate('change', {
        target: { value: '12' },
      });

      input.simulate('blur');
      expect(baseProps.onSeatsChange).toHaveBeenCalledTimes(1);
    });

    it('should call props function onSeatsChange when user presses enter when focused on seats input', () => {});

    it('should call props function onPlanChange when user changes the plan input', () => {});
  });
});
