import React from 'react';
import DatePicker from 'react-datepicker';
import { compose, withState, withHandlers } from 'recompose';

const DateRangeInput = ({
  startDateValue,
  endDateValue,
  startChange,
  endChange
}) => (
    <div className="form-control">
      <DatePicker
        selected={startDateValue}
        selectsStart
        startDate={startDateValue}
        endDate={endDateValue}
        onChange={startChange}
      />

      <DatePicker
        selected={endDateValue}
        selectsEnd
        startDate={startDateValue}
        endDate={endDateValue}
        onChange={endChange}
      />
    </div>
  );

const withDateRangeStateHandlers = compose(
  withState('startDateValue', 'updateStartDateValue', ({ startFieldName, formCtx: { values } }) => {
    return values[startFieldName] ? new Date(values[startFieldName]) : new Date();
  }),
  withState('endDateValue', 'updateEndDateValue', ({ endFieldName, formCtx: { values } }) => {
    return values[endFieldName] ? new Date(values[endFieldName]) : new Date();
  }),
  withHandlers({
    startChange: ({ startFieldName, formCtx: { setFieldValue }, updateStartDateValue }) => (date) => {
      updateStartDateValue(date, () => setFieldValue(startFieldName, date.toISOString()));
    },
    endChange: ({ endFieldName, formCtx: { setFieldValue }, updateEndDateValue }) => (date) => {
      updateEndDateValue(date, () => setFieldValue(endFieldName, date.toISOString()));
    }
  })
)

export default ({ FieldCtxComponent, ...props }) =>
  <FieldCtxComponent
    input={withDateRangeStateHandlers(DateRangeInput)}
    {...props}
  />;
