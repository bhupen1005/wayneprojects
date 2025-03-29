const arrayOfObjects = [
  {
    id: 1,
    name: "John",
    age: 25,
    city: "New York",
    employed: true,
    salary: 50000,
  },
  {
    id: 2,
    name: "Jane",
    age: 30,
    city: "Los Angeles",
    employed: false,
    salary: 0,
  },
  {
    id: 3,
    name: "Mike",
    age: 35,
    city: "Chicago",
    employed: true,
    salary: 60000,
  },
  {
    id: 4,
    name: "Sara",
    age: 28,
    city: "Miami",
    employed: true,
    salary: 70000,
  },
  { id: 5, name: "Tom", age: 22, city: "Seattle", employed: false, salary: 0 },
  {
    id: 6,
    name: "Anna",
    age: 29,
    city: "Boston",
    employed: true,
    salary: 80000,
  },
  {
    id: 7,
    name: "Chris",
    age: 31,
    city: "San Francisco",
    employed: false,
    salary: 0,
  },
  {
    id: 8,
    name: "Kate",
    age: 27,
    city: "Austin",
    employed: true,
    salary: 90000,
  },
];

const examples = {
  // TIP: get new array after removing a property from each object in the array
  // Returns: A new array with the specified property removed from each object.
  removePropertyAndGetNewArray: (array, property) =>
    array.map(({ [property]: _, ...rest }) => rest),

  // TIP: get new array after adding a property in each object in the array
  // Returns: A new array with the specified property added to each object.
  addProperty: (array, property, value) =>
    array.map((item) => ({ ...item, [property]: value })),

  // TIP: get new array after adding a property in each object in the array with a callback function
  // Returns: A new array with the specified property added to each object using the callback function.
  addProperty2: (array, property, valueCallback) =>
    array.map((item) => ({ ...item, [property]: valueCallback(item) })),

  // TIP: get new array with objects filtered based on a condition
  // Returns: A new array with objects that satisfy the condition.
  filterArray: (array, conditionCallback) => array.filter(conditionCallback),

  // TIP: get new array where a specific key has a specific value
  // Returns: A new array with objects where object[key] === value
  filterByKeyValue: (array, key, value) =>
    array.filter((item) => item[key] === value),

  // TIP: Get new array where a specific key has more than a specific value
  // Returns: A new array with objects where object[key] > value
  filterByKeyValueMoreThan: (array, key, value) =>
    array.filter((item) => item[key] > value),

  // TIP: filter array by truthy values of a key
  // Returns: A new array where the specified key is truthy
  filterFalsy: (array, key) => array.filter((item) => Boolean(item[key])),

  // TIP: filter array by a range on a numeric key
  // Returns: A new array where object[key] is between min and max (inclusive)
  filterByRange: (array, key, min, max) =>
    array.filter((item) => item[key] >= min && item[key] <= max),

  // TIP: get new array with objects sorted by a specific property
  // Returns: A new array with objects sorted by the specified property.
  sortArrayByProperty: (array, property, ascending = true) =>
    array.slice().sort((a, b) => {
      if (a[property] < b[property]) return ascending ? -1 : 1;
      if (a[property] > b[property]) return ascending ? 1 : -1;
      return 0;
    }),

  // TIP: extract values of a specific property into an array
  // Returns: An array containing only the values of the specified key
  pluckProperty: (array, key) => array.map((item) => item[key]),

  // TIP: convert array to an object using a key as ID
  // Returns: A key-value object using item[key] as key
  toKeyValueObject: (array, key) =>
    array.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {}),

  // TIP: group array of objects by a property
  // Returns: An object with arrays grouped by the value of the given key
  groupByProperty: (array, key) =>
    array.reduce((acc, item) => {
      const groupKey = item[key];
      acc[groupKey] = acc[groupKey] || [];
      acc[groupKey].push(item);
      return acc;
    }, {}),

  // TIP: get the sum of values of a numeric key
  // Returns: A single number as the sum of values from the key
  sumByProperty: (array, key) =>
    array.reduce((sum, item) => sum + (item[key] || 0), 0),

  // TIP: get the average value of a numeric key
  // Returns: A single number as the average of values from the key
  averageByProperty: (array, key) => {
    const total = array.reduce((sum, item) => sum + (item[key] || 0), 0);
    return array.length ? total / array.length : 0;
  },

  // TIP: find the first object that matches a key-value pair
  // Returns: The first matching object or undefined
  findByProperty: (array, key, value) =>
    array.find((item) => item[key] === value),

  // TIP: check if any object in array contains a specific key-value
  // Returns: true if found, false otherwise
  includesValue: (array, key, value) =>
    array.some((item) => item[key] === value),

  // TIP: check if all objects match a key-value pair
  // Returns: true only if all match
  allMatch: (array, key, value) => array.every((item) => item[key] === value),

  // TIP: remove duplicate objects based on a key
  // Returns: A new array with unique items by key
  removeDuplicatesByKey: (array, key) => {
    const seen = new Set();
    return array.filter((item) => {
      if (seen.has(item[key])) return false;
      seen.add(item[key]);
      return true;
    });
  },

  // TIP: count frequency of values in a key
  // Returns: An object with counts of each value of the key
  countByKey: (array, key) =>
    array.reduce((acc, item) => {
      const value = item[key];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {}),

  // TIP: rename a key in each object
  // Returns: A new array with renamed key
  renameKey: (array, oldKey, newKey) =>
    array.map(({ [oldKey]: old, ...rest }) => ({ ...rest, [newKey]: old })),

  // TIP: split array into chunks
  // Returns: An array of arrays, each of size n
  chunkArray: (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  },

  // TIP: reverse an array without mutating original
  // Returns: A new reversed array
  reverseArray: (array) => [...array].reverse(),

  // TIP: get all unique values of a key
  // Returns: An array of unique values from the given key
  getUniqueValuesOfKey: (array, key) => [
    ...new Set(array.map((item) => item[key])),
  ],

  // TIP: sort array by multiple keys
  // Returns: A new array sorted by multiple keys in order
  sortByMultipleKeys: (array, keys) =>
    array.slice().sort((a, b) => {
      for (let key of keys) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    }),
};

// Example usage (run one at a time to test)
// console.log(examples.sumByProperty(arrayOfObjects, "salary"));
// console.log(examples.filterByRange(arrayOfObjects, "age", 25, 30));
// console.log(examples.chunkArray(arrayOfObjects, 3));

examples
  .filterByKeyValue(arrayOfObjects, "employed", true)
  .forEach((item) => console.log(item.name)); // John, Mike, Sara, Anna, Kate
