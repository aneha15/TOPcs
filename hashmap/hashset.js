import { HashMap } from "./hashmap.js";

class HashSet extends HashMap {
  add(key) {
    this.set(key, null);
  }

  get(key) {
    throw new Error("HashSet does not have get() method.");
  }

  values() {
    throw new Error("HashSet does not store values");
  }

  entries() {
    throw new Error("HashSet does not store values");
  }
}
