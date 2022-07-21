import { expect } from 'chai';
import 'mocha';

const helloTest = function(){ return true; }

describe('First test', 
  () => { 
    it('should return true', () => { 
      const result = helloTest();
      expect(result).to.equal(true); 
  }); 
});

