import { mergesort } from "../recursion/mergesort.js";
import { Node } from "./node.js";

class Tree {
  constructor(arr) {
    // remove duplicates
    const unique = [...new Set(arr)];
    // sort
    const sortedarr = mergesort(unique);
    this.root = this.buildTree(sortedarr);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const root = new Node(arr[mid]);
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insertValue(value) {
    const newNode = new Node(value);

    // for empty tree, new value is the root
    if (this.root == null) {
      this.root = newNode;
      return;
    }

    // helper function to find insertion point recursively
    const insertNode = (currNode, value) => {
      // if new value matches an existing data, return to avoid duplicates
      if (value == currNode.data) return;

      // go left
      if (value < currNode.data) {
        if (currNode.left == null) {
          currNode.left = newNode;
        } else {
          insertNode(currNode.left, value);
        }
      }
      // go right
      else {
        if (currNode.right == null) {
          currNode.right = newNode;
        } else {
          insertNode(currNode.right, value);
        }
      }
    };

    insertNode(this.root, value);
  }

  deleteItem(value, currNode = this.root) {
    // empty tree
    if (currNode == null) return null;

    if (value < currNode.data) {
      currNode.left = this.deleteItem(value, currNode.left);
    } else if (value > currNode.data) {
      currNode.right = this.deleteItem(value, currNode.right);
    } else {
      // reached node which we want to delete

      // cases:
      // 0 children
      if (currNode.left == null && currNode.right == null) {
        return null;
      }

      // 1 child
      if (currNode.left == null) {
        return currNode.right;
      }
      if (currNode.right == null) {
        return currNode.left;
      }

      // 2 children
      // need to find smallest value in right subtree
      let successor = currNode.right;
      // go left till leaf node reached in left of the right subtree
      while (successor.left != null) {
        successor = successor.left;
      }

      currNode.data = successor.data;
      currNode.right = this.deleteItem(successor.data, currNode.right);
    }

    return currNode;
  }

  find(value) {
    let curr = this.root;

    while (curr != null) {
      if (value < curr.data) {
        curr = curr.left;
      } else if (value > curr.data) {
        curr = curr.right;
      } else {
        return curr;
      }
    }
    // value doesn't exist
    return null;
  }

  levelOrderForEachIterative(callback) {
    if (!callback) throw new Error("Callback function is required");

    if (this.root == null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      // dequeue first node
      const current = queue.shift();
      callback(current);

      // enqueue existing children
      if (current.left != null) queue.push(current.left);
      if (current.right != null) queue.push(current.right);
    }
  }

  levelOrderForEachRecursive(callback, queue = [this.root]) {
    if (!callback) throw new Error("Callback function is required");

    if (queue.length == 0 || queue[0] == null) return;

    const next = [];

    // process nodes of current level
    for (const node of queue) {
      callback(node);

      if (node.left != null) next.push(node.left);
      if (node.right != null) next.push(node.right);
    }

    this.levelOrderForEachRecursive(callback, next);
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("Callback function is required");

    // left -> root -> right
    const traverse = (root) => {
      if (root == null) return;

      traverse(root.left);
      callback(root);
      traverse(root.right);
    };

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("Callback function is required");

    // root -> left -> right
    const traverse = (root) => {
      if (root == null) return;
      callback(root);
      traverse(root.left);
      traverse(root.right);
    };

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("Callback function is required");

    // left -> right -> root
    const traverse = (root) => {
      if (root == null) return;

      traverse(root.left);
      traverse(root.right);
      callback(root);
    };

    traverse(this.root);
  }

  // number of edges from node to lowest leaf (leaves have a height of 0)
  height(node) {
    if (node == null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // number of edges from root to node (root has a depth of 0)
  depth(node) {
    if (!node) return null;

    let curr = this.root;
    let count = 0;

    while (curr != null) {
      if (node == curr) {
        return count;
      }

      count++;

      if (node.data < curr.data) curr = curr.left;
      if (node.data > curr.data) curr = curr.right;
    }
    return null;
  }

  isBalanced(node = this.root) {
    if (node == null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    const heightDifference = Math.abs(leftHeight - rightHeight);

    // tree is balanced if FOR EVERY NODE in the tree,
    // height difference between left and right subtrees is <= 1
    // and both the left and right subtrees are also balanced
    if (
      heightDifference <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    ) {
      return true;
    }

    return false;
  }

  rebalance() {
    const arr = [];

    this.inOrderForEach((node) => {
      arr.push(node.data);
    });

    this.root = this.buildTree([...new Set(arr)].sort((a, b) => a - b));
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
