import CardHelper from "./CardHelper";

/**
 * Helpful methods for cards list wrapper
 */
export default class WrapperHelper {
    static getWidth(): number {
        return $(window).width() - 400 - 80; // window - 2 sidebars & margins + paddings (left + right)
    }
    
    /**
     * 48 (score), 24 (cards type), 38 (ends game btn), 4 (mb-1), 16 (mb-3), 24 (bottom line), 30 (just our margin)
     */
    static getHeight(): number {
        return $(window).height() - 48 - 4 - 24 - 4 - 38 - 16 - 24 - 30;
    }
    
    static calculatePadding(): number {
        const Cx = CardHelper.calculateWidth();
        const Wx = this.getWidth();
        const perRow = Math.floor(Wx / Cx);
        return Wx - perRow * Cx;
    }
}