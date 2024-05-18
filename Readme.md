
---

# Huffman Encoding and Decoding

This repository contains a Node.js implementation of Huffman encoding and decoding. Huffman coding is a widely used algorithm for lossless data compression. It works by assigning variable-length codes to input characters, with shorter codes assigned to more frequent characters. This allows for efficient compression of data with varying frequencies of characters.

## Features

- **Encoding:** Given an input file, the script generates a compressed binary file using Huffman coding.
- **Decoding:** Given a compressed binary file and the corresponding Huffman tree, the script decodes the data and recovers the original input file.
- **Command-line Interface:** The script provides a command-line interface for encoding and decoding files.

## Usage

### Encoding:

```
node index.js -e <input_filename>
```

This command will encode the specified input file using Huffman coding and generate a compressed binary file `<input_filename>.bin`.

### Decoding:

```
node index.js -d <compressed_filename>
```

This command will decode the specified compressed binary file using the Huffman tree stored in `<compressed_filename>.huffman` and output the decoded string.

## Dependencies

- Node.js (v12 or higher)
- File system module (`fs`)

## Installation

To install the dependencies, run:

```
npm install
```

## Examples

### Encoding Example:

```
node index.js -e input.txt
```

This command will encode the `input.txt` file and generate `input.txt.bin` as the compressed binary file.

### Decoding Example:

```
node index.js -d input.txt.bin
```

This command will decode the `input.txt.bin` file using the Huffman tree stored in `input.txt.bin.huffman` and output the decoded string.

---
[video](HuffmanImplementaion.webm)