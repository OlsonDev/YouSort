export default {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) { /* Do nothing */ }
    return null;
  },

  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { /* Do nothing */ }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) { /* Do nothing */ }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (e) { /* Do nothing */ }
  },
};