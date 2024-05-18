  const fs = require('fs');

  // Function to calculate the frequency of each character in the data
  function frequency(data) {
    const freq = {};
    data.forEach(element => {
      if (element in freq) {
        freq[element]++;
      } else {
        freq[element] = 1;
      }
    });
    return freq;
  }

  // Function to sort the frequency in ascending order
  function sortByValue(obj) {
    return Object.entries(obj).sort((a, b) => a[1] - b[1]);
  }

  // HuffmanNode class to create nodes
  class HuffmanNode {
    constructor(data = null, frequency = null, left = null, right = null) {
      this.data = data;
      this.frequency = frequency;
      this.left = left;
      this.right = right;
    }
  }

  // Function to decode the encoded string
  function decode(root, encodedString) {
    let decodedString = '';
    let node = root;
    for (let i = 0; i < encodedString.length; i++) {
      if (encodedString[i] === "0") {
        node = node.left;
      } else {
        node = node.right;
      }

      if (node.left === null && node.right === null) {
        decodedString += node.data;
        node = root;
      }
    }
    return decodedString;
  }

  // Traversal function to generate codes
  function traversal(node, binaryString, code) {
    if (node.left === null && node.right === null) {
      code[node.data] = binaryString;
      // console.log(node.data + ": " + binaryString);
      return;
    }
    traversal(node.left, binaryString + "0", code);
    traversal(node.right, binaryString + "1", code);
  }

  // Function to create Huffman nodes using priority queue
  function createNodes(queue) {
    let q = [];
    queue.forEach(([key, frequency]) => {
      q.push(new HuffmanNode(key, frequency));
    });

    while (q.length > 1) {
      q.sort((a, b) => a.frequency - b.frequency);
      let left = q.shift();
      let right = q.shift();
      let newNode = new HuffmanNode(null, left.frequency + right.frequency, left, right);
      q.push(newNode);
    }

    return q[0];
  }


  // Function to read data, calculate frequency, build Huffman tree, and generate codes
function getData(filename) {
  let filedata = fs.readFileSync(filename, 'utf-8');
  filedata = Array.from(filedata);
  let freq = frequency(filedata);
  let sortedFrequency = sortByValue(freq);
  let root = createNodes(sortedFrequency);
  let code = {};
  traversal(root, "", code);
  return { code, root };
}

// Get the mode from command line arguments
let mode = process.argv[2];
let filename = process.argv[3];

if (mode === '-d') {
  // Decoding mode
  let filebin = fs.readFileSync(filename, 'utf-8');
  let root = JSON.parse(fs.readFileSync(`${filename}.huffman`, 'utf-8'));

  // Decode the encoded string
  let decodedData = decode(root, filebin);
  console.log('Decoded String:', decodedData);
} else if(mode === '-e') {
  // Encoding mode
  // Get the Huffman codes and root node
  let { code, root } = getData(filename);

  // Encode the file data
  let filedata = fs.readFileSync(filename, 'utf-8');
  let encodedString = '';
  filedata.split('').forEach(char => {
    encodedString += code[char];
  });

  // Write the encoded data to a file
  fs.writeFileSync(`${filename}.bin`, encodedString, 'utf-8');
  console.log('Compressed file generated ...');

  // Save the Huffman tree to a file
  fs.writeFileSync(`${filename}.bin.huffman`, JSON.stringify(root), 'utf-8');
}