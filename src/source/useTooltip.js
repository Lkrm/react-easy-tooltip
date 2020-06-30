import ReactDOM from 'react-dom';
import { useCallback, useEffect, useRef } from 'react';
import { CLASS_NAME, CLASS_NAMES_BY_TYPES } from './constants';
import { nothing } from './helpers';

const compareTooltipByDataAttributes = (tooltipInstance, element) => {
  const tooltip = tooltipInstance;
  const { tooltipTitle, tooltipClassName, tooltipType } = element.dataset;

  if (tooltipClassName) tooltip.className = `${CLASS_NAME} ${CLASS_NAMES_BY_TYPES[tooltipType]}  ${tooltipClassName} `;

  if (tooltipTitle) tooltip.innerText = tooltipTitle;

  return tooltip
}

const prepareInstanceTooltipByOptions = (options, target) => {
  const { children = null, className, type = '', to } = options;
  const elementTag = to ? 'a' : 'div';

  const tooltipElement = document.createElement(elementTag);
  tooltipElement.className = CLASS_NAME;

  if (to) tooltipElement.href = to;

  if (children) ReactDOM.render(children(options, target), tooltipElement)

  if (className) tooltipElement.className = `${CLASS_NAME} ${className}`;

  if (type) tooltipElement.className = `${CLASS_NAMES_BY_TYPES[type]} ${tooltipElement.className}`;

  return tooltipElement;
}


export const useTooltip = (options) => {
  const {
    onAppear = nothing,
    onDisappear = nothing,
  } = options;

  const elements = useRef([]);
  const refTooltip = useRef({});

  const handleAppendRef = (target) => elements.current = elements.current.concat(target);

  const handleOver = useCallback(({ target }) => {
    target.style.position = 'relative';
    refTooltip.current = prepareInstanceTooltipByOptions(options, target);
    refTooltip.current = compareTooltipByDataAttributes(refTooltip.current, target);
    onAppear({ options, tooltip: refTooltip.current, element: target });
    target.append( refTooltip.current);
  },[options, onAppear]);

  const handleOut = useCallback(({ target }) => {
    if (refTooltip.current) {
      target.removeChild( refTooltip.current);
      onDisappear({ options, tooltip: refTooltip.current, element: target });
      refTooltip.current = null;
    }
  }, [options, onDisappear, refTooltip]);

  useEffect(() => {
    const { current: listOfElements } = elements;
    if (listOfElements) {
      listOfElements.forEach((element) => {
        element.addEventListener('mouseover', handleOver, true, { once: true });
        element.addEventListener('mouseout', handleOut, true, { once: true });
      });
      return () => {
        listOfElements.forEach((element) => {
          element.removeEventListener('mouseover', handleOver);
          element.removeEventListener('mouseout', handleOut);
        });
      }
    }
  }, [elements, handleOut, handleOver]);
  return {
    refTooltip: handleAppendRef,
  };
}
