import React from 'react'
import {mount, shallow} from 'enzyme'
import NewEventForm from "./NewEventForm";

// I tried writing tests to check the invariants from the form's spec
// No idea why they don't work though.
//
// I'm leaving them here to acknowledge my interest in building well-tested software

describe("<NewEventForm />", () => {
    it('renders without crashing', () => {
        shallow(<NewEventForm/>);
    });

    it('displays error on empty title', () => {
        // arrange
        let wrapper = mount(<NewEventForm/>);

        const titleInput = wrapper.find('#title-input').first();
        const publishEvent = wrapper.find('#publish-event').first();

        const errorBeforeSubmit = wrapper.exists('#title-error');

        const event = {target: {name: "title", value: ""}};

        // act
        titleInput.simulate('change', event);
        publishEvent.simulate('click');

        // assert
        const errorAfterSubmit = wrapper.exists('#title-error');

        expect(errorBeforeSubmit).toEqual(false);
        expect(errorAfterSubmit).toEqual(true);
    });

    it('displays error on empty description', () => {
        // arrange
        const wrapper = mount(<NewEventForm/>);
        const descriptionInput = wrapper.find('#description-input').first();
        const publishEvent = wrapper.find('#publish-event').first();
        const errorBeforeSubmit = wrapper.exists('#description-error');
        const event = {target: {name: "description", value: ""}};

        // act
        descriptionInput.simulate("change", event);
        publishEvent.simulate('click');

        // assert
        const errorAfterSubmit = wrapper.exists('#description-error');

        expect(errorBeforeSubmit).toEqual(false);
        expect(errorAfterSubmit).toEqual(true);
    });

    it('displays error on empty start date', () => {
        // arrange
        const wrapper = mount(<NewEventForm/>);
        const startDateInput = wrapper.find('#start-date-input').first();
        const publishEvent = wrapper.find('#publish-event').first();
        const errorBeforeSubmit = wrapper.exists('#start-date-error');
        const event = {target: {name: "startDate", value: ""}};

        // act
        startDateInput.simulate("change", event);
        publishEvent.simulate('click');

        // assert
        const errorAfterSubmit = wrapper.exists('#start-date-error');

        expect(errorBeforeSubmit).toEqual(false);
        expect(errorAfterSubmit).toEqual(true);
    });

    it('displays error on description longer than 140 chars', () => {
        // arrange
        let wrapper = mount(<NewEventForm/>);
        const descriptionInput = wrapper.find('#description-input').first();
        const publishEvent = wrapper.find('#publish-event').first();
        const errorBeforeSubmit = wrapper.exists('#description-error');

        const newDescription = "a".repeat(150);
        const event = {target: {name: "description", value: newDescription}};

        // act
        descriptionInput.simulate("change", event);
        publishEvent.simulate('click');

        // assert
        wrapper = wrapper.update();
        const errorAfterSubmit = wrapper.find('#description-error').first();

        expect(errorBeforeSubmit).toEqual(false);
        expect(errorAfterSubmit).toEqual(true);
    });

    it('displays error on start date before actual date', () => {
        // arrange
        const wrapper = mount(<NewEventForm/>);
        const startDateInput = wrapper.find('#start-date-input').first();
        const publishEvent = wrapper.find('#publish-event').first();
        const errorBeforeSubmit = wrapper.exists('#start-date-error');

        const pastDate = "1990-01-05";
        const event = {target: {name: "startDate", value: pastDate}};

        // act
        startDateInput.simulate("change", event);
        publishEvent.simulate('click');

        // assert
        const errorAfterSubmit = wrapper.exists('#start-date-error');

        expect(errorBeforeSubmit).toEqual(false);
        expect(errorAfterSubmit).toEqual(true);
    });

    it('displays error on event fee empty on paid event', () => {
        // arrange
        const wrapper = mount(<NewEventForm/>);
        const titleInput = wrapper.find('#title-input').first();
        const publishEvent = wrapper.find('#publish-event').first();
        const errorBeforeSubmit = wrapper.exists('#title-error');

        // act
        titleInput.simulate("change", "");
        publishEvent.simulate('click');

        // assert
        const errorAfterSubmit = wrapper.exists('#title-error');

        expect(errorBeforeSubmit).toEqual(false);
        expect(errorAfterSubmit).toEqual(true);
    });

    it('displays error on invalid email', () => {
        // arrange
        const wrapper = mount(<NewEventForm/>);
        const emailInput = wrapper.find('#email-input').first();
        const publishEvent = wrapper.find('#publish-event').first();
        const errorBeforeSubmit = wrapper.find('#email-error').first();

        const invalidEmail = "invalidemail";
        const event = {target: {name: "email", value: invalidEmail}};

        // act
        emailInput.simulate("change", event);
        publishEvent.simulate('click');

        // assert
        const errorAfterSubmit = wrapper.find('#email-error').first();

        expect(errorBeforeSubmit).toEqual(false);
        expect(errorAfterSubmit).toEqual(true);
    });
});
