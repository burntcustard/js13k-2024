export const createElement = (tag = 'div', css) => {
  const element = document.createElement(tag);

  element.style.cssText = css;

  return element;
};
