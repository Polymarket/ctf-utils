import BN from "bn.js";
import { ethers } from "ethers";
import { keccak256 } from "@ethersproject/solidity";


const calculateCollectionIds = (conditionId: string, outcomeSlotCount: number) : string[] => {
    const collectionIds: string[] = [];
    const altBN128P = new BN(
        "21888242871839275222246405745257275088696311157297823662689037894645226208583",
    );
    const altBN128PRed = BN.red(altBN128P);
    const altBN128B = new BN(3).toRed(altBN128PRed);
    const onePRed = new BN(1).toRed(altBN128PRed);
    const oddToggle = new BN(1).ushln(254);

    for (let i = 1; i <= outcomeSlotCount; i += 1) {
        const initHash = keccak256(
            ["bytes32", "uint256"],
            [conditionId, i],
        );

        const odd = "89abcdef".includes(initHash[2]);
        const x = new BN(initHash.slice(2), "hex").toRed(altBN128PRed);

        let y;
        let yy;
        do {
            x.redIAdd(onePRed);
            yy = x.redSqr();
            yy.redIMul(x);
            yy = yy.mod(altBN128P);
            yy.redIAdd(altBN128B);
            y = yy.redSqrt();
        } while (!y.redSqr().eq(yy));

        const ecHash = x.fromRed();
        if (odd) {
            ecHash.ixor(oddToggle);
        }
        collectionIds.push(`0x${ecHash.toString(16, 64)}`);
    }

    return collectionIds;
}


/**
 * Calculates the ERC1155 token Ids given a conditionId
 * @param conditionId 
 * @param collateral 
 * @param outcomeSlotCount 
 * @returns 
 */
export const calculatePositionIds = (
    conditionId: string,
    collateral: string,
    outcomeSlotCount: number
) : string[] => {
    
    return calculateCollectionIds(conditionId, outcomeSlotCount).map((collectionId) => {
        const positionId = keccak256(
            ["address", "uint256"],
            [ethers.utils.getAddress(collateral), collectionId],
        );
        return new BN(positionId.replace("0x", ""), "hex").toString();
    });
}
