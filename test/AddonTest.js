const chai = require("chai");
const expect = chai.expect;
const PlanService = require('../src/AddonService');

describe("Addon Service", function () {
    it("file not found", function () {
        const addonService = new AddonService();
        expect(addonService.invokeAddon()).to.throw(new Error('NO_FILE'));
    });
});
