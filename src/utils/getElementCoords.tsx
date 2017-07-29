export default function getElementCoords(element:HTMLElement) {
  const box = element.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top  = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return {
      top: top,
      bottom: top + element.scrollHeight,
      left: left,
      right: left + element.scrollWidth};
}
