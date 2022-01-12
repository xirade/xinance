export default function debounce(fn, delay) {
  let timer = null;
  return (() => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), delay);
  })();
}
