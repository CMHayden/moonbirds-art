# Moonbirds Art - Node.js Package

This project provides a set of tools and utilities to work with Moonbirds NFTs, designed for easy integration into your applications.

## Features

- Randomizer: A function to generate random Moonbird NFTs.
- Metadata: Utilities for retrieving and managing metadata associated with Moonbirds.
- Artwork: Functions to interact with Moonbirds' art assets and layers.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and set up the project, run the following commands:

```bash
# Clone the repository
git clone https://github.com/CMHayden/moonbirds-art.git

# Navigate to the project directory
cd moonbirds-art

# Install the dependencies
npm install
```

If you're using TypeScript:

```bash
# Install TypeScript and other required packages
npm install --save-dev typescript ts-node @types/node
```

## Usage

This section explains how to use the different features of the package.

### Peer Dependencies

This package requires `sharp` to be installed in the consuming project. Run:

```bash
npm install sharp
```

Due to an issue with sharp and the client, adding it as a peer dependency was a necesity, along with a small addition to your nextconfig.ts if using next.js:

```ts
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push("sharp");
    return config;
  },
};

module.exports = nextConfig;
```

### Example: Generate a Random Moonbird

```typescript
import { generateRandomMoonbird } from "moonbirds-art/randomizer";

const randomMoonbird = generateRandomMoonbird();
console.log(randomMoonbird);
```

### Example: Get Moonbird Metadata by ID

```typescript
import { getMoonbirdConfigById } from "moonbirds-art/metadata";

const moonbirdId = 12345;

try {
  const config = await getMoonbirdConfigById(moonbirdId);
  console.log(config);
} catch (error) {
  console.error("Error:", error);
}
```

## Contributing

We welcome contributions! To contribute, please fork the repository and submit a pull request. Here's how:

1. Fork the repository
2. Create a feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -am 'Add feature')
4. Push to the branch (git push origin feature-name)
5. Open a pull request
6. Let me know to take a look on the Moonbirds discord, or on twitter @igottheherb

## License

This project is licensed under the MIT License.
