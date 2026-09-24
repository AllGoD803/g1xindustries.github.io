const test=require('node:test');
const assert=require('node:assert/strict');
const e=require('../engine.js');
test('exact product references distinguish Silk+ Gold from Basic Gold',()=>{
  assert.deepEqual(e.candidates('Bambu Lab PLA Silk+ Gold 13405').map(x=>x.material),['PLA Silk+']);
  assert.deepEqual(e.candidates('10401').map(x=>x.material),['PLA Basic']);
  assert.deepEqual(e.candidates('1231340512345'),[]);
  assert.equal(e.candidates('13405 13109').length,2);
  assert.equal(e.candidates('99999').length,0);
});
test('CAD prices accept French decimals and distinguish unknown from zero',()=>{
  const base={brand:'Test',material:'PLA',color:'Blue',quantity:'2'};
  assert.equal(e.validateRecord({...base,unitPrice:'19,99'}).unitPrice,19.99);
  assert.equal(e.validateRecord({...base,unitPrice:''}).unitPrice,null);
  assert.equal(e.validateRecord({...base,unitPrice:'0'}).unitPrice,0);
  for(const unitPrice of ['-1','Infinity','1e4','15.555','abc'])assert.throws(()=>e.validateRecord({...base,unitPrice}));
  for(const quantity of ['0','1.5','-1','1001'])assert.throws(()=>e.validateRecord({...base,quantity}));
});
test('inventory totals use cents and exclude unpriced spools',()=>{
  assert.deepEqual(e.totals([{quantity:3,unitPrice:19.99},{quantity:2,unitPrice:null},{quantity:1,unitPrice:0}]),{quantity:6,cents:5997,unpriced:2});
});
test('imports validate the full file before replacing any data',()=>{
  const item={brand:'Bambu Lab',material:'PLA Silk+',color:'Gold',code:'13405',quantity:1,unitPrice:20};
  assert.equal(e.importRecords({app:'G1X Filaments',version:1,items:[item]})[0].hex,'#C99B42');
  assert.throws(()=>e.importRecords({app:'Other',version:1,items:[item]}));
  assert.throws(()=>e.importRecords({app:'G1X Filaments',version:1,items:[item,{...item,quantity:0}]}));
  assert.throws(()=>e.importRecords({app:'G1X Filaments',version:1,items:Array(501).fill(item)}));
});
