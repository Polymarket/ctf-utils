import "mocha";
import { expect } from "chai";
import { calculatePositionIds } from "../src";


describe("Calculate tokenIds from ConditionId", () => {
    it("ConditionId", () => {
        const conditionId = "0xbd31dc8a20211944f6b70f31557f1001557b59905b7738480ca09bd4532f84af";
        const collateral = "0x2E8DCfE708D44ae2e406a1c02DFE2Fa13012f961";
        const outcomeSlotCount = 2;

        const positionIds = calculatePositionIds(conditionId, collateral, outcomeSlotCount);
        expect(positionIds.length).eq(2);
        expect(positionIds[0]).eq("1343197538147866997676250008839231694243646439454152539053893078719042421992");
        expect(positionIds[1]).eq("16678291189211314787145083999015737376658799626183230671758641503291735614088");
    });
});
