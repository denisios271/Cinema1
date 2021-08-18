import WrapperHelper from "./WrapperHelper";
import { CARD_HEIGHT_TO_CARD_WIDTH, CARDS_COUNT } from "./constants";

export default class CardHelper {
    static calculateWidth(): number {
        let Cx: number; // card's width
    
        const Wx = WrapperHelper.getWidth();
        const Wy = WrapperHelper.getHeight();
        const CyToCx = CARD_HEIGHT_TO_CARD_WIDTH; // card's height / card's width
        const Cc: number = CARDS_COUNT; // all visible cards on table
        
        Cx = Math.sqrt((Wy * Wx) / (Cc * CyToCx));
        Cx *= 0.90; // we don't want to show on ALL table, just on a part of it
        return Cx > 0 ? Math.floor(Cx) : 80; // 80 is a default value, we don't want to break something if there is nothing on the page
    }
    
    static calculateMarginAndWidth(calculatedWidth: number): { width: number, margin: number } {
        return {
            margin: calculatedWidth * 0.3,
            width: calculatedWidth * 0.7,
        }
    }
}