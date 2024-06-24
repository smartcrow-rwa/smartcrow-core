# 🦕 deno-module-starter

[Deno](https://deno.land) module starter repository.

## Usage

```typescript
import {
  checkSalesCondition,
  extractAddressAndZip,
  getABI,
  getHelloWorld,
} from "https://deno.land/x/smartcrow@v1.0.0/mod.ts";

// Testing smartcrow function
const helloWorld = getHelloWorld();
console.log(helloWorld);

// Get formatted address, postalcode and streetaddress from given property number
const { formattedAddress, postalCode, streetAddress } = extractAddressAndZip(
  "<YOUR_PROPERTY_NUMBER_USA>",
);
console.log(formattedAddress, postalCode, streetAddress);

// Get smartcrow contract ABI
const abi = getABI();
console.log(abi);

// Check sales condition of the smartcrow contract
// deno-lint-ignore no-explicit-any
const transactionArray: any = []; // Array read from bonus info of contract
const lastSaleDate: string = ""; // Enter the Last Contract Recording Date from Real Estate API data
const lastSalePrice: string = ""; // Enter the Closing Sales Price from Real Estate API data
const { result, deadlineCheckResult } = checkSalesCondition(
  transactionArray,
  lastSaleDate,
  lastSalePrice,
);
console.log(result.condition, result.reason, deadlineCheckResult);
```

## Test

```bash
# unit tests
deno test
```

## Format code

```bash
deno fmt
```

## Resources

- [Deno Website](https://deno.land)
- [Deno Style Guide](https://deno.land/std/style_guide.md)
- [Deno Gitter](https://gitter.im/denolife/Lobby)
