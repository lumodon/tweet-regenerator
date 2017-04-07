
const sha256 = require('sha256')

class HashTable {
  constructor(){
    this.data = {}
    this.length = 0
  }

  put(key, value){
    if(this.data[sha256(key)] !== undefined) {
      if( this.data[sha256(key)] instanceof Array ) {
        this.data[sha256(key)].push( value )
      } else {
        let tempObj = this.data[sha256(key)]
        this.data[sha256(key)] = []
        this.data[sha256(key)].push(tempObj)
        this.data[sha256(key)].push(value)
      }
    } else {
      this.data[sha256(key)] = value
    }
    this.length++
  }

  get(key){
    return this.data[sha256(key)]
  }

  contains(key){
    return this.data.hasOwnProperty(sha256(key))
  }

  iterate(callback){
    for(let element in this.data){
      if(this.data.hasOwnProperty(element)){
        callback(element)
      }
    }
  }

  removes(key){
    delete this.data[sha256(key)]
    this.length--
  }

  size(){
    return this.length
  }
}

const myTable = new HashTable()

myTable.put('firstName', 'conner')
myTable.put('firstName', 'frank')

console.log( myTable.get('firstName') )