import { Node } from "./node.js";

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    let node = new Node(value);

    // store current node
    let currNode;

    // if list is empty, add elem as head
    if (this.head == null) this.head = node;
    else {
      currNode = this.head;

      // iterate to end of the list
      while (currNode.next) {
        // breaks when current node points to null
        currNode = currNode.next;
      }
      // last element points to new node
      currNode.next = node;
    }

    this.size++;
  }

  prepend(value) {
    let node = new Node(value);

    if (this.head == null) this.head = node;
    else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head.value;
  }

  getTail() {
    let currNode = this.head;
    while (currNode.next) {
      currNode = currNode.next;
    }
    return currNode.value;
  }

  at(index) {
    let currNode = this.head;

    if (index < 0 || index >= this.size) {
      return "Enter a valid index";
    } else {
      let i = 0;

      while (i != index) {
        currNode = currNode.next;
        i++;
      }
      return currNode.value;
    }
  }

  pop() {
    let currNode = this.head;

    // breaks at second last node
    while (currNode.next.next) {
      currNode = currNode.next;
    }
    let last = currNode.next;
    currNode.next = null;
    this.size--;
    return last.value;
  }

  contains(value) {
    let currNode = this.head;
    while (currNode && currNode.value != value) {
      currNode = currNode.next;
    }
    return currNode != null;
  }

  find(value) {
    let i = 0;
    let currNode = this.head;

    while (currNode) {
      if (currNode.value == value) {
        return i;
      }
      i++;
      currNode = currNode.next;
    }
    return null;
  }

  toString() {
    let currNode = this.head;
    let str = "";

    while (currNode) {
      str += " ( " + currNode.value + " ) ->";
      currNode = currNode.next;
    }
    str += " null";
    return str;
  }

  insertAt(value, index) {
    if (index < 0 || index >= this.size) {
      console.log("Enter a valid index");
    } else {
      let i = 0;
      let currNode = this.head;
      let prevNode;
      while (i < index) {
        prevNode = currNode;
        currNode = currNode.next;
        i++;
      }
      let node = new Node(value);
      prevNode.next = node;
      node.next = currNode;
      this.size++;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) {
      return console.log("Enter a valid index");
    } else {
      let currNode = this.head;

      if (index == 0) {
        this.head = currNode.next;
      } else {
        let i = 0;
        let prevNode;

        while (i < index) {
          prevNode = currNode;
          currNode = currNode.next;
          i++;
        }
        prevNode.next = currNode.next;
      }
      this.size--;
    }
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.insertAt("maomao", 2);
console.log(list.contains("jinshi"));
list.pop();
console.log(list.find("maomao"));
list.removeAt(3);
console.log(list.toString());
console.log(list.getSize());
console.log(list.getHead());
console.log(list.getTail());
list.insertAt("test", 5);
console.log(list.toString());
