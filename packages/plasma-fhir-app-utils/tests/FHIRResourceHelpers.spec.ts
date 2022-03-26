import { expect } from 'chai';
import 'mocha';

import { FHIRResourceHelpers as PlasmaFHIR } from '../src';

describe("Range", () => {

  it("Should parse different range formats", () => {
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

});

describe("Period", () => {

  it("Should parse different DOB formats", () => {
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


const helloTest = function(){ return true; }

describe('First test', 
  () => { 
    it('should return true', () => { 
      const result = helloTest();
      expect(result).to.equal(true); 
  }); 
});

