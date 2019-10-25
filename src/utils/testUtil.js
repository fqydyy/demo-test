export default (wrapper, tag) => {
  return wrapper.find(`[data-test='${tag}']`);
}