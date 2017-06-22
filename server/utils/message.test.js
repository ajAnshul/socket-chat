const expect = require('expect');
var {genMessage, genLocationMessage} = require('./message');

describe('Generate message',()=>{
  it('Should return object with createdAt ',()=>{
    var from = "Test from";
    var text = "testeing message";
    var obj = genMessage(from, text);
    expect(obj).toInclude({from, text});
    expect(obj.from).toBe(from);
    expect(obj.text).toBe(text);
    expect(obj.createdAt).toBeA('number');
  })

})

describe('Generate Location message',()=>{
  it('Should return object with createdAt and location url ',()=>{
    var from = "Test admin";
    var latitude = 12.8366438;
    var longitude = 77.657088;
    var url = 'https://www.google.co.in/maps?q='+latitude+','+longitude;
    var obj = genLocationMessage(from, latitude, longitude);
    expect(obj).toInclude({from, url});
    expect(obj.from).toBe(from);
    expect(obj.url).toBe(url);
    expect(obj.createdAt).toBeA('number');
  })

})
