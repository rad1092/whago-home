import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";
const script=await readFile(new URL('../public/data-move.js',import.meta.url),'utf8');
const context=vm.createContext({});vm.runInContext(script,context);
const {collect,tasksCsv}=context.WhagoRecovery;
function storage(items){return {length:items.length,key:i=>items[i]?.[0]??null,getItem:key=>items.find(x=>x[0]===key)?.[1]??null,setItem(){throw Error('Recovery must not write')},removeItem(){throw Error('Recovery must not delete')}}}

test('recovery includes current, old, snapshots and damaged original Daymark data unchanged',()=>{
  const original=' {"schemaVersion":3,"tasks":[],"plans":[]}\n';
  const records=collect(storage([['daymark:data:v3',original],['daymark:data:v2','{"tasks":[]}'],['daymark:data:corrupt:v3','{broken'],['daymark:snapshots:v3','[]'],['unrelated:private','secret']]),'Daymark');
  assert.equal(records.length,4);
  assert.equal(records.find(r=>r.key==='daymark:data:v3').raw,original);
  assert.equal(records.find(r=>r.key==='daymark:data:corrupt:v3').raw,'{broken');
  assert.equal(records.find(r=>r.key==='daymark:data:corrupt:v3').parsed,null);
  assert.ok(records.every(r=>r.key.startsWith('daymark:')));
});
test('Siteboard recovery includes project wrappers and legacy documents, excludes other app state',()=>{
  const records=collect(storage([['siteboard.project.v1','{"document":{"site":{"name":"사업"}}}'],['siteboard.document.v2','{"schemaVersion":2}'],['siteboard.project.recovery.raw','damaged'],['daymark:data:v3','private']]),'Siteboard');
  assert.equal(records.length,3); assert.ok(records.every(r=>r.key.startsWith('siteboard.')));
});
test('portable CSV retains Korean, quotes, newlines and neutralizes spreadsheet formulas',()=>{
  const csv=tasksCsv({tasks:[{title:'할 일 "하나"',notes:'첫 줄\n둘째 줄',nextStep:'=HYPERLINK("https://example.com")',status:'inbox'}]});
  assert.ok(csv.startsWith('\uFEFF')); assert.ok(csv.includes('"할 일 ""하나"""')); assert.ok(csv.includes('"첫 줄\n둘째 줄"')); assert.ok(csv.includes('"\'=HYPERLINK'));
  assert.equal(tasksCsv({unknown:true}),null);
});
test('unknown product and denied storage fail without broadening reads',()=>{
  assert.throws(()=>collect(storage([]),'Unknown'),/Unknown product/);
  assert.throws(()=>collect({get length(){throw Error('denied')}},'Daymark'),/denied/);
});
