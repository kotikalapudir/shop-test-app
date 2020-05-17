const chai = require("chai");
const expect = chai.expect;
const PlanService = require('../src/AddonService');

describe("Addon Service", function () {
    it("file not found", function () {
        const addonService = new AddonService();
        expect(addonService.invokeAddon.bind()).to.throw(Error, '!!!!!!!No Addon Input file found !!!!!');
    });
});
