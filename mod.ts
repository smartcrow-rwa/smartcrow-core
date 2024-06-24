import { abi } from "./deps.ts";
import { DateTime } from "./deps.ts";

/** Returns `Hello World` in bold */
export function getHelloWorld(): string {
  return ("Hello World");
}

export function extractAddressAndZip(propertyNumber: string) {
  const parts = propertyNumber.split(/[\s,-]+/);
  let streetAddress = parts.slice(0, 3).join(" ");
  let postalCode: string | null = null;
  for (let i = parts.length - 1; i >= 0; i--) {
    if (/^\d+$/.test(parts[i])) {
      postalCode = parts[i];
      break;
    }
  }
  if (postalCode !== null) {
    streetAddress = streetAddress.replace(/\bStreet\b/, "St");
  }
  const addressInfo = { streetAddress: streetAddress, postalCode: postalCode };
  const addressParts = addressInfo.streetAddress.split(" ");
  const street = addressParts.slice(1).join(" ").toUpperCase();
  const city = parts.slice(3, 4).join(" ");
  const state = parts.slice(4, 5).join(" ");
  const formattedAddress = addressParts[0] + " " + street + ", " + city + ", " +
    state + " " + addressInfo.postalCode + "," + " USA";
  return { formattedAddress, postalCode, streetAddress };
}

export function getABI() {
  return abi;
}

export async function checkSalesCondition(
  // deno-lint-ignore no-explicit-any
  tx: any,
  lastSaleDate: string,
  lastSalePrice: string,
) {
  // Check Sales condition
  // Store sales details from agreement
  // Declare variables for the condition
  const stringArray = tx;
  const atPrice: number = parseInt(stringArray[7], 10);
  const startDate: number = parseInt(stringArray[3]);
  const endDate: number = parseInt(stringArray[4]);
  // ## minRequestDays should be from stringArray
  const minRequestDays: number = parseInt(stringArray[6]);
  const additionalDays = minRequestDays === 1 ? 2592000 : 5184000;

  // Unix Time Conversion
  const endingPeriod = await DateTime.fromSeconds(endDate).toFormat(
    "yyyy-MM-dd HH:mm:ss",
  );
  const lockdownPeriod = await DateTime.fromSeconds(endDate + additionalDays)
    .toFormat("yyyy-MM-dd HH:mm:ss");

  const result = { condition: false, reason: "" };

  // Check Sales Condition - decision tree
  if (lastSaleDate && lastSalePrice) {
    const dateObject = new Date(lastSaleDate);
    const timestamp = Math.floor(dateObject.getTime() / 1000);
    console.log(
      "start date, timestamp(last sale date), end date",
      startDate,
      timestamp,
      endDate,
    );

    if (startDate < timestamp && timestamp <= endDate) {
      const atCondition = parseInt(stringArray[5]);

      if (atCondition === 1) {
        console.log(
          "Last sales price, Expected sales price",
          lastSalePrice,
          atPrice,
        );
        if (parseInt(lastSalePrice) >= atPrice) {
          result.condition = true;
          result.reason = "Meets sales price, deadline and all criteria";
        } else {
          result.condition = false;
          result.reason =
            `Doesn't meet sales price, should be at or above. Lockout Period until: ${lockdownPeriod}`;
        }
      } else if (atCondition === 2) {
        console.log(
          "Last sales price, Expected sales price",
          lastSalePrice,
          atPrice,
        );
        if (parseInt(lastSalePrice) <= atPrice) {
          result.condition = true;
          result.reason = "Meets sales price, deadline and all criteria";
        } else {
          result.condition = false;
          result.reason =
            `Doesn't meet sales price, should be at or below. Lockout Period until: ${lockdownPeriod}`;
        }
      } else {
        result.condition = true;
        result.reason = "Meets condition without expected sales price";
      }
    } else {
      result.condition = false;
      result.reason =
        `Didn't perform sales within timeframe: ${endingPeriod}. Lockout Period until: ${lockdownPeriod}`;
    }
  } else {
    result.condition = false;
    result.reason =
      `No latest sales data available. Lockout Period until: ${lockdownPeriod}`;
  }

  // Check Deadline and Post Deadline Check
  const currentDateUnixTimeInSeconds = Math.floor(Date.now() / 1000);
  const deadlineCheckResult: boolean =
    currentDateUnixTimeInSeconds > (endDate + additionalDays);

  return { result, deadlineCheckResult };
}
