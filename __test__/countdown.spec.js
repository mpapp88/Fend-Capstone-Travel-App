import { getCountdown } from "../src/client/js/countdown";
import 'babel-polyfill'

describe("Testing the Date Countdown functionality", () => {
    test("Testing the getCountdown() function", () => {
        expect(getCountdown).toBeDefined();
    })
});