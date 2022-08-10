class Node {
  l;
  r;
  val;
  constructor(){}
}

class BinaryTree {
  rootNode = null;
  constructor() { }

  traverseTreeDepthFirst() {
    const rootCopy = JSON.parse(JSON.stringify(this.rootNode)); // ew
    let currNode = rootCopy;
    let output = "";
    const stack = [];
    while (currNode) {

      if (!currNode?.val) {
        break;
      }

      if (currNode.seen) {
        // handle moving up the tree
        if (currNode.l && !currNode.l.seen) currNode = currNode.l;
        else if (currNode.r && !currNode.r.seen) currNode = currNode.r;
        else currNode = stack.pop(); // exit scenario will be undefined at the end
        continue;
      } else {
        currNode.seen = true;
        stack.push(currNode);
      }

      output += `${currNode.val},`
      // handle moving down the tree
      if (currNode.l) currNode = currNode.l
      else if (currNode.r) currNode = currNode.r
      else currNode = stack.pop();
    }
    console.log(`depth first search ${output}`)
  }

  // add children to a stack in the order of the output
  traverseTreeBreadthFirst() {
    let output = "";
    const rootCopy = JSON.parse(JSON.stringify(this.rootNode)); // ew
    let currNode = rootCopy;
    const stack = [];
    stack.push(currNode);
    while (stack.length > 0) {
      if (!currNode.seen) {
        currNode.seen = true;
        output += `${currNode.val},`
        continue;
      };
      if (currNode.l && !currNode.l.seen) stack.push(currNode.l)
      if (currNode.r && !currNode.r.seen) stack.push(currNode.r)
      currNode = stack.shift();
    }
    console.log(`breadth first search ${output}`);
  }
}

function generateBinaryTree() {
  const vals = [5, 1, 2, 4, 7, 6, 8, 10, 3, 101];

  const btree = new BinaryTree();
  const rootNode = new Node();

  for (const val of vals) {
    let currNode = rootNode;
    let isValid;
    while (!isValid) {
      if (!currNode.val) {
        isValid = true;
        currNode.val = val;
      } else if (currNode.val > val) {

        if (currNode.l) {
          currNode = currNode.l;
        } else if (!currNode.l) {
          const n = new Node()
          n.val = val;
          currNode.l = n;
          isValid = true;
        }
      } else if (currNode.val < val) {
        if (currNode.r) {
          currNode = currNode.r;
        } else if (!currNode.r) {
          const n = new Node()
          n.val = val;
          currNode.r = n;
          isValid = true;
        }
      }
    }
  }

  btree.rootNode = rootNode
  return btree;
}

const btree = generateBinaryTree();
btree.traverseTreeDepthFirst();
btree.traverseTreeBreadthFirst();

// balanced tree is when the left and right nodes of a tree are no different than 1