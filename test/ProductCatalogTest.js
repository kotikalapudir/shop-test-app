const chai = require("chai");
const expect = chai.expect;
const PlanService = require('../src/PlanService');

describe("Plan Service", function () {
    it("file not found", function () {
        const planService = new PlanService();
        expect(planService.invokePlan()).to.throw(new Error('NO_FILE'));
    });
});
