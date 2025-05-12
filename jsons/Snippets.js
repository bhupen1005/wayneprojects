const form = {
  DynamicForm: {
    props: {
      schema: {},
      values: {},
      onsubmit: () => {},
      onChange: () => {},
      oncancel: () => {},
      submitText: "Submit",
    },
    CustomCard: Component,
    DynamicInput: {
      props: {
        schema: {},
        value: [],
        ...props,
      },
      Checkbox: {
        props: {
          schema: {},
          value: [],
          ...props,
        },
      },
      Dropdown: {
        props: {
          schema: {},
          value: [],
          ...props,
        },
      },
      BaseInput: {
        props: {
          schema: {},
          value: [],
          ...props,
        },
      },
    },
    Button: {
      props: {
        text: "Submit",
        onClick: () => {},
      },
    },
  },
};

const actionRules = {
  Prompt: {
    props: {
      when: Boolean,
      message: String,
    },
  },
  SmartSpinner: {
    props: {
      actions: [],
    },
  },
  ParameterTanstackTable: {
    props: {
      tableData: {},
      rowSelectionType: "multi",
      handleRowClick: () => {},
      handleTableEdit: () => {},
      isFilterOn: true,
      nonEditableFields: [],
      onHandleInlineEdit: () => {},
      onHandleInlineDelete: () => {},
      onHandleInlineCopy: () => {},
      keyField: "action_rule",
      isActionButton: true,
      hiddenColumnsData: [],
      editMode: false,
      schemaName: "action_rule_schema",
      getRowClassname: () => {},
      defaultPageSize: 10,
      shouldRowSelectionClear: false,
      isRowExpandable: true,
      handleRowExpand: () => {},
      headerButtons: () => {},
    },
    CustomCard: Component,
    JSX: UI,
  },
};

const DynamicInputComponent = {
  schema: {
    type: {
      Boolean,
      Integer,
    },
    format: {
      date,
      integer,
    },
    enum: [],
    title,
    key,
  },
  value,
  ...props,
};

const table = {
  data,
  columns,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  getRowCanExpand,
  onExpandedChange,
  enableColumnFilters,
  onRowSelectionChange,
  enableRowSelection,
  enableMultiRowSelection,
  getRowId,
  state: {
    sorting,
    columnFilters,
    rowSelection,
    columnVisibility,
    expanded,
  },
  initialState: {
    columnVisibility,
    pagination,
    rowSelection,
  },
  onSortingChange,
  onColumnFiltersChange,
  filterFns: {
    myCustomFilterFn,
    numberFilterFn,
    dateFilterFn,
    stringFilterFn,
  },
  autoResetPageIndex,
};

const complexInput = {
  inputField,
  inputFieldWithLabel,
  inputFieldWithLabelAndError,
  DynamicInputField,
};

const HandleTableChange = {
  params: {
    row,
    column,
    value,
    tableData,
  },
  // we have row in row.original
  // we have column id in column.id

  newData: {
    tableData: {
      map: {
        row: {
          // Delete few keys
          // Compare with row.original
          firstCondition: {},
          // if value is not equal to item[column.id]
          secondCondition: {
            newObject: {
              [column.id]: value,
            },
            validationOne: {
              // check if already exists in the array
              pass,
              throw: {
                message: "Already exists",
              },
            },
            validationTwo: {
              // check if already exists in the array
              pass,
              throw: {
                message: "Already exists",
              },
            },
            return: {},
          },
        },
      },
    },
  },
  newDataWithThresholds: {
    tempActionRule: {
      action_rule_itm: {
        map: {
          row: {
            newThreshHolds: {
              row: {
                thresholds: {
                  map: ({ item, index }) => {
                    return {
                      row: (index) => newData[index],
                    };
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const newThreshHolds = [
  {
    action: "action",
    measure_threshold: "measure_threshold",
    measure2_threshold: "measure2_threshold",
  },
];

const action_rule_itm = [
  {
    dtd_fr: "dtd_fr",
    thresholds: [
      {
        action: "action",
        measure_threshold: "measure_threshold",
        measure2_threshold: "measure2_threshold",
      },
    ],
  },
];

const actionRule = {
  action_rule_itm: [
    {
      dtd_fr: "dtd_fr",
      thresholds: [
        {
          action: "action",
          measure_threshold: "measure_threshold",
          measure2_threshold: "measure2_threshold",
        },
      ],
    },
  ],
};

const project = {
  apiRoutes: {
    BASE_URL: "https://api.example.com",
  },
};

const LinkedList = {
  Node: {
    data: null,
    next: null,
    Node: function (data) {
      this.data = data;
      this.next = null;
    },
  },
  head: null,
  isEmpty: function () {
    return this.head === null;
  },
  insertFirst: function (value) {
    const node = new this.Node(value);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  },
  insertAfter: function () {},
  insertLast: function () {},
  deleteFirst: function () {},
  deleteByValue: function () {},
  deleteLast: function () {},
};

const StaticArrayStack = {
  data: [],
  top: -1,
  StaticArrayStack: function (capacity) {
    this.data = new Array(capacity);
    this.top = -1;
  },
  push: function (value) {},
  pop: function () {},
  peek: function () {},
  isEmpty: function () {},
  isFull: function () {},
};

const DynamicArrayStack = {
  list: [],
  DynamicArrayStack: function () {
    this.list = new Array();
  },
  push: function (value) {},
  pop: function () {},
  peek: function () {},
  isEmpty: function () {},
};

const StaticArrayQueue = {
  data: [],
  front,
  rear,
  size,
  StaticArrayQueue: function (capacity) {
    this.data = new Array(capacity);
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  },
  isEmpty: function () {},
  isFull: function () {},
  enqueue: function (value) {},
  dequeue: function () {},
  peek: function () {},
};

const DynamicArrayQueue = {
  data: [],
  front,
  rear,
  size,
  DynamicArrayQueue: function () {
    this.data = new Array();
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  },
};

const INNERJOIN = {
  SELECT: {
    columns: ["column1", "column2"],
  },
  FROM: {
    tableName: "tableName",
  },
  "INNER JOIN": {
    tableName: "tableName",
    ON: {
      condition: "condition",
    },
  },
  WHERE: {
    condition: "condition",
  },
};

//SlidingWindow
const maxSum = {
  arr,
  n,
  k,
  max_sum: 0,
  for: {
    runFor: {
      i: 0,
      condition: i < n - k + 1, // i < n - k + 1 Most important line of code
      i: i + 1,
    },
    current_sum: 0,
    for: {
      runFor: {
        j: 0,
        condition: j < k,
        j: j + 1,
      },
      current_sum: current_sum + arr[i + j],
      max_sum: Math.max(max_sum, current_sum),
    },
  },
};

const testing = {
  _1: {
    Dialog: {
      for: { windows, web },
      methods: {
        createButton,
        createDialog,
      },
      contains: {
        button,
      },
    },
    button: {
      for: { windows, web },
      methods: {
        render,
        onClick,
      },
    },
  },
  _2: {
    Logistics: {
      for: { road, sea },
      methods: {
        planDelivery,
        createTransport: () => {
          if (this instanceof RoadLogistics) {
            return new Truck();
          } else if (this instanceof SeaLogistics) {
            return new Ship();
          }
        },
      },
    },
  },
};

const DesignPatterns = {
  Factory: {
    Dialog: {
      createButton,
      render,
    },
    WindowsDialog: {
      extends: Dialog,
      createButton: function () {
        return new WindowsButton();
      },
    },
    WebDialog: {
      extends: Dialog,
      createButton: function () {
        return new HTMLButton();
      },
    },
    interface: {
      Button: {
        render,
        onClick: () => {},
      },
    },
    WindowsButton: {
      implements: Button,
      render: function () {
        // Render Windows button
      },
      onClick: function () {
        // Handle Windows button click
      },
    },
    HTMLButton: {
      implements: Button,
      render: function () {
        // Render HTML button
      },
      onClick: function () {
        // Handle HTML button click
      },
    },

    Application: {
      config: {
        conditionOne: {
          OS: "Windows",
          dialog: new WindowsDialog(),
        },
        conditionTwo: {
          OS: "Web",
          dialog: new WebDialog(),
        },
      },
    },
  },
};

const Team = {};

const compRule = {
  useEffect: {
    one: function () {
      competitorRuleRef.current = competitorRules;
    },
    two: function () {
      const loadData = () => {
        let api = showDeleted ? apiRouteShowDeleted : apiRoute;
        dispatch(fetchData(api, "CR", dispatch));
      };

      loadData();
      return () => {
        dispatch(clearDataset("CR"));
        dispatch(removeAllPortals("CLOSE_ALL_PORTALS"));
      };
    },
    three: function () {
      if (isEditable === true) {
        setShowDeleted(true);
      }
    },
    four: function () {
      setErrors({});
      return () => {
        setErrors({});
        removeAllToast();
      };
    },
    five: function () {
      if (editTimeStamps["CR"] == null) {
        setChanges({});
      }
    },
  },
  states: {
    isEditable,
    editTimeStamps,
    documentationLinks,
    competitorRuleData,
    competitor_rule_itm,
  },
  functions: {
    handleshowDeletedCall,
  },
};

const UI = {
  "How to send flag, data to a Component": {
    usingsProps: {
      singleProp: {
        propName: "propName",
        propValue: "propValue",
      },
      inObject: {
        propName: {
          propName: "propName",
          propValue: "propValue",
        },
      },
    },
  },
};

// Purpose	Icon	Unicode
// Delete / Trash	🗑️	U+1F5D1
// Add / Plus	➕	U+2795
// Edit / Pencil	✏️	U+270F
// Info	ℹ️	U+2139
// Warning	⚠️	U+26A0
// Error / Cross	❌	U+274C
// Success / Tick	✅	U+2705
// Search	🔍	U+1F50D
// Settings	⚙️	U+2699
// Save	💾	U+1F4BE
// Purpose | Icon | Unicode
// Star / Favorite | ⭐ | U+2B50
// Fire / Hot Feature | 🔥 | U+1F525
// Rocket / Launch | 🚀 | U+1F680
// Bug / Issue | 🐞 | U+1F41E
// Lock / Security | 🔒 | U+1F512
// Unlock | 🔓 | U+1F513
// Clipboard | 📋 | U+1F4CB
// Eye / Visibility | 👁️ | U+1F441
// Time / Clock | ⏰ | U+23F0
// Folder | 📁 | U+1F4C1
// File / Document | 📄 | U+1F4C4
// Upload | ⬆️ | U+2B06
// Download | ⬇️ | U+2B07
// Link / Chain | 🔗 | U+1F517
// Calendar | 📅 | U+1F4C5
// Terminal / Shell | 🖥️ | U+1F5A5
// Keyboard Input | ⌨️ | U+2328
// Server | 🖧 | U+1F5A7
// Construction / WIP | 🚧 | U+1F6A7
// Lightbulb / Idea | 💡 | U+1F4A1
// Magnifier / Inspect | 🕵️ | U+1F575

const ActionRuleUI = {
  "DeleteIconButton🗑️": {
    ParameterTanstackTable: {
      isDeleteRowBinRequired: true,
      isDeleteRowBinRequired: false,
    },
  },

  "Hide Particular columns": {
    ParameterTanstackTable: {
      hiddenColumnsData: [
        {
          primaryKey: false,
        },
      ],
    },
  },

  "Edit | Delete | Copy Buttons": {
    "Delete Single Row": {
      onHandleInlineDelete,
      handleInlineDeleteConfirm: {
        deleteSingleRow,
      },
    },
    "Edit Single Row": {
      onHandleInlineEdit,
    },
    "Copy Single Row": {
      onHandleInlineCopy,
    },
  },
  "Tanstack Tables": {
    "Tables with Columns": {
      prop: { columns: columnsArray },
      usedIn: {
        listing,
      },
      handleTableChange: (row, column, value),
    },
    "Tables without Columns": {
      prop: { schemaName: "name of the schema" },
      usedIn: {
        Add,
        Copy,
        Update,
      },
      handleTableChange: (row, column, value, updatedTableData),
    },
  },
};

// Action RUle - First Tab
javascript: (() => {
  const data = {
    "Action Rule": "ARU001212",
    "Action Rule is Deleted": true,
    Route: "AV",
    "Action Rule Name": "TEST_TEST",
    "Measure 1 Class": "2STANDARD",
    "Measure 1 OD criteria": "ASD:LKJ",
    "Measure 1 Options": "test_opt",
    "Measure 2 Class": "2STANDARD",
    "Measure 2 OD criteria": "ODG_ALL",
    "Measure 2 Options": "test_opt",
    "Action Apply To Class": "2STANDARD",
  };

  const panel = document.querySelector("#ARG-tabpanel-0");
  if (!panel) return alert("Panel #0 not found!");

  // --------- selects (unchanged) ---------
  const [first, second, third] = Array.from(panel.querySelectorAll("select"));
  if (first) {
    const o = [...first.options].find((o) => o.text === "BOOKLOAD");
    if (o) {
      first.value = o.value;
      first.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  if (second) {
    const o = [...second.options].find((o) => o.text === "AVAIL_BKT");
    if (o) {
      second.value = o.value;
      second.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  if (third) {
    const o = [...third.options].find((o) => o.text === "PROFILE");
    if (o) {
      third.value = o.value;
      third.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  // --------- React‐safe input setter ---------
  const setNativeValue = (el, value) => {
    const prototype = Object.getPrototypeOf(el);
    const { set: valueSetter } = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    );
    valueSetter.call(el, value);
  };

  // --------- fill each controlled input ---------
  Object.entries(data).forEach(([ph, val]) => {
    const inp = panel.querySelector(`input[placeholder="${ph}"]`);
    if (!inp) return;
    // 1) set the value via the native setter
    setNativeValue(inp, val);
    // 2) tell React about it
    inp.dispatchEvent(new Event("input", { bubbles: true }));
    inp.dispatchEvent(new Event("change", { bubbles: true }));
  });
})();

// Action Rule - Second Tab
javascript: (() => {
  const modal =
    document.querySelector("#ARG-tabpanel-1") ||
    document.querySelector("#profile-tabpanel-2");
  if (!modal) return alert("Modal not found");

  // 1) Select your tag input—replace this with the actual selector
  const tagInput = modal.querySelector('input[placeholder="press Enter"]');
  if (!tagInput) return alert("Tag input not found");

  // 2) The values you want to enter
  const values = [
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "110",
    "120",
    "130",
    "140",
    "150",
    "160",
    "170",
    "180",
  ];

  values.forEach((val) => {
    // focus & type the value
    tagInput.focus();
    tagInput.value = val;
    tagInput.dispatchEvent(new Event("input", { bubbles: true }));

    // then simulate the "split" key (comma)
    tagInput.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: ",",
        code: "Comma",
        keyCode: 188,
        which: 188,
        bubbles: true,
      })
    );
    tagInput.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: ",",
        code: "Comma",
        keyCode: 188,
        which: 188,
        bubbles: true,
      })
    );
  });

  // 3) Optionally blur to force any final split
  tagInput.blur();

  const buttons = Array.from(modal.querySelectorAll("button"));

  // 2) Pick the one whose text is “Add”
  const addBtn = buttons.find((b) => b.textContent.trim() === "Add");

  // 3) Click it
  if (addBtn) {
    addBtn.click();
  } else {
    console.warn("Add button not found!");
  }
})();

// Action Rule - Third Tab
javascript: (async () => {
  const data = {
    "Measure 1 Threshold": [10, 20, 30, 40, 50],
    "Measure 2 Threshold": [11, 22, 33, 44, 55],
  };

  // Put one value at a time in input field where placeholder is "Measure 1 Threshold" and in input field where placeholder is "Measure 2 Threshold" and click on "Add" button

  const panel = document.querySelector("#ARG-tabpanel-2");
  if (!panel) return alert("Panel #2 not found!");

  // React-safe input setter
  const setNativeValue = (el, value) => {
    const prototype = Object.getPrototypeOf(el);
    const { set: valueSetter } = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    );
    valueSetter.call(el, value);
  };

  // Helper function to add a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const placeholders = Object.keys(data);
  const maxLength = Math.max(...placeholders.map((key) => data[key].length));

  for (let i = 0; i < maxLength; i++) {
    for (const placeholder of placeholders) {
      const input = panel.querySelector(`input[placeholder="${placeholder}"]`);
      if (!input) {
        console.warn(`Input with placeholder "${placeholder}" not found!`);
        continue;
      }

      const value = data[placeholder][i];
      if (value === undefined) continue;

      // Set the value in the input field using the native setter
      input.focus();
      setNativeValue(input, value);

      // Dispatch React-safe input events
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));

      // Add a slight delay to ensure React processes the input
      await delay(200);
    }

    // Find and click the "Add" button
    const addButton = Array.from(panel.querySelectorAll("button")).find(
      (button) => button.textContent.trim() === "Add"
    );
    if (addButton) {
      addButton.click();
      // Add a slight delay after clicking the button
      await delay(300);
    } else {
      console.warn("Add button not found!");
    }
  }
})();

// CSI Rule
javascript: (() => {
  const data = {
    "CSI Rule": "ARU001212",
    "CSI Rule is Deleted": true,
    Route: "AV",
    "CSI Rule Name": "BLF Rule Test",
    "Measure 1 Class": "2STANDARD",
    "Measure 1 OD criteria": "RDG:PAD",
    "Measure 1 Options": "test_opt",
    "Measure 2 Class": "2STANDARD",
    "Measure 2 OD criteria": "ASD:LKJ",
    "Measure 2 Options": "test_opt",
    "CSI Apply To Class": "2STANDARD",
    "press Enter": "10,20,30",
  };

  const panel = document.querySelector("#ARG-tabpanel-0");
  if (!panel) return alert("Panel #0 not found!");

  // --------- selects (unchanged) ---------
  const [first, second, third] = Array.from(panel.querySelectorAll("select"));
  if (first) {
    const o = [...first.options].find(
      (o) => o.text === "FARE_CHANGE_SINGLE_EQUIV"
    );
    if (o) {
      first.value = o.value;
      first.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  if (second) {
    const o = [...second.options].find((o) => o.text === "SPLIT_RISK_NOT_WU");
    if (o) {
      second.value = o.value;
      second.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  if (third) {
    const o = [...third.options].find((o) => o.text === "PROFILE");
    if (o) {
      third.value = o.value;
      third.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  // --------- React‐safe input setter ---------
  const setNativeValue = (el, value) => {
    const prototype = Object.getPrototypeOf(el);
    const { set: valueSetter } = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    );
    valueSetter.call(el, value);
  };

  // --------- fill each controlled input ---------
  Object.entries(data).forEach(([ph, val]) => {
    const inp = panel.querySelector(`input[placeholder="${ph}"]`);
    if (!inp) return;
    // 1) set the value via the native setter
    setNativeValue(inp, val);
    // 2) tell React about it
    inp.dispatchEvent(new Event("input", { bubbles: true }));
    inp.dispatchEvent(new Event("change", { bubbles: true }));
  });
})();

// CSI Rule - Second Tab
javascript: (() => {
  const modal = document.querySelector("#ARG-tabpanel-1");
  if (!modal) return alert("Modal not found");

  // 1) Select your tag input—replace this with the actual selector
  const tagInput = modal.querySelector('input[placeholder="press Enter"]');
  if (!tagInput) return alert("Tag input not found");

  // 2) The values you want to enter
  const values = ["10", "20", "30"];

  values.forEach((val) => {
    // focus & type the value
    tagInput.focus();
    tagInput.value = val;
    tagInput.dispatchEvent(new Event("input", { bubbles: true }));

    // then simulate the "split" key (comma)
    tagInput.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: ",",
        code: "Comma",
        keyCode: 188,
        which: 188,
        bubbles: true,
      })
    );
    tagInput.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: ",",
        code: "Comma",
        keyCode: 188,
        which: 188,
        bubbles: true,
      })
    );
  });

  // 3) Optionally blur to force any final split
  tagInput.blur();

  const buttons = Array.from(modal.querySelectorAll("button"));

  // 2) Pick the one whose text is “Add”
  const addBtn = buttons.find((b) => b.textContent.trim() === "Add");

  // 3) Click it
  if (addBtn) {
    addBtn.click();
  } else {
    console.warn("Add button not found!");
  }
})();

// CSI Rule - Third Tab
javascript: (async () => {
  const data = {
    "Measure 1 Threshold": [10, 20, 30, 40, 50],
    "Measure 2 Threshold": [11, 22, 33, 44, 55],
  };

  // Put one value at a time in input field where placeholder is "Measure 1 Threshold" and in input field where placeholder is "Measure 2 Threshold" and click on "Add" button

  const panel = document.querySelector("#ARG-tabpanel-2");
  if (!panel) return alert("Panel #2 not found!");

  // React-safe input setter
  const setNativeValue = (el, value) => {
    const prototype = Object.getPrototypeOf(el);
    const { set: valueSetter } = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    );
    valueSetter.call(el, value);
  };

  // Helper function to add a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const placeholders = Object.keys(data);
  const maxLength = Math.max(...placeholders.map((key) => data[key].length));

  for (let i = 0; i < maxLength; i++) {
    for (const placeholder of placeholders) {
      const input = panel.querySelector(`input[placeholder="${placeholder}"]`);
      if (!input) {
        console.warn(`Input with placeholder "${placeholder}" not found!`);
        continue;
      }

      const value = data[placeholder][i];
      if (value === undefined) continue;

      // Set the value in the input field using the native setter
      input.focus();
      setNativeValue(input, value);

      // Dispatch React-safe input events
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));

      // Add a slight delay to ensure React processes the input
      await delay(200);
    }

    // Find and click the "Add" button
    const addButton = Array.from(panel.querySelectorAll("button")).find(
      (button) => button.textContent.trim() === "Add"
    );
    if (addButton) {
      addButton.click();
      // Add a slight delay after clicking the button
      await delay(300);
    } else {
      console.warn("Add button not found!");
    }
  }
})();

const ImageKitSetup = {
  ".env": {
    // Setup your ImageKit account and get the public key, private key, and url endpoint
  },
  "UploadImage.jsx": {
    // Import ImageKit from 'imagekitio-react'
    // Initialize ImageKit with your public key and url endpoint
    // Create a function to handle image upload
    input: {
      type: "file",
      accept: "image/*",
      onChange: (e) => {
        const file = e.target.files[0];
        if (file) {
          // Call the upload function with the selected file
          uploadImage(file);
        }
      },
    },
  },
};

const handleTableChange = {
  // get the original row before the change
  // get the column id which is being edited
  // get the new value which is being set
};

const InputComponent = {
  "Element 1": {
    interface,
    TextInput: {
      props: {
        type: "text",
        value: "",
        placeholder: "Enter text",
        onChange: () => {},
      },
    },
  },
  "Element 2": {
    interface,
    Button: {
      props: {
        label: "Submit",
        onClick: () => {},
      },
    },
  },
  "Element 3": {
    interface,
    FormField: {
      props: {
        children: "React.ReactNode",
      },
    },
  },

  render: () => {
    const [text, setText] = React.useState("");

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    //   setText(e.target.value);
    const handleClick = () => alert(`You typed: ${text}`);

    return (
      <div style={{ padding: "20px" }}>
        <FormField>
          <TextInput
            value={text}
            onChange={handleChange}
            placeholder="Type something..."
          />
          <Button label="Submit" onClick={handleClick} />
        </FormField>
      </div>
    );
  },
};

const InputComponentWithCompoundPattern = {
  "Element One": {
    interface: {
      TextInputProps: {
        label,
        value,
        onChange,
        placeholder,
        helperText,
      },
    },
    TextInput: {
      props: {
        label: "Enter text",
        value: "",
        onChange: () => {},
        placeholder: "Type something...",
        helperText: "This is a helper text",
      },
    },
  },
  "Element Two": {
    interface: {
      ButtonProps: {
        label,
        onClick,
      },
    },
    Button: {
      props: {
        label: "Submit",
        onClick: () => {},
      },
    },
  },
  "Element Three": {
    interface: {
      FormRootProps: {
        children,
        onSubmit,
      },
    },
    FormField: {
      props: {
        children: "React.ReactNode",
        onSubmit: () => {},
      },
    },
  },
  "Element Four": {
    interface: {
      FormTitleProps: {
        title,
        description,
      },
    },
    FormTitle: {
      props: {
        title: "Form Title",
        description: "Form Description",
      },
    },
  },
  "Element Five": {
    interface: {
      FormFieldProps: {
        children,
      },
    },
    FormField: {
      props: {
        children: "React.ReactNode",
      },
    },
  },
  "Attach Components": {
    Form: Object.assign(FormRoot, {
      Title: FormTitle,
      Field: FormField,
    }),
  },
};

const d3Chart = {
  props: {
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  },
  x: {
    d3: {
      scaleUtc: () => {},
      domain: () => {},
      range: () => {},
    },
  },
  y: {
    d3: {
      scaleLinear: () => {},
      domain: () => {},
      range: () => {},
    },
  },
  svg: {
    d3: {
      create: () => {},
      attr: () => {},
    },
    append: () => {},
    attr: () => {},
    call: () => {},
    node: () => {},
  },
};

const D3BarChart = {
  props: {
    data,
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  },
  x: {
    d3: {
      scaleBand: () => {},
      domain: () => {},
      range: () => {},
      padding: () => {},
    },
  },
  y: {
    d3: {
      scaleLinear: () => {},
      domain: () => {},
      range: () => {},
    },
  },
  svg: {
    d3: {
      create: () => {},
      attr: () => {},
    },
    append: () => {},
    attr: () => {},
    call: () => {},
    node: () => {},
  },
};

const CSS = {
  block: {
    background,
    border,
    margin: {
      props: {
        auto: "it will center the element",
        inherit: "it will inherit the margin from the parent element",
      },
      "Margin Collapsing":
        "Top and bottom margins of block-level elements can collapse into a single margin.",
    },
    padding: {
      padding,
      "Fixed Width with Padding and Border": {
        "box-sizing": "border-box", // it will include the padding and border in the width of the element
      },
    },
  },
  width: {
    div: {
      width: "100%", // TIP: No need to mention if max-width is used
      maxWidth: "1200px", // it will take the maximum width of 1200px
      minWidth: "600px", // it will take the minimum width of 600px
    },
    input: {
      width: "100%", // INFO:  Need to mention in case of input element
      maxWidth: "400px", // it will take the maximum width of 400px
      minWidth: "200px", // it will take the minimum width of 200px
    },
    example: () => {
      const css = `
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              body{
                padding:10px;
              }
              .container {
                width: 100%;
              }

              .formField {
                border: 1px solid grey;
                padding: 20px;
                min-width: 200px;
                max-width: 400px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
              }

              .formField input {
                display: block;
                width: 100%;
                max-width: 200px;
                min-width: 50px;
                box-sizing: border-box;
              }

              .formField select {
                display: block;
                width: 100%;
                max-width: 200px;
                min-width: 50px;
                box-sizing: border-box;
              }

              .formField textarea {
                display: block;
                width: 100%;
                max-width: 200px;
                min-width: 50px;
                box-sizing: border-box;
              }

              .urdu {
                align-items: flex-end;
              }`;

      return (
        <div class="container">
          <div class="formField">
            <label for="name">Name:</label>
            <input name="name" type="text" />
            <select name="gender" id="">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <input type="range" min="0" max="500" step="100" />
          </div>
          <div class="formField urdu">
            <label for="name">ٹائپ کریں</label>
            <input name="name" type="text" />
          </div>
        </div>
      );
    },
  },
  flexbox: {
    container: {
      props: {
        display: "flex",
        "flex-direction": {
          row: {
            "flex-wrap": "wrap", // wrap items to the next line if they don't fit in one line
            "justify-content": "space-between", // space between items
            "align-items": "center", // align items in the center of the container
            "align-content": "center", // align the flex lines in the center of the container
          },
          rowReverse: {
            "flex-wrap": "wrap-reverse", // wrap items to the next line in reverse order
            "justify-content": "space-between", // space between items
            "align-items": "center", // align items in the center of the container
          },
          column: {
            "flex-wrap": "wrap-reverse", // wrap items to the next line in reverse order
            "justify-content": "space-around", // space around items
            "align-items": "flex-start", // align items at the start of the container
          },
          columnReverse: {
            "flex-wrap": "wrap-reverse", // wrap items to the next line in reverse order
            "justify-content": "space-around", // space around items
            "align-items": "flex-start", // align items at the start of the container
          },
        },
      },
    },
    items: {
      "flex-grow": {},
      "flex-shrink": {},
      "flex-basis": {}, // initial size of the item before flex-grow and flex-shrink are applied
      flex: {}, // shorthand for flex-grow, flex-shrink and flex-basis
      "align-self": {}, // override the align-items property for a specific item
      order: {}, // order of the item in the flex container
    },
  },
};

const ContextAPI = {
  Context: {
    createContext: () => {},
  },
  ContextProvider: {
    initialState,
    apiCall,
    functionDefinitions,
    values: {
      state,
      loginFunction,
      logoutFunction,
    },
    ProvidorComponent: {
      props: {
        value,
      },
    },
    exported: true,
  },
};

const DataStructures = {
  tree: {
    A: {
      B: {
        C: {
          D: {
            E: {},
          },
          D: {},
        },
        C: {},
        CC: {},
      },
      B: {},
      BB: {},
    },
  },
  binaryTree: {
    value: 10,
    left: {
      value: 5,
      left: null,
      right: null,
    },
    right: {
      value: 15,
      left: null,
      right: {
        value: 20,
        left: null,
        right: null,
      },
    },
  },
  graph: {
    A: ["B", "C"],
    B: ["A", "D"],
    C: ["A", "D"],
    D: ["B", "C"],
  },
  directedGraph: {
    A: [
      { to: "B", weight: 2 },
      { to: "C", weight: 4 },
    ],
    B: [{ to: "D", weight: 1 }],
    C: [{ to: "D", weight: 5 }],
    D: [],
  },
};

const JestTest = {
  it: {
    "should render the component": () => {
      const { getByText } = render(<MyComponent />);
      expect(getByText("Hello World")).toBeInTheDocument();
    },
  },
};

const FileStructure = {
  LibraryImports,
  ObjectImportsFromFiles,
  FunctionImportsFromFiles,
  ComponentImportsFromFiles,
  interfaces,
  types,
  objects,
  functions,
  destructuring,
  typeExports,
  defaultExports,
  namedExports,
};

const apis = {
  getUsers: () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((users) => {
        console.log(users); // Array of user objects
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  },
  getUserById: () => {
    const userId = 1;
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((user) => {
        console.log(user); // User object
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  },
  createUser: () => {
    const newUser = {
      name: "John Doe",
      email: "johnkon@gmail.com",
      phone: "123-456-7890",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
      },
    };
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((user) => {
        console.log("user is created", user); // Created user object
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  },
  updateUser: () => {
    const userId = 1;
    const updatedUser = {
      name: "Jane Doe",
      email: "somemail@gmail.com",
      phone: "987-654-3210",
    };
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((user) => {
        console.log("user is updated", user);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  },
  deleteUser: () => {
    const userId = 1;
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("user is deleted");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  },
};

const ReduxProject = {
  store: () => {
    import { apiSlice } from "@/redux/baseApiSlice";
    import { authSlice } from "@/redux/dataSlices/authSlice";
    import { combineReducers, configureStore } from "@reduxjs/toolkit";

    import {
      rtkQueryAPIGetJourneyPlannerInterceptor,
      rtkQueryAPIResponseLogger,
      rtkQueryErrorLogger,
    } from "@/utils/middleware";
    import {
      FLUSH,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER,
      REHYDRATE,
      persistReducer,
      persistStore,
    } from "redux-persist";
    import storage from "redux-persist/lib/storage";
    import { selectiveQueryTransform } from "./selectiveQueryTransform";

    // https://www.npmjs.com/package/redux-persist
    const rootPersistConfig = {
      key: "root",
      storage,
      transforms: [selectiveQueryTransform],
    };

    const authPersistConfig = {
      key: "auth",
      storage,
      // blackList: ["nonceValue"],
    };
    // const apiPersistConfig = {
    //   key: "api",
    //   storage: storage,
    // };
    const combinedReducer = combineReducers({
      auth: persistReducer(authPersistConfig, authSlice.reducer),
      // [apiSlice.reducerPath]: persistReducer(apiPersistConfig, apiSlice.reducer),
      [apiSlice.reducerPath]: apiSlice.reducer,
    });

    const rootReducer = (state, action) => combinedReducer(state, action);

    const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

    export const store = configureStore({
      reducer: persistedReducer,
      // reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          // https://stackoverflow.com/questions/65217815/redux-handling-really-large-state-object
          // https://stackoverflow.com/questions/70852386/a-non-serializable-value-was-detected-in-an-action-in-the-path-register-val/70852510#70852510
          serializableCheck: {
            // error: A component suspended while responding to synchronous input.( not fixed by ignoreActions) fix: remove lazy load of component
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
          // serializableCheck: false,
        }).concat(
          apiSlice.middleware,
          rtkQueryErrorLogger,

          rtkQueryAPIResponseLogger,
          rtkQueryAPIGetJourneyPlannerInterceptor
        ),
      devTools: true,
    });
    // use of redux-persist to persist the state
    // wrapped the store with persistStore and exported it to be used in App.tsx
    export const persistor = persistStore(store);
  },
};

const applicationRoute = {
  referenceURL: "https://reactrouter.com/start/framework/routing",
  homepage: index("./home.tsx"),
  about: route("about", "./about.tsx"),
  contact: route("contact", "./contact.tsx"),
  loginAndRegister: layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),
};

const python = {
  imports: {
    os,
    re,
    sys,
    math,
    random,
    time,
    datetime,
    json,
    requests,
    flask,
    django,
    pandas,
    numpy,
    matplotlib,
    seaborn,
    tensorflow,
    pytorch,
  },
  functions: {
    functionDefinition: () => {
      `
   def parse_scorecard(html_content):
      return match_info, pd.DataFrame(batting), pd.DataFrame(bowling)
      `;
    },
    globalFunctions: {
      next: "next(iterator)",
      enumerate: "enumerate(iterable, start=0)",
      zip: "zip(*iterables)",
      filter: "filter(function, iterable)",
      map: "map(function, iterable)",
      reduce: "reduce(function, iterable)",
      sorted: "sorted(iterable, key=None, reverse=False)",
      reversed: "reversed(iterable)",
      all: "all(iterable)",
      sum: "sum(iterable, start=0)",
      any: "any(iterable)",
      min: "min(iterable, default=None)",
      max: "max(iterable, default=None)",
      len: "len(iterable)",
      range: "range(start, stop, step)",
    },
  },
  libraries: {
    os: {
      listdir: "os.listdir(path)",
      mkdir: "os.mkdir(path)",
      makedirs: "os.makedirs(path)",
      remove: "os.remove(path)",
      rmdir: "os.rmdir(path)",
      rename: "os.rename(src, dst)",
      getcwd: "os.getcwd()",
      chdir: "os.chdir(path)",
      path: {
        exists: "os.path.exists(path)",
        isfile: "os.path.isfile(path)",
        isdir: "os.path.isdir(path)",
        join: "os.path.join(path, *paths)",
        split: "os.path.split(path)",
        basename: "os.path.basename(path)",
        dirname: "os.path.dirname(path)",
      },
    },
    soup: {
      createInstance: "BeautifulSoup(html_content, 'html.parser')",
      functions: {
        select_one,
        find_all,
        find,
        find_all_next,
        find_all_previous,
        find_all_next_siblings,
        find_all_previous_siblings,
        find_all_next_siblings,
        find_all_previous_siblings,
        find_parent,
        find_parents,
        find_next,
        find_previous,
        find_next_sibling,
        find_previous_sibling,
        find_next_siblings,
        find_previous_siblings,
      },
    },
    pandas: {
      read_csv: "pd.read_csv('file.csv')",
      read_excel: "pd.read_excel('file.xlsx')",
      read_json: "pd.read_json('file.json')",
      read_html: "pd.read_html('file.html')",
      read_sql: "pd.read_sql('SELECT * FROM table', connection)",
      to_csv: "df.to_csv('file.csv', index=False)",
      to_excel: "df.to_excel('file.xlsx', index=False)",
      to_json: "df.to_json('file.json', orient='records')",
      to_html: "df.to_html('file.html', index=False)",
      DataFrame: {
        createInstance: "pd.DataFrame(data)",
        from_dict: "pd.DataFrame.from_dict(data)",
        from_records: "pd.DataFrame.from_records(data)",
        props: {
          data: "data",
          columns: "columns",
          index: "index",
          dtype: "dtype",
          copy: "copy",
        },
        functions: {
          head: "df.head(n)",
          tail: "df.tail(n)",
          shape: "df.shape",
          info: "df.info()",
          describe: "df.describe()",
          dtypes: "df.dtypes",
          columns: "df.columns",
          index: "df.index",
          values: "df.values",
          isnull: "df.isnull()",
          notnull: "df.notnull()",
          dropna: "df.dropna()",
          fillna: "df.fillna(value)",
          groupby: "df.groupby(by)",
          sort_values: "df.sort_values(by, ascending=True)",
        },
      },
    },
    streamlit: {
      import: "import streamlit as st",
      functions: {
        title: "st.title('Title')",
        header: "st.header('Header')",
        subheader: "st.subheader('Subheader')",
        text: "st.text('Text')",
        markdown: "st.markdown('Markdown')",
        code: "st.code('Code')",
        write: "st.write('Write')",
        image: "st.image('image.jpg')",
        video: "st.video('video.mp4')",
        audio: "st.audio('audio.mp3')",
        table: "st.table(data)",
        dataframe: "st.dataframe(data)",
        error: "st.error('Error')",
        warning: "st.warning('Warning')",
        sidebar: {
          title: "st.sidebar.title('Sidebar Title')",
          header: "st.sidebar.header('Sidebar Header')",
          subheader: "st.sidebar.subheader('Sidebar Subheader')",
          text: "st.sidebar.text('Sidebar Text')",
          markdown: "st.sidebar.markdown('Sidebar Markdown')",
          code: "st.sidebar.code('Sidebar Code')",
          write: "st.sidebar.write('Sidebar Write')",
          selectbox: () => {},
        },
        line_chart: () => {},
        columns: () => {},
      },
    },
  },
};

const JavaScript = {
  strings: {
    english: {
      length,
      parts: { slice, substring, concat, split },
      search: {
        indexOf,
        lastIndexOf,
        includes,
        startsWith,
        endsWith,
        search,
        match,
        test,
        matchAll,
      },
      replace: { replace, replaceAll },
      regex: {
        match,
        test,
      },
      characters: {
        charAt,
        charCodeAt,
      },
      cases: {
        uppercase,
        lowercase,
        capitalize,
      },
      spacing: {
        trim,
        trimStart,
        trimEnd,
        padStart,
        padEnd,
      },
    },
  },
  arrays: {
    english: {
      length,
      parts: { slice, splice, concat, join },
      search: {
        indexOf,
        lastIndexOf,
        includes,
        find,
        findIndex,
        findLast,
        findLastIndex,
      },
      iteration: {
        forEach: {
          info: "Update something outside the iteration",
          value,
          index,
          array,
        },
        map: {
          info: "Create a new array with the results of calling a provided function on every element in the calling array.",
          value,
          index,
          array,
        },
        filter,
        reduce,
        reduceRight,
        every,
        some,
        from,
        keys,
        entries,
        with: {},
        spread,
      },
      replace: { replace, replaceAll },
      sort: { sort, reverse },
      fill: { fill, copyWithin },
    },
  },
  objects: {
    accessProperties: {
      singleProperty,
      multipleProperties,
      allButOne,
      allButTwo,
    },
  },
};

const regex = {
  references: {
    _1: "https://www.freecodecamp.org/news/regex-in-javascript/",
  },
  encloseBetween: {
    first: "/pattern/",
    second: "/pattern/g",
    third: "/pattern/i",
    fourth: "/pattern/m",
    fifth: "/pattern/s",
  },
  replaceOccurrences: {
    first: "string.replace(/pattern/g, 'newValue')",
    second: "string.replace(/pattern/i, 'newValue')",
    third: "string.replace(/pattern/m, 'newValue')",
    fourth: "string.replace(/pattern/s, 'newValue')",
  },
  flags: {
    ignoreFlag: "i", // case insensitive
    globalFlag: "g", // global search
    unicodeFlag: "u", // unicode support
    ignoreWithGlobalFlag: "ig", // case insensitive and global search
    multilineFlag: {
      flag: "m", // multiline search
      example: () => {
        let str = `1st line
                    2nd line
                      3rd line`;

        let re = /^\d/gm;

        let matches = str.match(re);

        console.log(matches); // Output: ["1", "2", "3"]
      },
    },
  },
  anchors: {
    start: "^String", // start of the string
    end: "String$", // end of the string
  },
  wordBoundaries: {
    word: "/\bword\b/", // match only whole words
  },
  getCount: {
    integerCount: {
      regex: /\d{4}/,
      example: () => {
        let str = "1234 5678 91011 121314";
        let re = /\d{4}/g;
        let matches = str.match(re);
        console.log(matches); // Output: ["1234", "5678", "9101", "1213"]
      },
    },
  },
  integerRange: {
    example: () => {
      let str =
        "The meeting is scheduled for 10:30 AM and ends at 2 PM in 2024";
      let re = /\d{2,4}/g; // Matches numbers with 2 to 4 digits

      let result = str.match(re); //[("10", "30", "2024")];
    },
  },
  allDigits: {
    example: () => {
      let phone = "+1-(103)-777-0101";
      let result = phone.match(/\d+/g); // Matches one or more digits
      console.log(result); // Output: ["1", "103", "777", "0101"]
    },
  },
  ZeroOrOne: {
    writeBefore: "?",
    example: () => {
      let str = "The color is red, or blue or green";
      let re = /red|blue|green?/g; // Matches "red", "blue", or "green"
      let result = str.match(re); // Output: ["red", "blue", "green"]
      console.log(result);
    },
    exampleInfo: {
      // Remove red from the string
      // It will match either one of the two patterns: "red" or "blue" or "green"
    },
    example2: () => {
      let str = "The sky is blue in color, but the ocean is blue in colour";
      let result = str.match(/colou?r/g); // Matches "color" and "colour"
      console.log(result); // Output: ["color", "colour"]
    },
  },
  ZeroOreMore: {
    writeBefore: "*",
    example: () => {
      let str = "The color is red, or blue or green";
      let re = /red|blue|green*/g; // Matches "red", "blue", or "green"
      let result = str.match(re); // Output: ["red", "blue", "green"]
      console.log(result);
      let result1 = "Smile Please 😊".match(/[😒😊🙄]/);
      console.log(result1); // Output: ["�"]
    },
  },
};

const personalRegex = {
  sampleOne: {
    string: "Hello World",
    tasks: {
      taskOne: {
        task: "Replace World with People",
        solution: () => {
          let str = "Hello World";
          let result = str.replace(/World/g, "People");
          console.log(result); // Output: Hello People
        },
      },
      taskTwo: {
        task: "Replace Hello with Hi",
        solution: () => {
          let str = "Hello World";
          let result = str.replace(/Hello/g, "Hi");
          console.log(result); // Output: Hi World
        },
      },
    },
  },
  sampleTwo: {
    string: "Cat, Coat, Cart, Count",
    tasks: {
      taskOne: {
        task: "How may words starts with C",
        solution: () => {
          let str = "Cat, Coat, Cart, Count";
          let result = str.match(/\bC\w+/g);
          console.log(result); // Output: ["Cat", "Coat", "Cart", "Count"]
        },
      },
      taskTwo: {
        task: "How many words ends with t",
        solution: () => {
          let str = "Cat, Coat, Cart, Count";
          let result = str.match(/\w+t\b/g);
          console.log(result); // Output: ["Cat", "Coat", "Cart"]
        },
      },
      taskThree: {
        tasK: "How many words starts with C and ends with t",
        solution: () => {
          let str = "Cat, Coat, Cart, Count";
          let result = str.match(/\bC\w+t\b/g);
          console.log(result); // Output: ["Cat", "Coat", "Cart"]
        },
      },
    },
  },
  sampleThree: {
    string: "+91-1234567890",
    tasks: {
      taskOne: {
        task: "How many digits in the string",
        solution: () => {
          let str = "+91-1234567890";
          let result = str.match(/\d+/g);
          console.log(result); // Output: ["91", "1234567890"]
        },
      },
      taskTwo: {
        task: "How many digits in the string",
        solution: () => {
          let str = "+91-1234567890";
          let result = str.match(/\d{10}/g);
          console.log(result); // Output: ["1234567890"]
        },
      },
    },
  },
  sampleFour: {
    string: "A small fox lives into the mountains",
    tasks: {
      taskOne: {
        task: "How many words starts with A",
        solution: () => {
          let str = "A small fox lives into the mountains";
          let result = str.match(/\bA\w?/g);
          console.log(result); // Output: ["A"]
        },
      },
      taskTwo: {
        task: "How many words ends with s",
        solution: () => {
          let str = "A small fox lives into the mountains";
          let result = str.match(/\w+s\b/g);
          console.log(result); // Output: ["lives", "mountains"]
        },
      },
    },
  },
  sampleFive: {
    string: "The sky is blue in color, but the ocean is blue in colour",
    tasks: {
      taskOne: {
        task: "Find color and colour",
        solution: () => {
          let str = "The sky is blue in color, but the ocean is blue in colour";
          let result = str.match(/colou?r/g); // Matches "color" and "colour"
          console.log(result); // Output: ["color", "colour"]
        },
      },
    },
  },
  sampleSix: {
    passwordString: "Password123!",
    tasks: {
      taskOne: {
        task: "Password should be at least 8 characters long",
        solution: () => {
          let str = "Password123!";
          let result = str.match(/^(?=.{8,})/g); // Matches if password is at least 8 characters long
          console.log(result); // Output: ["Password123!"]
        },
      },
      taskTwo: {
        task: "Password should contain at least one uppercase letter",
        solution: () => {
          let str = "Password123!";
          let result = str.match(/(?=.*[A-Z])/g); // Matches if password contains at least one uppercase letter
          console.log(result); // Output: ["Password123!"]
        },
      },
    },
  },
};

const getClassNames = {
  if: {
    variable: "headerButtons && isActionHeader",
    "return ClassName": "tanstack-main-container has-header has-action-header",
  },
  elseif_1: {
    variable: "headerButtons",
    "return ClassName": "tanstack-main-container has-header",
  },
  elseif_2: {
    variable: "isActionHeader",
    "return ClassName": `tanstack-main-container has-action-header`,
  },
  else: {
    "return ClassName": "tanstack-main-container",
  },
};

const plantUML = {
  sequenceDiagram: {
    reference: "https://plantuml.com/sequence-diagram",
    messages: {
      fromPointAtoB: {
        solidLine: "->",
        dashedLine: "-->",
        solidWithColor: "-[#red]>",
      },
      toPointA: {
        solidLine: "?->",
        dashedLine: "?-->", // dashed line to point A
        solidWithColor: "?-[#red]>",
        dashedWithColor: "?-[#red]->",
      },
    },
    shapes: {
      participant: {
        define: "participant ParticipantName",
        example: () => {
          const uml = `@startuml
          participant User
          User -> System: Request
          @enduml`;
        },
        participantForMessage: {
          keyword: "create",
          define: "create User",
          use: "Use it Right after creating it",
        },
      },
      actor: {
        define: "actor ActorName",
        example: () => {
          const uml = `@startuml
          actor User
          User -> System: Request
          @enduml`;
        },
      },
      boundary: {},
      control: {},
      entity: {},
      database: {},
      collections: {},
      queue: {},
    },
    colors: {
      onActors: {
        color: "red",
        example: () => {
          const uml = `@startuml
          actor User #red
          User -> System: Request
          @enduml`;
        },
      },
      "on Messages | Notes | alt | group": {
        background: {
          keyword: "back",
          define: "<back:#ddd>Text</back>",
        },
        fontSize: {
          keyword: "size",
          define: "<size:20>Text</size>",
        },
        backgroundColorAndFontSize: {
          define: "<back:#ddd><size:20>Text</size></back>",
        },
        example: () => {
          const uml = `@startuml
          actor User #red
          User -> System: Request
          @enduml`;
        },
      },
    },
    separators: {
      actorsVsMessage: {
        keyword: ":",
        define: "ActorA -> ActorB : Message",
      },
      messageVsMessage: {
        keyword: "==",
        define: "== Message ==",
      },
    },
    spacing: {
      verticalSpacing: {
        keyword: "|||",
        define: "|||",
        use: "between the messages",
      },
    },
    delay: {
      keyword: "...",
      define: "...5 minuters later",
    },
    containers: {
      processBox: {
        starting_the_process_box: {
          keyword: "alt",
          define: "alt Starting the process",
        },
        starting_the_process_box_with_color: {
          keyword: "alt",
          define: "alt#Gold #LightBlue Starting the process",
        },
        ending_the_process_box: {
          define: "end",
        },
        process_inside_process: {
          keyword: "else",
          define: "else Name of the process",
        },
        loops: {
          start: {
            keyword: "loop",
            define: "loop Name of the loop",
          },
          end: {
            define: "end",
          },
        },
        groups: {
          start: {
            keyword: "group",
            define: "group Name of the group",
            define_with_secondary_name: "group My own [My own component]",
          },
          end: {
            define: "end",
          },
        },
      },
      box: {
        starting_the_box: {
          keyword: "box",
          define: `box "Name of the box" #color`,
        },
        ending_the_box: {
          keyword: "end box",
          define: "end box",
        },
      },
    },
    notes: {
      forMessages: {
        singleLine: {
          define_right: "note right: This is a note",
          define_left: "note left: This is a note",
        },
        multiLine: {
          starting_the_note: {
            keyword: "note",
            direction_keyword: "right|left",
            define: "note right",
          },
          ending_the_note: {
            keyword: "end note",
            define: "end note",
          },
          example: () => {
            const uml = `@startuml
          actor User
          note left
            We will call the user
            Using the API call
            end note
          @enduml`;
          },
        },
      },
      forActors: {
        singleLine: {
          define_right: "note right of User: This is a note",
          define_left: "note left of User: This is a note",
          define_over: "note over User, System: This is a note",
        },
        multiline: {
          define_left: () => {
            const uml = `note left of Alice #aqua
                        This is displayed
                        left of Alice.
                        end note`;
          },
        },
      },
    },
    lifelines: {
      searchKeyword: "Lifeline Activation and Destruction",
      activate: {
        keyword: "activate",
        define: "activate User",
      },
      deactivate: {
        keyword: "deactivate",
        define: "deactivate User",
      },
      destroy: {
        keyword: "destroy",
        define: "destroy User",
      },
    },
    settings: {
      skinparam: {
        sequenceMessageAlign: {
          define: "skinparam sequenceMessageAlign left",
          left: "left",
          right: "right",
        },
        sequenceArrowThickness: {
          define: "skinparam sequenceArrowThickness 2",
          thickness: "2",
        },
        roundCorner: {
          define: "skinparam roundcorner 20",
          corner: "20",
        },
        sequenceParticipantzUnderline: {
          define: "skinparam sequenceParticipant underline",
          underline: "true",
        },
      },
      autonumber: {
        define_1: "autonumber",
        define_2_initial_value: "autonumber 1",
        define_3_initialvalue_plus_addon: "autonumber 1 2",
        define_4: {
          position: "In between the message lines",
        },
        define_5_with_color_count: 'autonumber "<font color=red><b> 10"',
        define_5_with_message_and_color_1:
          'autonumber 40 10 "<font color=red><b>Message 0  "',
        define_5_multiple_digits: "autonumber 1.1.1",
        settings: {
          pause: "autonumber stop",
          resume: "autonumber resume",
        },
      },
      header: {
        define: "header HeaderName",
        define_2: "header HeaderName 1",
      },
      footer: {
        define: "footer FooterName",
        define_2: "footer FooterName 1",
      },
    },
    examples: {
      _1: () => {
        const uml = `
@startuml
header App Flow
footer App Flow
skinparam sequenceMessageAlign right
participant App.js as App #red
participant ErrorBoundary as EB #red
participant Layout as Layout #red
participant Router as Router #red
participant Sidebar.js as Sidebar #yellow
participant Main.js as Main #pink
?--> App : app
?-[#red]-> App : app is here
?-[#red]-> App : No more
|||
[-> App : app
App -> EB : wraps<size:20>Text</size>
EB -> Layout : wraps
Router <- Layout : wraps
group If route is matched <back:#pink><size:20>Text</size></back>
Router -[#green]> Sidebar : wraps
Router -[#green]> Main : wraps
    else route doesn't match
    Router -[#red]> Suspense : wraps
    note left: message <back:teal><size:20>Text</size></back>
    else Other errors
    Router -[#red]> Suspense : wraps
    |||
    |||
    group Token is not found <back:#pink><size:20>Text</size></back>
        group 5 times <back:#pink><size:20>Text</size></back> [a<back:#pink><size:20>Text</size></back>]
            Router -> Router : Check user token
            else user logout start
            Router -[#red]> Suspense : user logout start
        end
        |||
        |||
        loop Log API Call
            Router -> Router :<back:#ddd><size:18> //Check// user token</size></back>
            else user logout start
            == User Checking ==
            
            Router -[#red]> Suspense : user logout start
            create ErrorMessage
            Suspense -> ErrorMessage : Create Error Object
            note left
            We will call the user
            Using the API call
            end note
        end
        
    end
    
end
Main -> Main : Re-renders everytime \nparent component \nre-renders
ActorA -> ActorB : Message
@enduml

        `;
      },
    },
  },
  usecaseDiagram: {
    reference: "https://plantuml.com/use-case-diagram",
    usecases: {
      withKeyword: {
        keyword: "usecase",
        define: "usecase (First usecase)",
      },
      withoutKeyword: {
        keyword: "()",
        define: "(First usecase)",
      },
      withAlias: {
        keyword: "as",
        define: "(First usecase) as FirstUsecase",
      },
    },
    actors: {
      withKeyword: {
        keyword: "actor",
        define: "actor :First actor:",
      },
      withoutKeyword: {
        keyword: "::",
        define: ":First Actor:",
      },
      withAlias: {
        keyword: "as",
        define: ":First actor: as FirstActor",
      },
    },
    separators: {},
    notes: {},
    connectors: {
      vertical: {
        keyword: "-->",
        define: "FirstActor --> (FirstUsecase) : Message",
      },
      horizontal: {
        keyword: "->",
        define: "FirstActor -> (FirstUsecase) : Message",
      },
      directions: {
        left: {
          keyword: "-left->",
          define: "FirstActor -left-> (FirstUsecase) : Message",
        },
        right: {
          keyword: "-right->",
          define: "FirstActor -right-> (FirstUsecase) : Message",
        },
        up: {
          keyword: "-up->",
          define: "FirstActor -up-> (FirstUsecase) : Message",
        },
        down: {
          keyword: "-down->",
          define: "FirstActor -down-> (FirstUsecase) : Message",
        },
      },
    },
    groups: {
      packages: {
        keyword: "package",
        define: "package PackageName { }",
      },
      nestedPackages: {
        keyword: "package",
        define: "package PackageName { package PackageName { } }",
      },
    },
    extensions: {
      keyword: "<|--",
      define: "ActorA <|-- ActorB : Message",
    },
    settings: {
      skinparamActorStyleAwesome: {
        keyword: "actorStyle",
        define: "skinparam actorStyle awesome",
      },
    },
  },
  classDiagram: {
    arrows: {
      inheritance: {
        keyword: "<|--",
        define: "ClassA <|-- ClassB : Message",
      },
      composition: {
        keyword: "*--",
        define: "ClassA *-- ClassB : Message",
      },
      aggregation: {
        keyword: "o--",
        define: "ClassA o-- ClassB : Message",
      },
      dependency: {
        keyword: "..>",
        define: "ClassA ..> ClassB : Message",
      },
    },
    relations: {
      oneToMany: {
        define: `Class01 "1" *-- "many" Class02 : "1 to many"`,
      },
      ManyToOne: {
        define: `Class01 "many" o-- "1" Class02 : "many to one"`,
      },
      manyToMany: {
        define: `Class01 "many" o-- "many" Class02 : "many to many"`,
      },
      oneToOne: {
        define: `Class01 "1" -- "1" Class02 : "one to one"`,
      },
      oneToZeroOrOne: {
        define: `Class01 "1" o-- "0..1" Class02 : "one to zero or one"`,
      },
      zeroOrOneToMany: {
        define: `Class01 "0..1" o-- "many" Class02 : "zero or one to many"`,
      },
    },
    messages: {
      simpleMessage: {
        define: "Class01 --> Class02 : Message",
      },
      with_arrow_pointing: {
        define: "Driver - Car : drives >",
      },
    },
    class: {
      addingMethods: {
        define: "Class01 : +methodName()",
      },
      addingFields: {
        define: "Class01 : +fieldName",
      },
      classGroup: {
        example_1: () => {
          const uml = `
          @startuml
          class Class01 {
            +methodName()
            +fieldName
          }
          class Class02 {
            +methodName()
            +fieldName
          }
          class Class03 {
            +methodName()
            +fieldName
          }
          Class person {
            +name
            +age
            +email
            +mobile
            login()
            logout()
          }
          @enduml
          `;
        },
        example_2: () => {
          const uml = `
          @startuml
          class User {
            .. Simple Getter ..
            + getName()
            + getAddress()
            .. Some setter ..
            + setName()
            __ private data __
            int age
            -- encrypted --
            String password
          }
          @enduml
          `;
        },
      },
      fieldsAndMethods: {
        private: {
          define: "-fieldName",
        },
        protected: {
          define: "#fieldName",
        },
        package_private: {
          define: "~fieldName",
        },
        public: {
          define: "+fieldName",
        },
      },
      notes: {},
    },
    packages: {},
  },
  activityDiagram: {
    usefulIn: "if else statements, switch case statements, loops",
    reference: "https://plantuml.com/activity-diagram-beta",
    howToUse:
      "Everthing starts with a first step, arrows are created automatically. We can also group the steps",
    steps: {
      SimpleStep: {
        define: ":Step Name;",
      },
      conditionalSteps: {
        ifElse: {
          define: "if (condition) then (yes)",
          define_2: "else if then (no)",
          define_3: "else",
          define_4: "endif",
          example: () => {
            const uml = `
              @startuml
              start
              if(headerButtons && \nisActionHeader) then (true)
                  :className:\n "tanstack-main-container \nhas-header \nhas-action-header";
              elseif(headerButtons) then (true)
                  :className:\n "tanstack-main-container \nhas-header";
              elseif(isActionHeader) then (true)
                  :className:\n "tanstack-main-container has-action-header";
              else
                  :returnClassName: "tanstack-main-container";
              end
              @enduml`;
          },
          example_2: () => {
            const uml = `
              @startuml
              start
              if (condition A) then (yes)
                :Text 1;
              elseif (condition B) then (yes)
                :Text 2;
                stop
              (no) elseif (condition C) then (yes)
                :Text 3;
              (no) elseif (condition D) then (yes)
                :Text 4;
              else (nothing)
                :Text else;
              endif
              stop
              @enduml
              `;
          },
        },
      },
    },
    groupingSteps: {
      startingTheGroup: {
        define: "start",
      },
      endingTheGroup: {
        define: "end",
      },
    },
    loops: {
      keyword: "repeat",
      whileLoop: {
        withWhileKeyword: {
          howToUse:
            "Put the condition in the top part of the UML, put the statements in the bottom part",
          example_1: () => {
            const uml = `
            @startuml

              start

              while (data available?)
                :read data;
                :generate diagrams;
              endwhile

              stop

              @enduml
            `;
          },
        },
        withoutWhileKeyword: {
          howToUse:
            "Put the condition in the bottom part of the UML, put the statements in the top part",
          example_1: () => {
            const uml = `
          @startuml
          start
          repeat
            :read data;
            :generate diagrams;
          repeat while (more data?) is (yes) not (no)
          stop
          @enduml
          `;
          },
        },
      },
    },
  },
};

const understandLoopToRemoveDuplicate = {
  tagMap: {},
  comments: {
    singleComment: {
      tags: {
        tag_1,
        tag_2,
        tag_1,
        tag_4,
        tag_1,
      },
      for_singleComment: {
        for_tags: {
          tag_1: {
            tagMap: {
              tag_1: true,
            },
          },
        },
      },
    },
  },
  comments_2: {
    singleComment: {
      tags: {
        tag_1,
        tag_2,
        tag_1,
        tag_4,
        tag_1,
      },
    },
  },
  all_tags: {
    filter: {
      tag_1: {
        index: 0,
        getIndex: () => self.indexOf(tag_1),
        getIndexValue: 0,
      },
      tag_2: {
        index: 1,
        getIndex: () => self.indexOf(tag_2),
        getIndexValue: 1,
      },
      tag_1: {
        index: 2,
        getIndex: () => self.indexOf(tag_1),
        getIndexValue: 0,
      },
    },
  },
};

const understandGroupArray = {
  updatedTableData: {
    filter: {
      rowData: {
        is_a: "object",
        condition: "rowData.group===anotherObject.group",
        ifTrue: {
          rowData: {},
        },
      },
    },
  },
};

const IPL = {
  teams: {
    LSG: {
      Batsmen: [
        {
          name: "Aiden Markram",
          lastInnings: [
            {
              runs: 13,
              balls: 10,
            },
            {
              runs: 9,
              balls: 11,
            },
            {
              runs: 52,
              balls: 33,
            },
            {
              runs: 66,
              balls: 45,
            },
            {
              runs: 6,
              balls: 6,
            },
            {
              runs: 58,
              balls: 31,
            },
            {
              runs: 47,
              balls: 28,
            },
            {
              runs: 53,
              balls: 38,
            },
          ],
        },
        {
          name: "Mitchell Marsh",
          lastInnings: [
            {
              runs: 0,
              balls: 5,
            },
            {
              runs: 34,
              balls: 24,
            },
            {
              runs: 45,
              balls: 36,
            },
            {
              runs: 4,
              balls: 6,
            },
            {
              runs: 30,
              balls: 25,
            },
            {
              runs: 81,
              balls: 48,
            },
            {
              runs: 60,
              balls: 31,
            },
            {
              runs: 0,
              balls: 1,
            },
          ],
        },
        {
          name: "Nicholas Pooran",
          lastInnings: [
            {
              runs: 6,
              balls: 5,
            },
            {
              runs: 27,
              balls: 15,
            },
            {
              runs: 9,
              balls: 5,
            },
            {
              runs: 11,
              balls: 8,
            },
            {
              runs: 8,
              balls: 9,
            },
            {
              runs: 61,
              balls: 34,
            },
            {
              runs: 87,
              balls: 36,
            },
            {
              runs: 12,
              balls: 6,
            },
            {
              runs: 44,
              balls: 30,
            },
            {
              runs: 70,
              balls: 26,
            },
          ],
        },
        {
          name: "Rishabh Pant",
          lastInnings: [
            {
              runs: 18,
              balls: 17,
            },
            {
              runs: 4,
              balls: 2,
            },
            {
              runs: 0,
              balls: 2,
            },
            {
              runs: 3,
              balls: 9,
            },
            {
              runs: 63,
              balls: 49,
            },
            {
              runs: 21,
              balls: 18,
            },
            {
              runs: 0,
              balls: 0,
            },
            {
              runs: 2,
              balls: 6,
            },
          ],
        },
        {
          name: "Ayush Badoni",
          lastInnings: [
            {
              runs: 74,
              balls: 40,
            },
            {
              runs: 35,
              balls: 22,
            },
            {
              runs: 36,
              balls: 21,
            },
            {
              runs: 50,
              balls: 34,
            },
            {
              runs: 22,
              balls: 17,
            },
            {
              runs: 28,
              balls: 20,
            },
            {
              runs: 0,
              balls: 0,
            },
            {
              runs: 30,
              balls: 19,
            },
            {
              runs: 41,
              balls: 33,
            },
            {
              runs: 6,
              balls: 6,
            },
          ],
        },
        {
          name: "David Miller",
          lastInnings: [
            {
              runs: 11,
              balls: 8,
            },
            {
              runs: 24,
              balls: 16,
            },
            {
              runs: 14,
              balls: 15,
            },
            {
              runs: 7,
              balls: 8,
            },
            {
              runs: 0,
              balls: 0,
            },
            {
              runs: 7,
              balls: 11,
            },
            {
              runs: 4,
              balls: 4,
            },
            {
              runs: 27,
              balls: 14,
            },
            {
              runs: 19,
              balls: 18,
            },
            {
              runs: 13,
              balls: 7,
            },
          ],
        },
        {
          name: "Abdul Samad",
          lastInnings: [
            {
              runs: 45,
              balls: 24,
            },
            {
              runs: 2,
              balls: 4,
            },
            {
              runs: 2,
              balls: 8,
            },
            {
              runs: 30,
              balls: 10,
            },
            {
              runs: 20,
              balls: 11,
            },
            {
              runs: 2,
              balls: 3,
            },
            {
              runs: 6,
              balls: 4,
            },
            {
              runs: 4,
              balls: 2,
            },
            {
              runs: 27,
              balls: 12,
            },
            {
              runs: 22,
              balls: 8,
            },
          ],
        },
        {
          //
        },
      ],
      Bowlers: [
        {
          name: "Shardul Thakur",
          lastInnings: [
            {
              runs: 28,
              overs: 2,
              wickets: 0,
            },
          ],
        },
      ],
    },
  },
};

const Entertainment = {
  Music: {
    Artist: {
      "Dhanda Nyoliwala": {
        song_1: "Up To U",
      },
      Krisna: {
        song_1: "No Cap",
        song_2: "I Guess",
        song_3: "Joota Japani",
      },
      Raftaar: {
        song_1: "Baawe",
      },
      "Yo Yo Honey Singh": {
        song_1: "Maniac",
      },
      "Seedhe Maut": {
        song_1: "Nalla Freestyle",
      },
    },
  },
  Shows: {
    HINDI: {},
    ENGLISH: {
      RickAndMorty: {
        seasons: {
          season_1: {
            episodes: {
              episode_1: "Seeds",
              episode_2: "Lawnmower Dog",
              episode_3: "Anatomy Park",
              episode_4: "Simulation Inside a Simulation",
              episode_5: "Meeseeks and Slippery Stair",
              episode_6: "Flu Season and Self Burying",
              episode_7: "Raising Gazorpazorp",
              episode_8: "Alternate selves, Interdimensional Cable",
              episode_9: "Mr. Needful the Devil and Pluto is Planet",
              episode_10: "Rick Council, Morty Shield",
              episode_11:
                "Ricksy throws a party and Titanic Ship Trip, Rick Dance",
            },
          },
          season_2: {
            episodes: {
              episode_1: "",
              episode_2: "Fart",
              episode_3: "Unity, Alien Prisoner",
              episode_4: "",
              episode_5: "",
              episode_6: "",
              episode_7: "",
            },
          },
        },
      },
      Dexter: {
        character_name: [
          "Dexter Morgan",
          "Debra Morgan",
          "Harry Morgan",
          "Rita Bennett",
          "Paul Bennett",
          "Angel Batista",
          "Vince Masuka",
          "James Doakes",
          "Joey Quinn",
          "LaGuerta",
          "Hannah McKay",
          "Rita",
          "Cody",
          "Astor",
          "Camilla",
        ],
        season_1: {
          episode_1: {
            scenes: ["Mike Donovan, No Blood, Jamie Jaworski, Ice truck"],
          },
          episode_2: {
            scenes: ["Mr. Chambers", "Kara", "Ricky Simmons", "Guerrero"],
          },
          episode_3: {
            scenes: [
              "Jeremy Downs",
              "Jeremy's Lawyer",
              "Paul's Friend",
              "Tony Tucci",
              "Morphin Nurse",
              "Rita's Neighbor",
              "Nina Batista",
              "Teenage Dexter",
              "Teenage Debra",
              "Young Dexter",
              "Jorge Castillo",
              "Valerie Castillo",
              "Neil Perry",
              "Shanda",
              "Rudy Cooper",
            ],
          },
          episode_4: {
            scenes: ["Oscar", "Doake's Mother"],
          },
          episode_8: {
            scenes: ["Dr. Emmett Meridian"],
          },
          episode_10: {
            scenes: ["Rita's Lawyer"],
          },
          episode_12: {
            scenes: ["Lt. Esme Pascal", "Capt. Tom Matthews"],
          },
        },
        season_2: {
          episode_1: [
            "Jimmy the blind man",
            "Little Chino",
            "Special Agent Frank Lundy",
            "Roger Hicks",
            "Lila",
          ],
        },
      },
    },
  },
  Movies: {
    HINDI: {},
    ENGLISH: {},
  },
};
