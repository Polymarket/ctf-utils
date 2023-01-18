# Utility to calculate CTF ERC1155 token IDs

```ts
import { calculatePositionId } from "@polymarket/ctf-utils";

const conditionId = "0xbd31dc8a20211944f6b70f31557f1001557b59905b7738480ca09bd4532f84af";
const collateral = "0x2E8DCfE708D44ae2e406a1c02DFE2Fa13012f961";
const outcomeSlotCount = 2;
const outcomeIndex = 0;

// 1343197538147866997676250008839231694243646439454152539053893078719042421992
const positionId = calculatePositionId(conditionId, collateral, outcomeSlotCount, outcomeIndex);

```


