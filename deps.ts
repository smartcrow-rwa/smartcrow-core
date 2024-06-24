// Add your dependencies in here
export const { DateTime } = await import("npm:luxon@3.4.4");

export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "bonusInfo",
    outputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "bonusAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sellByDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "atCondition",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minRequestDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "atPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "meetSalesCondition",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "postDeadlineCheck",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fundsWithdrawn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
