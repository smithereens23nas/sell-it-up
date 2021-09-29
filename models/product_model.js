class Product {
  constructor (data, id) { // data is going to be an obj for the product inf
    this.id = id;
    this.name = data.name;
    this.price = data.price;
    this.image = data.image
  }
}


class Collection {
  #Model
  #currentId
  #items

  constructor(model, startingData){
    this.#Model = model;
    this.#currentId = 0;
    this.#items = this.#populateItems(startingData);
  }

  
  /**
 * @param {object} data
 * @param { function } callBack Will return error or item
 * @returns function;
*/

create( data, callBack ) {
  if (!data) return console.log("missing data in first argument");

  if (typeof callBack !== "function") {
    return console.log("missing function in second argument");
    }

    let error, newItem;

    const isEmpty = Object.keys(data).every(field => data[field] === "");

  if (isEmpty) {
    error = { message: `you have empty fields` };
  } else {
    
    newItem = new this.#Model( data, this.#generateId());

    this.#items[newItem.id] = newItem;
  }

  return callBack(error, newItem);
}

  /**
   * @description It will take an array as a argument 
   * @returns on Object that contains the { id as a key } and { te item as the value } 
   */
  #populateItems (startingData) {
    return startingData.reduce((acc, currentItem, idx) => {
      this.#currentId = idx;
      acc[this.#currentId] = new this.#Model(currentItem, this.#currentId)

      return acc
    }, {})
  }

  #generateId(){
    return ++this.#currentId
  }
  
  /**
   * @description Will return an array with all items availible in this.#items
   * @returns array
  */

  find(callback){
    // return callback( this.#items )
    return callback( Object.values(this.#items) )
  } 

  /**
   * @description Will return item match with the itemId
   * @param { string } itemId
   * @param { function } callBack Will return error or item
   * @returns function;
   */

  findById( itemId, callback ){
    if (!itemId ) return console.log('missing itemId at first argument');

    if (typeof callback !== 'function' ) return console.log('missing callback at second argument');

    let error = null;
    const item = this.#items[itemId];

    if(!item) {
      error = { message: `item with id "${itemId}" can't be found` };
    }

    return callback(error, item)
  }
}

const collection = new Collection(Product, [
  {
      name: 'Internet Friends',
      price: 29,
      image:
      'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
  },
  {
      name: 'Angry Pants',
      price: 35,
      image:
      'https://cdn.shopify.com/s/files/1/1297/1509/products/HERO_c5b0ec76-ad06-4cc7-a165-6129e11a8ff6_x1440.jpg?v=1571274622',
  },
  {
      name: 'Dead Cool',
      price: 50,
      image:
      'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_40030160-f468-4d50-8f30-c8b9733ce84e_x1440.jpg?v=1575020412',
  },
])

module.exports = collection;
