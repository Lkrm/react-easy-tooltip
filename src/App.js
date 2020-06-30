import React from 'react';
import { withTooltip } from './source/';
import './source/style.css';
import { TYPES } from './source/constants';

function App({ refTooltip }) {
  return (
    <div className="App">
      <button
        type="button"
        data-tooltip-title="Some title 1"
        data-tooltip-class-name="red"
        data-tooltip-type={TYPES.INFO}
        ref={refTooltip}
      >Hover to me</button>
      <button
        type="button"
        data-tooltip-title="Some title 2"
        ref={refTooltip}
      >Hover to me</button>
    </div>
  );
}

export default withTooltip({
  children: (options, some, one) => {
  },
  type: TYPES.SUCCESS,
  onAppear: () => console.log(`Before appear`),
  onDisappear: () => console.log('Disappear')
})(App);
