export const identity = (val) => val;

export const nothing = () => {};

export const propOr = (or, prop, object) => object
  ? (object.hasOwnProperty(prop)
    ? object[prop]
    : or)
  : or;
