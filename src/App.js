import React from 'react';
import { withTooltip } from './source/';
import './source/style.css';

function App({ refTooltip }) {
  return (
    <div className="App">
      <button
        type="button"
        data-tooltip-title="Some title 1"
        data-tooltip-class-name="red"
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
  onAppear: () => console.log(`Before appear`),
  onDisappear: () => console.log('Disappear')
})(App);
