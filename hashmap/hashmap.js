import { LinkedList } from "../linkedlist/linkedlist.js";

export class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
    this.size = 0; // tracks current size
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  grow() {
    const oldB = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    // need to rehash all previous bucket entries
    for (let i = 0; i < oldB.length; i++) {
      if (oldB[i]) {
        let curr = oldB[i].head;
        while (curr != null) {
          this.set(curr.value.key, curr.value.value);
          curr = curr.next;
        }
      }
    }
  }

  set(key, value) {
    // index in array is the hashed key
    const index = this.hash(key);

    // initialise bucket wth linked list if it doesn't exist
    if (!this.buckets[index]) this.buckets[index] = new LinkedList();

    const bucket = this.buckets[index];

    // if key already exists, overwrite old value
    let current = bucket.head;
    while (current != null) {
      if (current.value.key == key) {
        current.value.value = value; // updated existing value, size remains same
        return;
      }
      current = current.next;
    }
    // key doesnt exist, add new entry
    bucket.append({ key, value });
    this.size++;

    // grow buckets if load factor reached
    if (this.size / this.capacity > this.loadFactor) this.grow();
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return null;

    let current = bucket.head;
    while (current != null) {
      if (current.value.key == key) {
        return current.value.value;
      }
      current = current.next;
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;

    let current = bucket.head;

    while (current != null) {
      if (current.value.key == key) return true;
      current = current.next;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;

    let current = bucket.head;
    let pos = 0;

    while (current != null) {
      if (current.value.key == key) {
        bucket.removeAt(pos);
        this.size--;
        return true;
      }
      pos++;
      current = current.next;
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  traverseBuckets(cb) {
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let curr = this.buckets[i].head;
        while (curr != null) {
          cb(curr.value);
          curr = curr.next;
        }
      }
    }
  }

  keys() {
    const keys = [];
    this.traverseBuckets((value) => keys.push(value.key));
    return keys;
  }

  values() {
    const values = [];
    this.traverseBuckets((value) => values.push(value.value));
    return values;
  }

  entries() {
    const entries = [];
    this.traverseBuckets((value) => entries.push([value.key, value.value]));
    return entries;
  }
}

// const test = new HashMap();
// test.set("apple", "red");
// test.set("banana", "yellow");
// test.set("carrot", "orange");
// test.set("dog", "brown");
// test.set("elephant", "gray");
// test.set("frog", "green");
// test.set("grape", "purple");
// test.set("hat", "black");
// test.set("ice cream", "white");
// test.set("jacket", "blue");
// test.set("kite", "pink");
// test.set("lion", "golden");
// // console.log(test.length());
// // test.set("lion", "orange");
// // console.log(test.length());
// // console.log(test.entries());
// // console.log(test.loadFactor);
// test.set('moon', 'silver');
// console.log(test.capacity);
// console.log(test.remove("moon"));
// console.log(test.has("moon"));
// console.log(test.get("moon"));
