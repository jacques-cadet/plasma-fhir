"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const src_1 = require("../src");
describe("Range", () => {
    it("Range.fromString()", () => {
        var _a, _b, _c, _d, _e, _f;
        let result = null;
        // "3"
        result = src_1.FHIRResourceHelpers.Range.fromString("3");
        (0, chai_1.expect)((_a = result === null || result === void 0 ? void 0 : result.low) === null || _a === void 0 ? void 0 : _a.value).to.equal(3);
        (0, chai_1.expect)((_b = result === null || result === void 0 ? void 0 : result.high) === null || _b === void 0 ? void 0 : _b.value).to.be.undefined;
        // "3-5"...
        result = src_1.FHIRResourceHelpers.Range.fromString("3-5");
        (0, chai_1.expect)((_c = result === null || result === void 0 ? void 0 : result.low) === null || _c === void 0 ? void 0 : _c.value).to.equal(3);
        (0, chai_1.expect)((_d = result === null || result === void 0 ? void 0 : result.high) === null || _d === void 0 ? void 0 : _d.value).to.equal(5);
        // "3 - 5"...
        result = src_1.FHIRResourceHelpers.Range.fromString("3 - 5");
        (0, chai_1.expect)((_e = result === null || result === void 0 ? void 0 : result.low) === null || _e === void 0 ? void 0 : _e.value).to.equal(3);
        (0, chai_1.expect)((_f = result === null || result === void 0 ? void 0 : result.high) === null || _f === void 0 ? void 0 : _f.value).to.equal(5);
        // "zzz"...
        result = src_1.FHIRResourceHelpers.Range.fromString("zzz");
        (0, chai_1.expect)(result).to.be.undefined;
    });
    it("Range.fromAgeString()", () => {
        var _a, _b, _c, _d;
        let result = null;
        // "30s"
        result = src_1.FHIRResourceHelpers.Range.fromAgeString("30s");
        (0, chai_1.expect)((_a = result === null || result === void 0 ? void 0 : result.low) === null || _a === void 0 ? void 0 : _a.value).to.equal(30);
        (0, chai_1.expect)((_b = result === null || result === void 0 ? void 0 : result.high) === null || _b === void 0 ? void 0 : _b.value).to.equal(39);
        // "30's"...
        result = src_1.FHIRResourceHelpers.Range.fromAgeString("30's");
        (0, chai_1.expect)((_c = result === null || result === void 0 ? void 0 : result.low) === null || _c === void 0 ? void 0 : _c.value).to.equal(30);
        (0, chai_1.expect)((_d = result === null || result === void 0 ? void 0 : result.high) === null || _d === void 0 ? void 0 : _d.value).to.equal(39);
    });
    it("Range.toString()", () => {
        const r1 = src_1.FHIRResourceHelpers.Range.fromNumbers(0);
        const r2 = src_1.FHIRResourceHelpers.Range.fromNumbers(0, 10);
        (0, chai_1.expect)(src_1.FHIRResourceHelpers.Range.toString(r1)).to.equal("0");
        (0, chai_1.expect)(src_1.FHIRResourceHelpers.Range.toString(r2)).to.equal("0 - 10");
    });
});
describe("Period", () => {
    it("Period.fromAgeString()", () => {
        let result = null;
        const now = new Date(2010, 5, 10); // June 10, 2010
        // "3"
        result = src_1.FHIRResourceHelpers.Period.fromAgeString("3", now);
        (0, chai_1.expect)(result.start).to.equal((new Date(2007, 5, 10)).toISOString());
        (0, chai_1.expect)(result.end).to.equal((new Date(2006, 5, 10)).toISOString());
        // "3-5"...
        result = src_1.FHIRResourceHelpers.Period.fromAgeString("3-5", now);
        (0, chai_1.expect)(result.start).to.equal((new Date(2007, 5, 10)).toISOString());
        (0, chai_1.expect)(result.end).to.equal((new Date(2004, 5, 10)).toISOString());
        // "3 - 5"...
        result = src_1.FHIRResourceHelpers.Period.fromAgeString("3 - 5", now);
        (0, chai_1.expect)(result.start).to.equal((new Date(2007, 5, 10)).toISOString());
        (0, chai_1.expect)(result.end).to.equal((new Date(2004, 5, 10)).toISOString());
        // "30's"...
        result = src_1.FHIRResourceHelpers.Period.fromAgeString("30's", now);
        (0, chai_1.expect)(result.start).to.equal((new Date(1980, 5, 10)).toISOString());
        (0, chai_1.expect)(result.end).to.equal((new Date(1970, 5, 10)).toISOString());
        // "30s"...
        result = src_1.FHIRResourceHelpers.Period.fromAgeString("30s", now);
        (0, chai_1.expect)(result.start).to.equal((new Date(1980, 5, 10)).toISOString());
        (0, chai_1.expect)(result.end).to.equal((new Date(1970, 5, 10)).toISOString());
    });
});
const helloTest = function () { return true; };
describe('First test', () => {
    it('should return true', () => {
        const result = helloTest();
        (0, chai_1.expect)(result).to.equal(true);
    });
});
