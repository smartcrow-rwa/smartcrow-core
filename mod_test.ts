import { assertEquals } from "./test_deps.ts";
import { checkSalesCondition, getABI, getHelloWorld } from "./mod.ts";
import { extractAddressAndZip } from "./mod.ts";
import { abi } from "./deps.ts";
import { tx } from "./test_deps.ts";

Deno.test(function test_get_hello_world() {
  assertEquals(getHelloWorld(), "Hello World");
});

Deno.test(function test_extract_address() {
  assertEquals(
    extractAddressAndZip("1050-Suffolk-Street-CAMBRIA-CA-93428").streetAddress,
    "1050 Suffolk St",
  );
  assertEquals(
    extractAddressAndZip("40636 Windsor Rd, Temecula, CA 92591, USA")
      .streetAddress,
    "40636 Windsor Rd",
  );
});

Deno.test(function test_postal_code() {
  assertEquals(
    extractAddressAndZip("1050-Suffolk-Street-CAMBRIA-CA-93428").postalCode,
    "93428",
  );
  assertEquals(
    extractAddressAndZip("40636 Windsor Rd, Temecula, CA 92591, USA")
      .postalCode,
    "92591",
  );
});
//1050 Suffolk Street, Cambria, CA 93428, USA
Deno.test(function test_formatted_address() {
  assertEquals(
    extractAddressAndZip("1050-Suffolk-Street-CAMBRIA-CA-93428")
      .formattedAddress,
    "1050 SUFFOLK ST, CAMBRIA, CA 93428, USA",
  );
  assertEquals(
    extractAddressAndZip("40636 Windsor Rd, Temecula, CA 92591, USA")
      .formattedAddress,
    "40636 WINDSOR RD, Temecula, CA 92591, USA",
  );
});

Deno.test(function test_get_abi() {
  return assertEquals(getABI(), abi);
});

Deno.test(async function test_check_sales_condition() {
  assertEquals(
    (await checkSalesCondition(tx, "2023-09-25", "550000")).result.condition,
    false,
  );
  assertEquals(
    (await checkSalesCondition(tx, "2023-09-25", "550000")).result.reason,
    "Didn't perform sales within timeframe: 1970-01-01 00:00:00. Lockout Period until: 1970-03-02 00:00:00",
  );
  assertEquals(
    (await checkSalesCondition(tx, "2023-09-25", "550000")).deadlineCheckResult,
    true,
  );
});
