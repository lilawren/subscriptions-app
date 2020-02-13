import React from 'react';
import { mount } from 'enzyme';
import SubscriptionView from '../components/SubscriptionView';

describe('[UNIT] Testing the SubscriptionView component', () => {
  let initialProps = {
    title: 'Previous Subscription',
    plan: 'Good',
    seats: 5,
    price: 50,
  };

  let wrapper;

  describe('Initial render', () => {
    beforeEach(() => {
      wrapper = mount(<SubscriptionView {...initialProps} />);
    });

    it('displays the title for the subscription', () => {
      let header = wrapper.find('h4');
      expect(header.text()).toEqual(initialProps.title);
    });

    it('displays the plan', () => {
      let planSpan = wrapper.find('span.bold').at(0);
      expect(planSpan.text()).toEqual(initialProps.plan);
    });

    it('displays the seats', () => {
      let seatsSpan = wrapper.find('span.bold').at(1);
      expect(seatsSpan.text()).toEqual(initialProps.seats.toString());
    });

    it('displays the price', () => {
      let priceSpan = wrapper.find('span.bold').at(2);
      expect(priceSpan.text()).toEqual(`$${initialProps.price.toString()}`);
    });
  });

  describe('Renders changed fields', () => {
    it('Renders single changed field as blue', () => {
      const baseProps = {
        ...initialProps,
        updatedFields: ['plan'],
      };
      wrapper = mount(<SubscriptionView {...baseProps} />);

      let planSpan = wrapper.find('span.bold').at(0);
      expect(planSpan.hasClass('updated')).toBeTruthy();
    });

    it('Renders multiple changed fields as blue', () => {
      const baseProps = {
        ...initialProps,
        updatedFields: ['plan', 'seats', 'price'],
      };
      wrapper = mount(<SubscriptionView {...baseProps} />);

      let valueSpans = wrapper.find('span.bold');
      let planSpan = valueSpans.at(0);
      expect(planSpan.hasClass('updated')).toBeTruthy();

      let seatsSpan = valueSpans.at(1);
      expect(seatsSpan.hasClass('updated')).toBeTruthy();

      let priceSpan = valueSpans.at(2);
      expect(priceSpan.hasClass('updated')).toBeTruthy();
    });
  });
});
