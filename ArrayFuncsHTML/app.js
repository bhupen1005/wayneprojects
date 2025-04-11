const users = [
  { id: 1, name: "Alice", age: 28 },
  { id: 2, name: "Bob", age: 35 },
  { id: 3, name: "Charlie", age: 28 },
  { id: 4, name: "Goumat", age: 30 },
  { id: 5, name: "Rack", age: 33 },
  { id: 6, name: "AJStyle", age: 45 },
];

const actions = [
  {
    label: "Get single user where: _.find(users, { age: 33 })",
    fn: () => _.find(users, { age: 33 }),
  },
  {
    label: "Get all values of a user: _.values(users[3])",
    fn: () => _.values(users[3]),
  },
  {
    label: "Get all values of a key: _.map(users, 'name')",
    fn: () => _.map(users, "name"),
  },
  {
    label: "Get all values of a key: _.map(users, 'age')",
    fn: () => _.map(users, "age"),
  },
  {
    label: "Clone an object: _.cloneDeep(users)",
    fn: () => _.cloneDeep(users),
  },
  {
    label:
      'Check if equal : _.isEqual(users[0], { id: 1, name: "Alice", age: 28 })',
    fn: () => _.isEqual(users[0], { id: 1, name: "Alice", age: 28 }),
  },
  {
    label: "Any Exists? : _.some(users, { age: 35 })",
    fn: () => _.some(users, { age: 35 }),
  },
  {
    label: "All Exists? : _.every(users, { age: 35 })",
    fn: () => _.every(users, { age: 35 }),
  },
  {
    label: "Key exists? : _.has(users[0], 'name')",
    fn: () => _.has(users[0], "name"),
  },
  {
    label: "Key exists? : _.has(users[0], 'game')",
    fn: () => _.has(users[0], "gaame"),
  },
  {
    label: "_.isEmpty([])",
    fn: () => _.isEmpty([]),
  },
  {
    label: "_.isEmpty(users)",
    fn: () => _.isEmpty(users),
  },
  {
    label: "_.inRange(users[0].age, 25, 30)",
    fn: () => _.inRange(users[0].age, 25, 30),
  },
  {
    label: "Omit keys from an object: _.omit(users[0], ['age'])",
    fn: () => _.omit(users[0], ["age"]),
  },
  {
    label: "Count occurance of all values: _.countBy(users, 'age')",
    fn: () => _.countBy(users, "age"),
  },
  {
    label: "Count occurance of all values: _.countBy(users, 'name')",
    fn: () => _.countBy(users, "name"),
  },
  {
    label: "Omit by datatype: _.omitBy(users[0], _.isNumber)",
    fn: () => _.omitBy(users[0], _.isNumber),
  },
  {
    label: "Omit by datatype: _.omitBy(users[0], _.isString)",
    fn: () => _.omitBy(users[0], _.isString),
  },
  {
    label: "Null Check _.isNil(users[0].middleName)",
    fn: () => _.isNil(users[0].middleName),
  },
  {
    label: "Maxium By: _.maxBy(users, 'age')",
    fn: () => _.maxBy(users, "age"),
  },
  {
    label: "Min By: _.maxBy(users, 'age')",
    fn: () => _.minBy(users, "age"),
  },
  {
    label: "Array Size: _.size(users)",
    fn: () => _.size(users),
  },
  {
    label: "Find all where: _.filter(users, { age: 28 })",
    fn: () => _.filter(users, { age: 28 }),
  },
  {
    label: "Find all where :_.filter(users, (o) => o.name !== 'Alice')",
    fn: () => _.filter(users, (o) => o.name !== "Alice"),
  },
  {
    label: "Find Single where: _.find(users, { age: 28 })",
    fn: () => _.find(users, { age: 28 }),
  },
  {
    label:
      "Convert Array to Object and use id values as indexes: _.keyBy(users, 'id')",
    fn: () => _.keyBy(users, "id"), // this function will convert the array to an object with the id as the key // It will work like a dictionary
  },
  {
    label:
      "Convert Array to Object and use name values as indexes: _.keyBy(users, 'name')",
    fn: () => _.keyBy(users, "name"),
  },
  {
    label:
      "Change array to an object with unique key value pairs: _.mapValues(_.keyBy(users, 'id'), u => u.name)",
    fn: () => _.mapValues(_.keyBy(users, "id"), (u) => u.name),
  },
  {
    label: "Check: _.includes(_.map(users, 'name'), 'Bob')",
    fn: () => _.includes(_.map(users, "name"), "Bob", "Alice"),
  },
  {
    label: "Check: _.includes([1, 2, 3], 1",
    fn: () => _.includes([1, 2, 3], 1), // It's giving false because we are searching from index 2
  },
  {
    label: "Check: _.includes([1, 2, 3], 1, 2 (2 is index))",
    fn: () => _.includes([1, 2, 3], 1, 2), // It's giving false because we are searching from index 2
  },
  {
    label: "Get value of: _.get(users[0], 'name')",
    fn: () => _.get(users[0], "name"),
  },
];

const buttonsContainer = document.getElementById("buttons");
const outputEl = document.getElementById("output");
const originalEl = document.getElementById("original");

// Show original data
originalEl.textContent = JSON.stringify(users, null, 2);

// Generate buttons
actions.forEach((action) => {
  const btn = document.createElement("button");
  btn.textContent = action.label;
  btn.addEventListener("click", () => {
    const result = action.fn();
    outputEl.textContent = JSON.stringify(result, null, 2);
  });
  buttonsContainer.appendChild(btn);
});
