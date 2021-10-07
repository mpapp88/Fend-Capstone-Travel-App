import { handleSubmit } from "../src/client/js/app";
import 'babel-polyfill'

describe("Testing the form submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    })
});