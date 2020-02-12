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
    let newSeats, newPlan;
    let mockOnSeatsChange = jest
      .fn()
      .mockImplementation((seats) => (newSeats = seats));
    let mockOnPlanChange = jest
      .fn()
      .mockImplementation((plan) => (newPlan = plan));
    let baseProps = {
      ...initialProps,
      onSeatsChange: mockOnSeatsChange,
      onPlanChange: mockOnPlanChange,
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
      expect(newSeats).toEqual(12);
      newSeats = undefined;
      mockOnSeatsChange.mockClear();
    });

    it('should call props function onSeatsChange when user presses enter when focused on seats input', () => {
      let input = wrapper.find('input');
      input.simulate('change', {
        target: { value: '12' },
      });

      input.simulate('submit');
      expect(baseProps.onSeatsChange).toHaveBeenCalledTimes(1);
      expect(newSeats).toEqual(12);
      newSeats = undefined;
      mockOnSeatsChange.mockClear();
    });

    it('should call props function onPlanChange when user changes the plan dropdown', () => {
      let dropdown = wrapper.find({ role: 'listbox' }).find({ role: 'alert' });
      dropdown.simulate('click');

      let option = wrapper
        .find({ role: 'option', 'aria-checked': false })
        .first();
      option.simulate('click');

      expect(baseProps.onPlanChange).toHaveBeenCalledTimes(1);
      expect(newPlan).toEqual('basic');
      newPlan = undefined;
      mockOnPlanChange.mockClear();
    });
  });
});
