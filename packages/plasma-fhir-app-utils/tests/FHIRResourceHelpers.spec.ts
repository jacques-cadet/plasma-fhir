import { expect } from 'chai';
import 'mocha';

import { FHIRResourceHelpers as PlasmaFHIR, DateTimeUtils, Convert } from '../src';

describe("Range", () => {

  it("Range.fromString()", () => {
    let result = null;

    // "3"
    result = PlasmaFHIR.Range.fromString("3");
    expect(result?.low?.value).to.equal(3);
    expect(result?.high?.value).to.be.undefined;

    // "3-5"...
    result = PlasmaFHIR.Range.fromString("3-5");
    expect(result?.low?.value).to.equal(3);
    expect(result?.high?.value).to.equal(5);

    // "3 - 5"...
    result = PlasmaFHIR.Range.fromString("3 - 5");
    expect(result?.low?.value).to.equal(3);
    expect(result?.high?.value).to.equal(5);

    // "zzz"...
    result = PlasmaFHIR.Range.fromString("zzz");
    expect(result).to.be.undefined;
  });

  it("Range.fromAgeString()", () => {
    let result = null;

    // "30s"
    result = PlasmaFHIR.Range.fromAgeString("30s");
    expect(result?.low?.value).to.equal(30);
    expect(result?.high?.value).to.equal(39);

    // "30's"...
    result = PlasmaFHIR.Range.fromAgeString("30's");
    expect(result?.low?.value).to.equal(30);
    expect(result?.high?.value).to.equal(39);
  });

  it("Range.toString()", () => {
    const r1 = PlasmaFHIR.Range.fromNumbers(0);
    const r2 = PlasmaFHIR.Range.fromNumbers(0, 10);

    expect(PlasmaFHIR.Range.toString(r1)).to.equal("0");
    expect(PlasmaFHIR.Range.toString(r2)).to.equal("0 - 10");    
  });

});

describe("Period", () => {

  it("Period.fromAgeString()", () => {
    let result = null;
    const now = new Date(2010, 5, 10);    // June 10, 2010

    // "3"
    result = PlasmaFHIR.Period.fromAgeString("3", now);
    expect(result!.start).to.equal( (new Date(2007, 5, 10)).toISOString() );
    expect(result!.end).to.equal( (new Date(2006, 5, 10)).toISOString() );

    // "3-5"...
    result = PlasmaFHIR.Period.fromAgeString("3-5", now);
    expect(result!.start).to.equal( (new Date(2007, 5, 10)).toISOString() );
    expect(result!.end).to.equal( (new Date(2004, 5, 10)).toISOString() );

    // "3 - 5"...
    result = PlasmaFHIR.Period.fromAgeString("3 - 5", now);
    expect(result!.start).to.equal( (new Date(2007, 5, 10)).toISOString() );
    expect(result!.end).to.equal( (new Date(2004, 5, 10)).toISOString() );

    // "30's"...
    result = PlasmaFHIR.Period.fromAgeString("30's", now);
    expect(result!.start).to.equal( (new Date(1980, 5, 10)).toISOString() );
    expect(result!.end).to.equal( (new Date(1970, 5, 10)).toISOString() );

    // "30s"...
    result = PlasmaFHIR.Period.fromAgeString("30s", now);
    expect(result!.start).to.equal( (new Date(1980, 5, 10)).toISOString() );
    expect(result!.end).to.equal( (new Date(1970, 5, 10)).toISOString() );

  });

});

describe("DateTimeUtils", () => {
  it("getDOBFromAge", () => {
    let result = null;
    const now = new Date(2010, 5, 10);    // June 10, 2010
    
    result = DateTimeUtils.getDOBFromAge(30, now);
    expect(result.dobStart.getTime()).to.equal( (new Date(1980, 5, 10)).getTime() );
    expect(result.dobEnd.getTime()).to.equal( (new Date(1979, 5, 10)).getTime() );
  });

  it("getAgeFromDOB", () => {
    let result = null;
    const now = new Date(2010, 5, 10);    // June 10, 2010

    result = DateTimeUtils.getAgeFromDOB(new Date(1980, 5, 10), now);
    expect(result).to.equal(30);
  });
});

describe("Convert", () => {
  it("Converter Lookup", () => {
    let converter = Convert.findConverter("kg", "lbs");
    expect(converter).not.to.be.undefined;

    let value = converter!(1);
    expect(value).to.equal(2.20462);
  });

});

const helloTest = function(){ return true; }

describe('First test', 
  () => { 
    it('should return true', () => { 
      const result = helloTest();
      expect(result).to.equal(true); 
  }); 
});

