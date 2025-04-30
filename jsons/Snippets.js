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

const Factory = {
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

