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
