import React from 'react';
import DatePicker from 'react-datepicker';
import { compose, withState, withHandlers } from 'recompose';

const DateInput = ({ dateValue, dateChange }) => (
  <DatePicker
    selected={dateValue}
    onChange={dateChange}
  />
);

const withDateStateHandlers = compose(
  withState('dateValue', 'updateDateValue', ({ name, formCtx: { values } }) => {
    return values[name] ? new Date(values[name]) : new Date();
  }),
  withHandlers({
    dateChange: ({ name, formCtx: { setFieldValue }, updateDateValue }) => (date) => {
      updateDateValue(date, () => setFieldValue(name, date.toISOString()));
    }
  })
);

export default ({ FieldCtxComponent, ...props }) =>
  <FieldCtxComponent
    input={withDateStateHandlers(DateInput)}
    {...props}
  />;
