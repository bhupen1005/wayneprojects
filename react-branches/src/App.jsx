import { useState } from "react";
import Ajv2020 from "ajv/dist/2020";

function App() {
  const [count, setCount] = useState(0);

  const S_SUCCESS = {
    type: "S_SUCCESS",
    payload: [
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "action_rule_grp_schema",
        title: "Ventoux Action Rule Group",
        type: "array",
        items: {
          type: "object",
          properties: {
            action_rule_grp: {
              type: "string",
              pattern: "^ARG[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "Action Rule Group",
              description: "Action Rule Group",
              readOnly: false,
              tooltip:
                "Action Rule Group must begin 'ARG' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg ARG_B-001)",
              errorMessage: {
                pattern:
                  "Action Rule Group must begin 'ARG' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg ARG_B-001)",
                type: "Action Rule Group must be a string",
              },
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Action Rule Group is deleted",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              readOnly: false,
              title: "Route",
              description: "Route",
              tooltip: "Limited to Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
            },
            action_rule_grp_txt: {
              type: "string",
              title: "Name",
              description: "Action Rule Group Name",
              tooltip: "Description of Action Rule Group",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            action_rule_grp_itm: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  sort: {
                    type: "integer",
                    title: "Sequence",
                    minimum: 1,
                    description: "Sequence",
                    tooltip:
                      "Number to indicate the order that the Action Rules are executed (eg 1 for first)",
                    uniqueItems: true,
                    readOnly: false,
                  },
                  action_rule: {
                    type: "string",
                    pattern: "^ARU[A-Z0-9_-]{1,}$",
                    maxLength: 20,
                    title: "Action Rule",
                    description: "Action Rule",
                    readOnly: false,
                    tooltip: "Action Rule (Prefix ARU* eg ARU001)",
                    errorMessage: {
                      pattern: "Action Rule must begin 'ARU' (eg ARU001)",
                      type: "Action Rule must be a string",
                    },
                    popup: [
                      {
                        criteria: "^ARU[A-Z0-9_-]{1,}$",
                        target: "action-rule",
                      },
                    ],
                  },
                  action_rule_grp_itm_txt: {
                    type: "string",
                    title: "Rule Text",
                    description: "Rule Text",
                    tooltip: "Description of Action Rule Group Item",
                    readOnly: false,
                  },
                  srv_date_fr: {
                    type: "string",
                    format: "date",
                    title: "Service Date From",
                    description: "Service Date From",
                    tooltip: "Service Date Range - From",
                    readOnly: false,
                  },
                  srv_date_to: {
                    type: "string",
                    format: "date",
                    title: "Service Date To",
                    description: "Service Date To",
                    tooltip: "Service Date Range - To",
                    readOnly: false,
                  },
                  srv_date_list: {
                    type: "string",
                    pattern: "^DL[A-Z0-9_-]{1,}$",
                    maxLength: 20,
                    title: "Service Date List",
                    description: "Service Date List",
                    tooltip:
                      "Date List restriction for Service Date (Prefix DL* eg DL12345)- nb works in addition to the Service Date Range",
                    errorMessage: {
                      pattern:
                        "Service Date List must begin with 'DL' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen)",
                      type: "Service Date List must be a string",
                    },
                    readOnly: false,
                    popup: [
                      {
                        criteria: "^DL[A-Z0-9_-]{1,}$",
                        target: "date-list",
                      },
                    ],
                  },
                  dtd_fr: {
                    type: ["integer", "null"],
                    minimum: 0,
                    maximum: 999,
                    title: "DTD From",
                    description: "DTD From",
                    tooltip:
                      "Days To Departure range 'From' (eg 0 for services departing today)",
                    readOnly: false,
                  },
                  dtd_to: {
                    type: ["integer", "null"],
                    minimum: 0,
                    maximum: 999,
                    title: "DTD To",
                    description: "DTD To",
                    tooltip:
                      "Days To Departure range 'To' (eg 1 for services departing tomorrow)",
                    readOnly: false,
                  },
                  weekdays: {
                    type: "integer",
                    title: "Days",
                    description: "Weekdays",
                    tooltip:
                      "Service Weekday(s) (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
                    minimum: 1,
                    maximum: 1234567,
                    errorMessage: {
                      type: "Days must be a numeric value representing the relevant Service day(s) of the week. (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
                    },
                    readOnly: false,
                  },
                  rsid_list: {
                    type: "string",
                    pattern:
                      "^([A-Z]{2}[0-9]{6}|[A-Z]{2}[0-9]{4}XX|RL[A-Z0-9_-]{1,})?$",
                    title: "RSID/List",
                    description: "RSID or RSID List",
                    tooltip:
                      "RSID, RSID List (Prefix RL* eg RL12345) or Portion Ref (Prefix RL*, Suffix XX - eg AB1234XX)",
                    errorMessage: {
                      pattern:
                        "RSID/List must be an RSID, RSID List (Prefix RL* eg RL12345), Portion Train (Prefix RL*, Suffix XX - eg AB1234XX) or blank",
                      type: "RSID/List must be a string",
                    },
                    readOnly: false,
                    popup: [
                      {
                        criteria: "^RL[A-Z0-9_-]{1,}$",
                        target: "rsid-list",
                      },
                    ],
                  },
                },
                required: ["sort", "action_rule", "action_rule_grp_itm_txt"],
              },
            },
          },
          required: ["action_rule_grp", "action_rule_grp_itm"],
        },
      },
      {
        $id: "action_rule_schema",
        title: "Ventoux Action Rule",
        type: "array",
        items: {
          type: "object",
          properties: {
            action_rule: {
              type: "string",
              pattern: "^ARU[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "Action Rule",
              description: "Action Rule",
              tooltip: "Action Rule (Prefix ARU* eg ARU001)",
              errorMessage: {
                pattern:
                  "Action Rule must begin 'ARU' with only upper case characters, underscores, hypens and/or numbers (eg ARU_REF-001)",
                type: "Action Rule must be a string",
              },
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Action Rule is Deleted",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              readOnly: false,
              title: "Route",
              description: "Route",
              tooltip: "Limited to Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
            },
            rule_txt: {
              type: "string",
              title: "Name",
              description: "Action Rule Name",
              tooltip: "Description of Action Rule",
              readOnly: false,
            },
            measure: {
              type: ["string"],
              title: "Measure 1",
              description: "Measure 1",
              enum: [
                "AVAIL_BKT",
                "BOOKLOAD",
                "FARE_CM",
                "LOW_FARE",
                "LOW_WU_FARE",
                "FARE_SINGLE_EQUIV",
                "WU_FARE_SINGLE_EQUIV",
                "FARE_ACTUAL",
                "WU_FARE_ACTUAL",
                "F01_PHYS_LF",
                "F01_WU_LF",
                "F01_BLF",
                "HA1_BLF",
                "F02_BLF",
                "F03_BLF",
                "F04_BLF",
                "BOOKINGS_IN_BKT",
                "BOOKINGS_IN_BKT_LEG",
              ],
              tooltip:
                "Ventoux Measure - eg 'BOOKLOAD' to return the % loading for the Measure OD - see Documentation for options",
              readOnly: false,
            },
            measure_class: {
              type: ["string"],
              readOnly: false,
              title: "Measure 1 Class",
              description: "Measure 1 Class",
              tooltip: "Class filter for Measure 1",
              $ref: "shared_schema#/definitions/ventoux_classes",
            },
            measure_od: {
              type: "string",
              pattern:
                "^(([A-Z]{3}|[\\d*]):([A-Z]{3}|[\\d*]|)|JL[A-Z0-9_-]{1,}|ODG_ALL)?$",
              maxLength: 20,
              title: "Measure 1 OD",
              description: "Measure 1 OD criteria",
              tooltip:
                "OD filter for Measure 1. A single OD, an OD with a wildcard eg PAD:* or *:*, a Journey List or ODG_ALL to use the OD Group OD's",
              errorMessage: {
                pattern:
                  "Measure 1 OD must be a single OD (eg PAD:SWI), an OD with a wildcard (eg PAD:* or *:*), a Journey List (Prefix JL* eg JL0001) or ODG_ALL",
                type: "Measure 1 OD must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^JL[A-Z0-9_-]{1,}$",
                  target: "journey-list",
                },
              ],
            },
            measure1_options: {
              type: "string",
              title: "Measure 1 Options",
              description: "Measure 1 Options",
              tooltip:
                "Properties related to Measure 1, for example Bucket criteria or a Competitor Match Rule",
              readOnly: false,
              popup: [
                {
                  criteria: "^CM[A-Z0-9_-]{1,}$",
                  target: "competitor-rule",
                },
              ],
            },
            measure2: {
              type: ["string", "null"],
              title: "Measure 2",
              description: "Measure 2",
              enum: [
                "AVAIL_BKT",
                "BOOKLOAD",
                "FARE_CM",
                "LOW_FARE",
                "LOW_WU_FARE",
                "FARE_SINGLE_EQUIV",
                "WU_FARE_SINGLE_EQUIV",
                "FARE_ACTUAL",
                "WU_FARE_ACTUAL",
                "F01_PHYS_LF",
                "F01_WU_LF",
                "F01_BLF",
                "HA1_BLF",
                "F02_BLF",
                "F03_BLF",
                "F04_BLF",
                "BOOKINGS_IN_BKT",
                "BOOKINGS_IN_BKT_LEG",
              ],
              tooltip:
                "Ventoux Measure - eg 'BOOKLOAD' to return the % loading for the Measure OD - see Documentation for options",
              readOnly: false,
            },
            measure2_class: {
              type: ["string", "null"],
              readOnly: false,
              title: "Measure 2 Class",
              description: "Measure 2 Class",
              tooltip: "Class filter for Measure 2",
              $ref: "shared_schema#/definitions/ventoux_classes",
            },
            measure2_od: {
              type: "string",
              pattern:
                "^(([A-Z]{3}|[\\d*]):([A-Z]{3}|[\\d*]|)|JL[A-Z0-9_-]{1,}|ODG_ALL)?$",
              maxLength: 20,
              title: "Measure 2 OD",
              description: "Measure 2 OD criteria",
              tooltip:
                "OD filter for Measure 2. A single OD, an OD with a wildcard *, a Journey List or ODG_ALL to use the OD Group OD's",
              errorMessage: {
                pattern:
                  "Measure 2 OD must be a single OD (eg PAD:SWI), an OD with a wildcard (eg PAD:*), a Journey List (Prefix JL* eg JL0001) or ODG_ALL",
                type: "Measure 1 OD must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^JL[A-Z0-9_-]{1,}$",
                  target: "journey-list",
                },
              ],
            },
            measure2_options: {
              type: "string",
              title: "Measure 2 Options",
              description: "Measure 2 Options",
              tooltip:
                "Properties related to Measure 2, for example Bucket criteria or a Competitor Match Rule",
              readOnly: false,
              popup: [
                {
                  criteria: "^CM[A-Z0-9_-]{1,}$",
                  target: "competitor-rule",
                },
              ],
            },
            action_type: {
              type: ["string"],
              title: "Action Type",
              description: "Action Type",
              enum: [
                "PROFILE",
                "BKT_OPEN",
                "BKT_CLOSE",
                "BKT_CHANGE",
                "BKT_SHUT",
                "BKT_ALLOC",
                "TARGET_FARE",
                "BKT_MULTI",
              ],
              tooltip:
                "Ventoux Action Type - eg 'BKT_CLOSE' to set the allocation to zero on the nominated Bucket and Buckets below this in the nest - see Documentation for options",
              readOnly: false,
            },
            apply_class: {
              type: ["string"],
              readOnly: false,
              title: "Apply To Class",
              description: "Action Apply To Class",
              tooltip: "Action will apply to this Class",
              $ref: "shared_schema#/definitions/ventoux_classes",
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            action_rule_itm: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  dtd_fr: {
                    type: "integer",
                    minimum: 0,
                    maximum: 999,
                    title: "DTD From",
                    description: "DTD From",
                    tooltip:
                      "DTD Boundary - Action applies to DTDs less than and including this DTD until the next applicable DTD boundary is hit",
                    readOnly: false,
                  },
                  thresholds: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        measure_threshold: {
                          type: "string",
                          pattern: "^[A-Z0-9%._-]*$",
                          maxLength: 20,
                          title: "Measure Threshold",
                          tooltip:
                            "Format depends on Measure - see Documentation",
                          description: "Measure 1 Threshold",
                          errorMessage: {
                            pattern:
                              "Measure 1 Threshold eg BOOKLOAD measure requires 3 digit percentage eg 005% - see Documentation for allowed values",
                            type: "Measure 1 Threshold must be a string",
                          },
                          readOnly: false,
                        },
                        measure2_threshold: {
                          type: "string",
                          pattern: "^[A-Z0-9%._-]*$",
                          maxLength: 20,
                          title: "Measure 2 Threshold",
                          description: "Measure 2 Threshold",
                          tooltip:
                            "Format depends on Measure - see Documentation",
                          errorMessage: {
                            pattern:
                              "Measure 2 Threshold eg BOOKLOAD measure requires 3 digit percentage eg 005% - see Documentation for allowed values",
                            type: "Measure 2 Threshold must be a string",
                          },
                          readOnly: false,
                        },
                        action: {
                          type: "string",
                          title: "Action",
                          description: "Required Action",
                          readOnly: false,
                        },
                      },
                      required: ["measure_threshold"],
                    },
                  },
                },
                required: ["dtd_fr", "thresholds"],
              },
            },
          },
          required: [
            "action_rule",
            "deleted",
            "measure_od",
            "measure",
            "measure_class",
            "action_type",
            "apply_class",
            "action_rule_itm",
          ],
          dependentRequired: {
            measure2_class: ["measure2", "measure2_od"],
            measure2_od: ["measure2", "measure2_class"],
            measure2: ["measure2_class", "measure2_od"],
          },
          $comment:
            "following if statements conditionally validate contents of fields based on other fields",
          allOf: [
            {
              if: {
                properties: {
                  measure: {
                    const: "FARE_CM",
                  },
                },
                required: ["measure"],
              },
              then: {
                properties: {
                  measure1_options: {
                    pattern: "^CM[A-Z0-9_-]{1,}$",
                  },
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure_threshold: {
                                enum: ["COMP_EXPEN", "COMP_CHEAP"],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  measure2: {
                    const: "FARE_CM",
                  },
                },
                required: ["measure2"],
              },
              then: {
                properties: {
                  measure2_options: {
                    pattern: "^CM[A-Z0-9_-]{1,}$",
                  },
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure2_threshold: {
                                enum: ["COMP_EXPEN", "COMP_CHEAP"],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  measure: {
                    anyOf: [
                      {
                        const: "LOW_FARE",
                      },
                      {
                        const: "LOW_WU_FARE",
                      },
                      {
                        const: "FARE_SINGLE_EQUIV",
                      },
                      {
                        const: "WU_FARE_SINGLE_EQUIV",
                      },
                      {
                        const: "FARE_ACTUAL",
                      },
                      {
                        const: "WU_FARE_ACTUAL",
                      },
                    ],
                  },
                },
                required: ["measure"],
              },
              then: {
                properties: {
                  measure_od: {
                    pattern: "^(([A-Z]{3}):([A-Z]{3})|JL[A-Z0-9_-]{1,})?$",
                  },
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure_threshold: {
                                pattern: "^\\d+(\\.\\d+)?$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  measure2: {
                    anyOf: [
                      {
                        const: "LOW_FARE",
                      },
                      {
                        const: "LOW_WU_FARE",
                      },
                      {
                        const: "FARE_SINGLE_EQUIV",
                      },
                      {
                        const: "WU_FARE_SINGLE_EQUIV",
                      },
                      {
                        const: "FARE_ACTUAL",
                      },
                      {
                        const: "WU_FARE_ACTUAL",
                      },
                    ],
                  },
                },
                required: ["measure2"],
              },
              then: {
                properties: {
                  measure2_od: {
                    pattern: "^(([A-Z]{3}):([A-Z]{3})|JL[A-Z0-9_-]{1,})?$",
                  },
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure2_threshold: {
                                pattern: "^\\d+(\\.\\d+)?$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  measure: {
                    anyOf: [
                      {
                        const: "BOOKLOAD",
                      },
                      {
                        const: "F01_PHYS_LF",
                      },
                      {
                        const: "F01_WU_LF",
                      },
                      {
                        const: "F01_BLF",
                      },
                      {
                        const: "HA1_BLF",
                      },
                      {
                        const: "F02_BLF",
                      },
                      {
                        const: "F03_BLF",
                      },
                      {
                        const: "F04_BLF",
                      },
                    ],
                  },
                },
                required: ["measure"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure_threshold: {
                                pattern: "^\\d+(\\.\\d+)?\\%?$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  measure2: {
                    anyOf: [
                      {
                        const: "BOOKLOAD",
                      },
                      {
                        const: "F01_PHYS_LF",
                      },
                      {
                        const: "F01_WU_LF",
                      },
                      {
                        const: "F01_BLF",
                      },
                      {
                        const: "HA1_BLF",
                      },
                      {
                        const: "F02_BLF",
                      },
                      {
                        const: "F03_BLF",
                      },
                      {
                        const: "F04_BLF",
                      },
                    ],
                  },
                },
                required: ["measure2"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure2_threshold: {
                                pattern: "^\\d+(\\.\\d+)?\\%?$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  measure: {
                    anyOf: [
                      {
                        const: "BOOKINGS_IN_BKT",
                      },
                      {
                        const: "BOOKINGS_IN_BKT_LEG",
                      },
                    ],
                  },
                },
                required: ["measure"],
              },
              then: {
                properties: {
                  measure1_options: {
                    pattern: "^[a-zA-Z0-9,\\s\\-\\<\\>\\=]*$",
                  },
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure_threshold: {
                                pattern: "^[0-9]*$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  measure2: {
                    anyOf: [
                      {
                        const: "BOOKINGS_IN_BKT",
                      },
                      {
                        const: "BOOKINGS_IN_BKT_LEG",
                      },
                    ],
                  },
                },
                required: ["measure2"],
              },
              then: {
                properties: {
                  measure2_options: {
                    pattern: "^[a-zA-Z0-9,\\s\\-\\<\\>\\=]*$",
                  },
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure2_threshold: {
                                pattern: "^[0-9]*$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  action_type: {
                    const: "TARGET_FARE",
                  },
                },
                required: ["action_type"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              action: {
                                pattern:
                                  "^(?:|-?£?\\d+(?:\\.\\d+)?%?\\\\(?:[0-9]{1,3}|[0-9]{1,3}RA_LOG|[0-9]{1,3}\\%|[0-9]{1,3}\\%RA_MIN|[0-9]{1,3}\\%RA_MAX|[0-9]{1,3}\\%RA_LOG|[0-9]{1,3}\\%CLF))$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  action_type: {
                    const: "BKT_CLOSE",
                  },
                },
                required: ["action_type"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              action: {
                                pattern: "^[a-zA-Z0-9]*$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  action_type: {
                    const: "BKT_OPEN",
                  },
                },
                required: ["action_type"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              action: {
                                pattern:
                                  "^(?:|[a-zA-Z0-9]+\\\\(?:[0-9]{1,3}|[0-9]{1,3}RA_LOG|[0-9]{1,3}\\%|[0-9]{1,3}\\%RA_MIN|[0-9]{1,3}\\%RA_MAX|[0-9]{1,3}\\%RA_LOG|[0-9]{1,3}\\%CLF|[0-9]{1,3}\\%RA_MIN))$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  action_type: {
                    const: "BKT_CHANGE",
                  },
                },
                required: ["action_type"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              action: {
                                pattern:
                                  "^(?:|(?:[0-9]{1,3}|[0-9]{1,3}RA_LOG|[0-9]{1,3}\\%|[0-9]{1,3}\\%RA_MIN|[0-9]{1,3}\\%RA_MAX|[0-9]{1,3}\\%RA_LOG|[0-9]{1,3}\\%CLF|[0-9]{1,3}\\%RA_MIN))$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  action_type: {
                    const: "PROFILE",
                  },
                },
                required: ["action_type"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              action: {
                                pattern: "^[0-9]*$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  action_type: {
                    const: "BKT_SHUT",
                  },
                },
                required: ["action_type"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              action: {
                                pattern: "^[a-zA-Z0-9,\\s\\-\\<\\>\\=]*$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  action_type: {
                    const: "BKT_ALLOC",
                  },
                },
                required: ["action_type"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              action: {
                                pattern:
                                  "^(?:|[a-zA-Z0-9,\\s\\-\\<\\>\\=]+\\\\(?:[0-9]{1,3}|[0-9]{1,3}RA_LOG|[0-9]{1,3}\\%|[0-9]{1,3}\\%RA_MIN|[0-9]{1,3}\\%RA_MAX|[0-9]{1,3}\\%RA_LOG|[0-9]{1,3}\\%CLF|[0-9]{1,3}\\%RA_MIN))$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  action_type: {
                    const: "BKT_MULTI",
                  },
                },
                required: ["action_type"],
              },
              then: {
                properties: {
                  action_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              action: {
                                pattern:
                                  "^(?:|[a-zA-Z0-9,\\s\\-\\<\\>\\=]+\\\\(?:[0-9]{1,3}|[0-9]{1,3}RA_LOG|[0-9]{1,3}\\%|[0-9]{1,3}\\%RA_MIN|[0-9]{1,3}\\%RA_MAX|[0-9]{1,3}\\%RA_LOG|[0-9]{1,3}\\%CLF|[0-9]{1,3}\\%RA_MIN))(?:;\\s*(?:|[a-zA-Z0-9,\\s\\-\\<\\>\\=]+\\\\(?:[0-9]{1,3}|[0-9]{1,3}RA_LOG|[0-9]{1,3}\\%|[0-9]{1,3}\\%RA_MIN|[0-9]{1,3}\\%RA_MAX|[0-9]{1,3}\\%RA_LOG|[0-9]{1,3}\\%CLF|[0-9]{1,3}\\%RA_MIN)))*$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "auto_opt_schema",
        title: "Auto Opt Parameters",
        type: "array",
        items: {
          type: "object",
          properties: {
            queue: {
              type: "string",
              title: "Queue",
              description: "Queue",
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Marked for Deletion",
              readOnly: false,
            },
            status: {
              type: "string",
              title: "Status",
              description: "Queue Status",
              readOnly: false,
            },
            direction: {
              type: "string",
              maxLength: 30,
              title: "Direction",
              description: "Auto Opt Queue Direction",
              readOnly: false,
            },
            valid_from: {
              type: "string",
              format: "time",
              title: "Valid From",
              description: "Valid From Time",
              readOnly: false,
            },
            valid_to: {
              type: "string",
              format: "time",
              title: "Valid To",
              description: "Valid To Time",
              readOnly: false,
            },
            days: {
              type: "integer",
              title: "Days",
              description: "Weekdays",
              tooltip:
                "Service Weekday(s) (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
              minimum: 1,
              maximum: 1234567,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              readOnly: true,
            },
          },
        },
        required: ["queue", "status"],
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "bucket_schema",
        title: "Ventoux Bucket configuration",
        type: "array",
        items: {
          type: "object",
          properties: {
            bucket: {
              type: "string",
              title: "Bucket",
              description: "Bucket Code",
              tooltip: "Bucket Code, as configured in S3P",
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Deletion Flag - nb hidden in System Parameters",
            },
            ignore_lowest: {
              type: "boolean",
              title: "Ignore for Lowest Available Bucket Measure",
              description: "Ignore for Lowest Available Bucket Measure",
              tooltip:
                "Ventoux will calculate the Lowest Available Bucket in each class every time a service is Optimised. This setting can be used to ignore certain buckets - typically those lower in a bucket nest that are used to manage Promotions and special/group bookings",
            },
            ignore_cheapest: {
              type: "boolean",
              title: "Ignore for Cheapest Available Bucket Measure",
              description: "Ignore for Cheapest Available Bucket Measure",
              tooltip:
                "When evaluating Competitor Matching Rules, Ventoux must consider our lowest available fare. This setting can now be set to ignore Buckets that are not generally available for sale such as heavily channel restricted Buckets",
            },
            no_actions: {
              type: "boolean",
              title: "Prevent all Bucket Actions",
              description: "Prevent all Bucket Actions",
              tooltip:
                "If an Action Rule triggers an action to change Buckets (eg close below a certain level), this setting can be used to exempt specific buckets from this change. Again, this is may typically be used to avoid closing Promotions at the same time as the rest of the nest",
            },
            no_fare_actions: {
              type: "boolean",
              title: "Prevent Fare Bucket Actions",
              description: "Prevent Fare related Bucket Actions",
              tooltip:
                "This will stop any Fare related action from changing the Bucket. It is mainly intended to be used to prevent Walk Up bucket booking limits from being unintentionally changed, for example by a Competitor Action looking to increase our lowest available fare",
            },
            bucket_display_group: {
              type: "string",
              title: "Bucket Display Group",
              description: "Bucket Display Group",
              tooltip:
                "Grouping of buckets used for visualisations in the Ventoux UI",
            },
          },
          required: ["bucket"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "calendar_schema",
        title: "Ventoux Calendar",
        type: "array",
        items: {
          type: "object",
          properties: {
            cal_date: {
              type: "string",
              format: "date",
              title: "Calendar Date",
              description: "Calendar Date",
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Date is Deleted",
              readOnly: false,
            },
            date_category: {
              type: ["string"],
              $ref: "shared_schema#/definitions/calendar_categories",
              title: "Date Category",
              description: "Date Category",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              readOnly: true,
            },
          },
          required: ["cal_date", "date_category"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "competitor_rule_schema",
        title: "Ventoux Competitor Match Rule",
        type: "array",
        items: {
          type: "object",
          properties: {
            competitor_rule: {
              type: "string",
              pattern: "^CM[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "Competitor Rule",
              description: "Competitor Match Rule",
              readOnly: false,
              tooltip: "Competitor Match Rule (Prefix CM* eg CM001)",
              errorMessage: {
                pattern: "Competitor Match Rule must begin 'CM' (eg CM001)",
                type: "Competitor Match Rule must be a string",
              },
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              title: "Route",
              description: "Route",
              tooltip: "Limited to Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
              readOnly: false,
            },
            competitor_rule_txt: {
              type: "string",
              title: "Name",
              description: "Competitor Match Rule Name",
              tooltip: "Description of Competitor Match Rule",
              readOnly: false,
            },
            measure_od: {
              type: "string",
              pattern: "^([A-Z]{3}:[A-Z]{3})$",
              maxLength: 7,
              title: "Measure OD",
              description: "Measure OD",
              tooltip:
                "Own TOC journey you wish to find competitor services for. For example, if we want to find competition for Oxford to London, the Journey should be set to OXF:PAD, if our own TOC services terminate at Paddington. See the System > Scrape Locations parameter for which scraped locations will be matched to the own TOC CRS codes.",
              errorMessage: {
                pattern:
                  "Measure OD must be a single OD in format CRS:CRS - eg MAN:EUS",
                type: "Measure OD must be a string",
              },
              readOnly: false,
            },
            margin: {
              type: "integer",
              minimum: 0,
              maximum: 240,
              title: "Margin",
              description: "Margin",
              tooltip:
                "This is the time in minutes we wish to scan either side of our train departure time to find the best competitor match. For example, if our train departs at 10:45, and this field is set to 30, the system will consider trains between 10:15 and 11:15",
              readOnly: false,
            },
            match_criteria: {
              type: ["string"],
              title: "Match Criteria",
              description: "Match Criteria",
              enum: ["CHEAP_MARG", "CHEAP_ADJA", "CLOSEST"],
              tooltip:
                "This defines which matching criteria the system should use. One of the 3 options: CHEAP_ADJA (find the closest competitor service before and after our train, then select the cheapest of these), CHEAP_MARG (the cheapest competitor service within the Margin minutes) or CLOSEST (competitor train with the nearest departure time to our service)",
              readOnly: false,
            },
            max_duration: {
              type: "string",
              pattern: "^[0-9%]*$",
              maxLength: 5,
              title: "Max Duration",
              description: "Max Duration",
              tooltip:
                "Exclude competitor services with long journey durations. Use whole minutes (eg 60 means only match to competitor services with journey durations of up to 60 minutes) or as a % of our service's duration (eg 150% would mean we would allow competitor durations of 90 minutes if our service took 60 minutes)",
              errorMessage: {
                pattern:
                  "Maximum Duration must be numeric value (eg 60) or numeric with percentage symbol (eg 60%)",
                type: "Maximum Duration must be a string",
              },
              readOnly: false,
            },
            fare_change_limit: {
              type: "string",
              pattern: "^[0-9%£.]*$",
              maxLength: 10,
              title: "Fare Change Limit",
              description: "Fare Change Limit",
              tooltip:
                "Use this to control how big a change can be made to our available fare versus the base profile available fare. The Limit can be expressed in £ or a % of our base profile fare. For example, if the best available fare on our base profile is £10, and you set a change limit of 40%, the system will only allow our fare to go down to £6 or up to £14",
              errorMessage: {
                pattern:
                  "Fare Change Limit must be numeric with a £ symbol (eg £5.50) or numeric with percentage symbol (eg 60%)",
                type: "Fare Change Limit must be a string",
              },
              readOnly: false,
            },
            consider_splits: {
              type: "boolean",
              title: "Consider Split Fares",
              description: "Consider Split Fares",
              tooltip:
                "If enabled, the Match Rule will consider Splitsave fares as well as regular fares when finding the lowest competitor fare",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            competitor_rule_itm: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  carriers: {
                    type: "string",
                    pattern: "^[A-Z,~]*$",
                    maxLength: 30,
                    title: "Carrier",
                    description: "Carrier",
                    tooltip:
                      "The Carrier code(s) that should be considered when looking for the competitor service. Multiple Carrier codes may need to be specified - if so separate the Carrier codes with a comma (eg XC,GR). If you wish to pick up competitor offerings with changes, use the format of the Carrier as shown on the Service List Competition tab (eg XC~GR). These options can be combined (eg XC,GR,XC~GR,GR~XC).",
                    errorMessage: {
                      pattern:
                        "Carrier must be upper-case characters (separated with comma if multiple values, and ~ for changes).",
                      type: "Carrier must be a string",
                    },
                    readOnly: false,
                  },
                  fare_offset: {
                    type: "string",
                    pattern: "^[0-9%£.-]*$",
                    maxLength: 10,
                    title: "Fare Offset",
                    description: "Fare Offset",
                    tooltip:
                      "The Offset (if any) to be applied to the competitor's fare. Can be expressed as a % or £ value. Serves two purposes: 1) It will impact which competitor service is the cheapest. For example, if an offset of £1.50 is applied to Northern trains fare of £8 but no offset is applied to an East Mids fare of £9, the East Mids service will be considered the cheapest.  2) It will impact which of our Yield Groups is selected to beat the competition. For example, if we have fares of £8 (Bucket A) and £10 (Bucket B), and a competitor fare of £9 with a £1.50 offset, the system will select Bucket B as being sufficient to beat the offset fare of £10.50",
                    errorMessage: {
                      pattern:
                        "Fare Offset must be numeric with a £ symbol (eg £5.50) or numeric with percentage symbol (eg 60%)",
                      type: "Fare Offset must be a string",
                    },
                    readOnly: false,
                  },
                },
                required: ["carriers"],
              },
            },
          },
          required: [
            "competitor_rule",
            "measure_od",
            "competitor_rule_itm",
            "margin",
            "match_criteria",
          ],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "csi_rule_grp_schema",
        title: "Ventoux CSI Rule Group",
        type: "array",
        items: {
          type: "object",
          properties: {
            csi_rule_grp: {
              type: "string",
              pattern: "^CSG[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "CSI Rule Group",
              description: "CSI Rule Group",
              tooltip:
                "CSI Rule Group must begin with 'CSG' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg CSG0001)",
              errorMessage: {
                type: "CSI Rule Group must begin with 'CSG' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg CSG0001)",
              },
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "CSI Rule Group is deleted",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              readOnly: false,
              title: "Route",
              description: "Route",
              tooltip: "Limited to Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
            },
            csi_rule_grp_txt: {
              type: "string",
              title: "Name",
              description: "CSI Rule Group Name",
              tooltip: "Description of CSI Rule Group",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            csi_rule_grp_itm: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  sort: {
                    type: "integer",
                    minimum: 1,
                    title: "Sequence",
                    description: "Sequence",
                    tooltip:
                      "Number to indicate the order that the CSI Rules are executed (eg 1 for first)",
                    uniqueItems: true,
                    readOnly: false,
                  },
                  csi_rule: {
                    type: "string",
                    pattern: "^CSR[A-Z0-9_-]{1,}$",
                    maxLength: 20,
                    title: "CSI Rule",
                    description: "CSI Rule",
                    tooltip:
                      "CSI Rule must begin with 'CSR' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg CSR0001)",
                    errorMessage: {
                      type: "CSI Rule must begin with 'CSR' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg CSR0001)",
                    },
                    readOnly: false,
                    popup: [
                      {
                        criteria: "^CSR[A-Z0-9_-]{1,}$",
                        target: "csi-rule",
                      },
                    ],
                  },
                  csi_rule_grp_itm_txt: {
                    type: "string",
                    title: "Rule Text",
                    description: "Rule Text",
                    tooltip: "Description of CSI Rule Group Item",
                    readOnly: false,
                  },
                  srv_dt_fr: {
                    type: "string",
                    format: "date",
                    title: "Service Date From",
                    description: "Service Date From",
                    tooltip: "Service Date Range - From",
                    readOnly: false,
                  },
                  srv_dt_to: {
                    type: "string",
                    format: "date",
                    title: "Service Date To",
                    description: "Service Date To",
                    tooltip: "Service Date Range - To",
                    readOnly: false,
                  },
                  srv_date_list: {
                    type: "string",
                    pattern: "^DL[A-Z0-9_-]{1,}$",
                    maxLength: 20,
                    title: "Service Date List",
                    description: "Service Date List",
                    tooltip:
                      "Date List restriction for Service Date (Prefix DL* eg DL12345)- nb works in addition to the Service Date Range",
                    errorMessage: {
                      pattern:
                        "Service Date List must begin with 'DL' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen)",
                      type: "Service Date List must be a string",
                    },
                    readOnly: false,
                    popup: [
                      {
                        criteria: "^DL[A-Z0-9_-]{1,}$",
                        target: "date-list",
                      },
                    ],
                  },
                  dtd_fr: {
                    type: ["integer", "null"],
                    minimum: 0,
                    maximum: 999,
                    title: "DTD From",
                    description: "DTD From",
                    tooltip:
                      "Days To Departure range 'From' (eg 0 for services departing today)",
                    readOnly: false,
                  },
                  dtd_to: {
                    type: ["integer", "null"],
                    minimum: 0,
                    maximum: 999,
                    title: "DTD To",
                    description: "DTD To",
                    tooltip:
                      "Days To Departure range 'To' (eg 1 for services departing tomorrow)",
                    readOnly: false,
                  },
                  weekdays: {
                    type: "integer",
                    title: "Days",
                    description: "Weekdays",
                    tooltip:
                      "Service Weekday(s) (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
                    minimum: 1,
                    maximum: 1234567,
                    errorMessage: {
                      type: "Days must be a numeric value representing the relevant Service day(s) of the week. (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
                    },
                    readOnly: false,
                  },
                },
                required: ["sort", "csi_rule", "csi_rule_grp_itm_txt"],
              },
            },
          },
          required: ["csi_rule_grp", "csi_rule_grp_itm"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "csi_rule_schema",
        title: "Ventoux CSI Rule",
        type: "array",
        items: {
          type: "object",
          properties: {
            csi_rule: {
              type: "string",
              pattern: "^CSR[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "CSI Rule",
              description: "CSI Rule",
              tooltip:
                "CSI Rule must begin with 'CSR' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg CSR0001)",
              errorMessage: {
                type: "CSI Rule must begin with 'CSR' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg CSR0001)",
              },
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "CSI Rule is Deleted",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              readOnly: false,
              title: "Route",
              description: "Route",
              tooltip: "Limited to Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
            },
            rule_txt: {
              type: "string",
              title: "Name",
              description: "CSI Rule Name",
              tooltip: "Description of CSI Rule",
              readOnly: false,
            },
            measure_od: {
              type: "string",
              pattern:
                "^(([A-Z]{3}|[\\d*]):([A-Z]{3}|[\\d*]|)|JL[A-Z0-9_-]{1,})?$",
              maxLength: 20,
              title: "Measure 1 OD",
              description: "Measure 1 OD criteria",
              tooltip:
                "OD filter for Measure 1. A single OD, an OD with a wildcard * or a Journey List",
              errorMessage: {
                pattern:
                  "Measure 1 OD must be a single OD (eg PAD:SWI), an OD with a wildcard (eg PAD:*) or a Journey List (Prefix JL* eg JL0001)",
                type: "Measure 1 OD must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^JL[A-Z0-9_-]{1,}$",
                  target: "journey-list",
                },
              ],
            },
            measure: {
              type: ["string"],
              title: "Measure 1",
              description: "Measure 1",
              enum: [
                "PACE",
                "MAX_BLF",
                "MAX_BLF_HT",
                "BLF_CHANGE",
                "FARE_CHANGE",
                "FARE_CHANGE_ACTUAL",
                "FARE_CHANGE_SINGLE_EQUIV",
                "SPLIT_RISK",
                "SPLIT_RISK_NOT_WU",
                "HA1_BLF_LAST_DTD",
                "F03_BLF_LAST_DTD",
                "ACT_BLF_LAST_DTD",
                "HA1_ACT_VAR_LAST_DTD",
                "F03_ACT_VAR_LAST_DTD",
                "PHYS_CAP_CHANGE_ABS",
                "PHYS_CAP_CHANGE_PCT",
              ],
              tooltip:
                "CSI Measure 1 - eg 'PACE' to return the net change in Bookings over the last n days, divided by n (ie Mean average change in Bookings per Day) for the Measure OD & Measure Class - see Documentation for options",
              readOnly: false,
            },
            measure_class: {
              type: ["string"],
              readOnly: false,
              title: "Measure 1 Class",
              description: "Measure 1 Class",
              tooltip: "Class filter for Measure 1",
              $ref: "shared_schema#/definitions/ventoux_classes",
            },
            measure1_options: {
              type: "string",
              title: "Measure 1 Options",
              description: "Measure 1 Options",
              tooltip:
                "Properties related to Measure 1, for example the number of days to measure the pace change using PACE (eg '3 DAYS')",
              readOnly: false,
            },
            measure2: {
              type: ["string", "null"],
              title: "Measure 2",
              description: "Measure 2",
              enum: [
                "PACE",
                "MAX_BLF",
                "MAX_BLF_HT",
                "BLF_CHANGE",
                "FARE_CHANGE",
                "FARE_CHANGE_ACTUAL",
                "FARE_CHANGE_SINGLE_EQUIV",
                "SPLIT_RISK",
                "SPLIT_RISK_NOT_WU",
                "HA1_BLF_LAST_DTD",
                "F03_BLF_LAST_DTD",
                "ACT_BLF_LAST_DTD",
                "HA1_ACT_VAR_LAST_DTD",
                "F03_ACT_VAR_LAST_DTD",
                "PHYS_CAP_CHANGE",
              ],
              tooltip:
                "CSI Measure 2 - eg 'PACE' to return the net change in Bookings over the last n days (specified in 'Options'), divided by n (ie Mean average change in Bookings per Day) for the Measure 2 OD & Measure 2 Class - see Documentation for options",
              readOnly: false,
            },
            measure2_class: {
              type: ["string", "null"],
              readOnly: false,
              title: "Measure 2 Class",
              description: "Measure 2 Class",
              tooltip: "Class filter for Measure 2",
              $ref: "shared_schema#/definitions/ventoux_classes",
            },
            measure2_od: {
              type: "string",
              pattern:
                "^(([A-Z]{3}|[\\d*]):([A-Z]{3}|[\\d*]|)|JL[A-Z0-9_-]{1,})?$",
              maxLength: 20,
              title: "Measure 2 OD",
              description: "Measure 2 OD criteria",
              tooltip:
                "OD filter for Measure 2. A single OD, an OD with a wildcard * or a Journey List",
              errorMessage: {
                pattern:
                  "Measure 2 OD must be a single OD (eg PAD:SWI), an OD with a wildcard (eg PAD:*) or a Journey List (Prefix JL* eg JL0001)",
                type: "Measure 2 OD must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^JL[A-Z0-9_-]{1,}$",
                  target: "journey-list",
                },
              ],
            },
            measure2_options: {
              type: "string",
              title: "Measure 2 Options",
              description: "Measure 2 Options",
              tooltip:
                "Properties related to Measure 2, for example the number of days to measure the pace change using PACE (eg '7 DAYS')",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            csi_rule_itm: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  dtd_fr: {
                    type: "integer",
                    minimum: 0,
                    maximum: 999,
                    title: "DTD From",
                    description: "DTD From",
                    tooltip:
                      "DTD Boundary - CSI applies to DTDs less than and including this DTD until the next applicable DTD boundary is hit",
                    readOnly: false,
                  },
                  thresholds: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        measure_threshold: {
                          type: "string",
                          pattern: "^[A-Z0-9%._-]*$",
                          maxLength: 20,
                          title: "Measure Threshold",
                          tooltip:
                            "Criteria for the nominated Measure. Numeric criteria will be interpreted as Less Than or Equal To rules, and processed in order. So if the CSI Measure returns 40%, and you have Thresholds at 30%, 50%, and 100%, the 50% row will be used",
                          description: "Measure 1 Threshold",
                          errorMessage: {
                            pattern:
                              "Measure 1 Threshold value invalid - see Documentation for allowed values",
                            type: "Measure 1 Threshold must be a string",
                          },
                          readOnly: false,
                        },
                        measure2_threshold: {
                          type: "string",
                          pattern: "^[A-Z0-9%._-]*$",
                          maxLength: 20,
                          title: "Measure 2 Threshold",
                          tooltip:
                            "Criteria for the nominated second Measure (if any). Numeric criteria will be interpreted as Less Than or Equal To rules, and processed in order. So if the CSI Measure returns 40%, and you have Thresholds at 30%, 50%, and 100%, the 50% row will be used",
                          description: "Measure 2 Threshold",
                          errorMessage: {
                            pattern:
                              "Measure 2 Threshold value invalid - see Documentation for allowed values",
                            type: "Measure 2 Threshold must be a string",
                          },
                          readOnly: false,
                        },
                        score: {
                          type: "integer",
                          title: "Score",
                          description: "Score",
                          tooltip:
                            "CSI Score - numeric value (nb can be negative)",
                          readOnly: false,
                        },
                      },
                      required: ["measure_threshold"],
                    },
                  },
                },
                required: ["dtd_fr", "thresholds"],
              },
            },
          },
          required: [
            "csi_rule",
            "deleted",
            "measure_od",
            "measure",
            "measure_class",
            "csi_rule_itm",
          ],
          dependentRequired: {
            measure2_class: ["measure2", "measure2_od"],
            measure2_od: ["measure2", "measure2_class"],
            measure2: ["measure2_class", "measure2_od"],
          },
          $comment:
            "following if statements conditionally validate contents of fields based on other fields",
          allOf: [
            {
              if: {
                properties: {
                  measure: {
                    const: "PACE",
                  },
                },
                required: ["measure"],
              },
              then: {
                properties: {
                  measure1_options: {
                    pattern: "^(([0-9]{1,3} (DAY|DAYS))|(AUTO))$",
                  },
                  csi_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure_threshold: {
                                pattern: "^-?\\d+$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  measure2: {
                    const: "PACE",
                  },
                },
                required: ["measure2"],
              },
              then: {
                properties: {
                  measure2_options: {
                    pattern: "^(([0-9]{1,3} (DAY|DAYS))|(AUTO))$",
                  },
                  csi_rule_itm: {
                    items: {
                      properties: {
                        thresholds: {
                          items: {
                            properties: {
                              measure2_threshold: {
                                pattern: "^-?\\d+$",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "csi_service_grp_schema",
        title: "Ventoux CSI Service Group",
        type: "array",
        items: {
          type: "object",
          properties: {
            csi_service_grp: {
              type: "integer",
              minimum: 1,
              title: "Service Group",
              description: "Service Group",
              tooltip:
                "Lower number = higher priority (ie 1 is the highest priority)",
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "CSI Service Group Deleted Flag",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              title: "Route",
              description: "Route",
              tooltip:
                "Validated against Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
              readOnly: false,
            },
            csi_service_grp_txt: {
              type: "string",
              title: "Name",
              description: "CSI Service Group Name",
              tooltip: "Description",
              readOnly: false,
            },
            active: {
              type: "boolean",
              title: "Active",
              description: "Active Flag",
              tooltip:
                "Mark as active (ie considered in the CSI determination) or inactive. (nb inactive CSI Service Groups will NOT be removed)",
              readOnly: false,
            },
            srv_dt_fr: {
              type: "string",
              format: "date",
              title: "Service Date From",
              description: "Service Date From",
              tooltip: "Mandatory Service Date range",
              readOnly: false,
            },
            srv_dt_to: {
              type: "string",
              format: "date",
              title: "Service Date To",
              description: "Service Date To",
              tooltip: "Mandatory Service Date range",
              readOnly: false,
            },
            srv_date_list: {
              type: "string",
              pattern: "^DL[A-Z0-9_-]{1,}$",
              title: "Service Date List",
              description: "Service Date List",
              tooltip:
                "Date List restriction for Service Date (Prefix 'DL' eg DL12345)- nb works in addition to the mandatory Service Date Range",
              errorMessage: {
                pattern:
                  "Service Date List must begin with 'DL' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen)",
                type: "Service Date List must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^DL[A-Z0-9_-]{1,}$",
                  target: "date-list",
                },
              ],
            },
            dtd_fr: {
              oneOf: [
                {
                  type: "integer",
                  minimum: 0,
                  maximum: 999,
                },
                {
                  type: "null",
                },
              ],
              title: "DTD From",
              description: "DTD From",
              tooltip:
                "Days To Departure range 'From' (eg 0 for services departing today)",
              readOnly: false,
            },
            dtd_to: {
              oneOf: [
                {
                  type: "integer",
                  minimum: 0,
                  maximum: 999,
                },
                {
                  type: "null",
                },
              ],
              title: "DTD To",
              description: "DTD To",
              tooltip:
                "Days To Departure range 'To' (eg 1 for services departing tomorrow)",
              readOnly: false,
            },
            val_fr: {
              type: "string",
              format: "date",
              title: "Valid From Date",
              description: "Valid From Date",
              tooltip:
                "Date range for execution date of the CSI Calculation - 'From'",
              readOnly: false,
            },
            val_to: {
              type: "string",
              format: "date",
              title: "Valid To Date",
              description: "Valid To Date",
              tooltip:
                "Date range for execution date of the CSI Calculation - 'To'",
              readOnly: false,
            },
            val_date_list: {
              type: "string",
              pattern: "^DL[A-Z0-9_-]{1,}$",
              title: "Valid Date List",
              description: "Valid Date List",
              tooltip:
                "Date List restriction for CSI execution date (Prefix 'DL' eg DL12345)- nb can use in addition to the Valid To/From or standalone",
              errorMessage: {
                pattern:
                  "Valid Date List must begin with 'DL' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen)",
                type: "Valid Date List must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^DL[A-Z0-9_-]{1,}$",
                  target: "date-list",
                },
              ],
            },
            srv_or_loc: {
              type: "string",
              maxLength: 20,
              title: "Service Origin",
              description: "Service Origin Location",
              pattern: "^([A-Z]{3}|SL[A-Z0-9_-]{2,})?$",
              tooltip:
                "CRS Code (eg PAD), Station List (Prefix 'SL' eg SL1234) or blank",
              errorMessage: {
                pattern:
                  "Service Origin must be a CRS Code (eg PAD), Station List (Prefix 'SL' eg SL1234) or blank",
                type: "Service Origin must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^SL[A-Z0-9_-]{2,}$",
                  target: "station-list",
                },
              ],
            },
            srv_de_loc: {
              type: "string",
              maxLength: 20,
              pattern: "^([A-Z]{3}|SL[A-Z0-9_-]{2,})?$",
              title: "Service Destination",
              description: "Service Destination Location",
              tooltip:
                "CRS Code (eg PAD), Station List (Prefix 'SL' eg SL1234) or blank",
              errorMessage: {
                pattern:
                  "Service Destination must be a CRS Code (eg PAD), Station List (Prefix 'SL' eg SL1234) or blank",
                type: "Service Destination must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^SL[A-Z0-9_-]{2,}$",
                  target: "station-list",
                },
              ],
            },
            rsid_list: {
              type: "string",
              pattern:
                "^([A-Z]{2}[0-9]{6}|[A-Z]{2}[0-9]{4}XX|RL[A-Z0-9_-]{1,})?$",
              title: "RSID/List",
              description: "RSID or RSID List",
              tooltip:
                "RSID, RSID List (Prefix RL* eg RL12345) or Portion Ref (Prefix RL*, Suffix XX - eg AB1234XX)",
              errorMessage: {
                pattern:
                  "RSID/List must be an RSID, RSID List (Prefix RL* eg RL12345), Portion Train (Prefix RL*, Suffix XX - eg AB1234XX) or blank",
                type: "RSID/List must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^RL[A-Z0-9_-]{1,}$",
                  target: "rsid-list",
                },
              ],
            },
            srv_or_time_fr: {
              type: "string",
              format: "time",
              title: "Service Origin Time From",
              description: "Service Origin Time From",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            srv_or_time_to: {
              type: "string",
              format: "time",
              title: "Service Origin Time To",
              description: "Service Origin Time To",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            call_loc: {
              type: "string",
              maxLength: 20,
              pattern: "^([A-Z]{3}|SL[A-Z0-9_-]{2,})?$",
              title: "Call Point",
              description: "Call Point Location",
              tooltip:
                "CRS Code (eg PAD), Station List (Prefix 'SL' eg SL1234) or blank",
              errorMessage: {
                pattern:
                  "Call Point must be a CRS Code (eg PAD), Station List (Prefix 'SL' eg SL1234) or blank",
                type: "Call Point must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^SL[A-Z0-9_-]{2,}$",
                  target: "station-list",
                },
              ],
            },
            call_arr_time_fr: {
              type: "string",
              format: "time",
              title: "Call Arrive Time From",
              description: "Call Arrive Time From",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            call_arr_time_to: {
              type: "string",
              format: "time",
              title: "Call Arrive Time To",
              description: "Call Arrive Time To",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            call_dep_time_fr: {
              type: "string",
              format: "time",
              title: "Call Depart Time From",
              description: "Call Depart Time From",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            call_dep_time_to: {
              type: "string",
              format: "time",
              title: "Call Depart Time To",
              description: "Call Depart Time To",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            weekdays: {
              type: "integer",
              title: "Days",
              description: "Weekdays",
              tooltip:
                "Service Weekday(s) (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
              minimum: 1,
              maximum: 1234567,
              errorMessage: {
                type: "Days must be a numeric value representing the relevant Service day(s) of the week. (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
              },
              readOnly: false,
            },
            overlay: {
              type: "boolean",
              title: "Overlay",
              description: "Overlay Flag",
              tooltip:
                "Mark as Overlay which allows override of Base Service Group - eg for a Promo on specific bucket(s)",
              readOnly: false,
            },
            csi_rule_grp: {
              type: "string",
              pattern: "^CSG[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "CSI Rule Group",
              description: "CSI Rule Group",
              tooltip:
                "CSI Rule Group must begin with 'CSG' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg CSG0001)",
              errorMessage: {
                type: "CSI Rule Group must begin with 'CSG' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen) (eg CSG0001)",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^CSG[A-Z0-9_-]{1,}$",
                  target: "csi-rule-grp",
                },
              ],
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
          },
          required: [
            "csi_service_grp",
            "deleted",
            "srv_dt_fr",
            "srv_dt_to",
            "csi_rule_grp",
          ],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "date_list_schema",
        title: "Ventoux Date List",
        type: "array",
        items: {
          type: "object",
          properties: {
            date_list: {
              type: "string",
              pattern: "^DL[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "Date List",
              description: "Date List",
              tooltip: "Mandatory prefix 'DL' (eg DL123)",
              readOnly: false,
              errorMessage: {
                pattern:
                  "Date List must begin DL* (eg DL1234) with Max Length 20",
                type: "Date List must be a string",
              },
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Date List Deleted",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              title: "Route",
              description: "Route",
              tooltip:
                "Validated against Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
              readOnly: false,
            },
            date_list_txt: {
              type: "string",
              title: "Name",
              description: "Date List Name",
              tooltip: "Description",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            date_list_itm: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  date_fr: {
                    type: "string",
                    format: "date",
                    title: "Date From",
                    description: "Date From",
                    tooltip: "Individual Date or the Start of a Range of Dates",
                    readOnly: false,
                  },
                  date_to: {
                    type: "string",
                    format: "date",
                    title: "Date To",
                    description: "Date To",
                    tooltip: "Optional End of a Range of Dates",
                    readOnly: false,
                  },
                  exclude: {
                    type: "boolean",
                    title: "Exclude?",
                    description: "Exclude Dates?",
                    tooltip: "Exclude this Date/Range of Dates",
                    readOnly: false,
                  },
                },
                required: ["date_fr"],
              },
            },
          },
          required: ["date_list", "date_list_itm"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "fare_bucket_schema",
        title: "Ventoux Fare Bucket Configuration",
        type: "array",
        items: {
          type: "object",
          properties: {
            fare_bucket: {
              type: "string",
              title: "Bucket",
              description: "Bucket Code",
              tooltip: "Bucket Code, as configured in S3P",
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Deletion Flag - nb hidden in System Parameters",
            },
            ticket_type_itm: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  ticket_type: {
                    type: "string",
                    title: "Ticket Type",
                    description: "Ticket Type",
                    tooltip:
                      "The Ticket Type (aka Product Code in S3P) which should be considered when determining the lowest available fare by the optimiser",
                  },
                  ventoux_class: {
                    type: "string",
                    title: "Class",
                    description: "Ventoux Class",
                    tooltip:
                      "The Ventoux Class of the Ticket Type - eg STANDARD",
                  },
                  single_return: {
                    type: "string",
                    enum: ["S", "R"],
                    title: "Single/Return",
                    description: "Single or Return",
                    tooltip: "Is the Ticket Type a Single (S) or Return (R)?",
                  },
                  walkup_ap: {
                    type: "string",
                    enum: ["W", "A"],
                    title: "Walk Up/AP",
                    description: "Walk Up or AP",
                    tooltip:
                      "Is the Ticket Type a walk-up (W) or Advanced Purchase (A)?",
                  },
                },
              },
              required: [
                "ticket_type",
                "ventoux_class",
                "single_return",
                "walkup_ap",
              ],
            },
          },
          required: ["fare_bucket"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "fare_route_schema",
        title: "Ventoux Fare Route Configuration",
        type: "array",
        items: {
          type: "object",
          properties: {
            fare_route: {
              type: "string",
              title: "Route",
              description: "Route Code",
              tooltip:
                "Ventoux will only consider these specified route codes when determining the Lowest Available Fare data",
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Deletion Flag - nb hidden in System Parameters",
            },
            rsid_list_filter: {
              type: "string",
              pattern: "^RL[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "RSID List Filter",
              description: "RSID List Filter",
              tooltip:
                "Option to specify an RSID List to include/exclude when determing fares for this route",
            },
            rsid_list_exclude: {
              type: "boolean",
              title: "RSID List Exclude",
              description: "RSID List Exclude Flag",
              tooltip: "Exclude the specified RSID List",
            },
          },
          required: ["fare_route"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "fare_scrape_location_schema",
        title: "Ventoux Fare Scrape Locations",
        type: "array",
        items: {
          type: "object",
          properties: {
            fare_scrape_location: {
              type: "string",
              title: "Scrape Search Term",
              description: "Scrape Search Term",
              tooltip: "The location value used in the Wiremind scrape",
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Deletion Flag - nb hidden in System Parameters",
            },
            fare_scrape_location_itm: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  own_toc_crs: {
                    type: "string",
                    title: "Own TOC corresponding CRS",
                    description: "Own TOC corresponding CRS",
                    tooltip:
                      "Which corresponding CRS code should be considered for your TOC",
                  },
                },
              },
            },
          },
          required: ["fare_scrape_location", "fare_scrape_location_itm"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "general_setting_schema",
        title: "Ventoux General Settings",
        type: "array",
        items: {
          type: "object",
          properties: {
            general_setting: {
              type: "string",
              title: "Setting",
              description: "Setting",
              tooltip: "Setting Code",
              enum: [
                "PREFERRED_FORECAST",
                "UNSPECIFIC_COUNT_PCT_STANDARD",
                "UNSPECIFIC_COUNT_PCT_FIRST",
                "LEG_BLF_CHART_HIDE_BIKES",
                "CSI_PACE_AUTO_WINDOW",
                "PREFERRED_PROFILE_VIEW",
                "SCHEDULE_BUILDER_RSID_LIST",
                "SCHEDULE_BUILDER_MAX_DATE",
                "FARE_SCRAPE_HISTORY_DAYS",
                "SERV_LIST_SHOW_PORTION_TRAINS",
              ],
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Deletion Flag - nb hidden in System Parameters",
            },
            setting_value: {
              type: "string",
              title: "Setting Value",
              description: "Setting Value",
              tooltip: "Setting value for your TOC",
            },
          },
          required: ["general_setting", "setting_value"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "inventory_class_schema",
        title: "Ventoux Inventory Class Configuration",
        type: "array",
        items: {
          type: "object",
          properties: {
            inventory_class: {
              type: "string",
              title: "S3P Inventory Class",
              description: "S3P Inventory Class",
              tooltip: "The Inventory Class configured in S3P",
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Deletion Flag - nb hidden in System Parameters",
            },
            ventoux_class: {
              type: "string",
              title: "Ventoux Class",
              description: "Ventoux Class",
              tooltip:
                "The Ventoux Class (previously known as Accommodation Group) in which the S3P Inventory Class should be considered",
              $ref: "shared_schema#/definitions/ventoux_classes",
            },
          },
          required: ["inventory_class"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "journey_list_schema",
        title: "Ventoux Journey List",
        type: "array",
        items: {
          type: "object",
          properties: {
            journey_list: {
              type: "string",
              pattern: "^JL[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "Journey List",
              description: "Journey List",
              tooltip: "Mandatory prefix 'JL' (eg JL1234)",
              errorMessage: {
                pattern: "Journey List must begin JL* (eg JL1234)",
                type: "Journey List must be a string",
              },
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              title: "Route",
              description: "Route",
              tooltip:
                "Validated against Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
              readOnly: false,
            },
            journey_list_txt: {
              type: "string",
              title: "Name",
              description: "Journey List Name",
              tooltip: "Description",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            journey_list_itm: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  orig: {
                    type: "string",
                    pattern: "^([A-Z]{3}|SL[A-Z0-9_-]{2,})?$",
                    maxLength: 20,
                    title: "Origin",
                    description: "Origin",
                    tooltip:
                      "CRS Code (eg PAD), Station List (eg SL1234) or blank",
                    errorMessage: {
                      pattern:
                        "Service Origin must be a CRS Code (eg PAD), Station List (Prefix SL* eg SL1234) or blank",
                      type: "Service Origin must be a string",
                    },
                    readOnly: false,
                    popup: [
                      {
                        criteria: "^SL[A-Z0-9_-]{2,}$",
                        target: "station-list",
                      },
                    ],
                  },
                  dest: {
                    type: "string",
                    pattern: "^([A-Z]{3}|SL[A-Z0-9_-]{2,})?$",
                    maxLength: 20,
                    title: "Destination",
                    description: "Destination",
                    tooltip:
                      "CRS Code (eg PAD), Station List (eg SL1234) or blank",
                    errorMessage: {
                      pattern:
                        "Service Destination must be a CRS Code (eg PAD), Station List (Prefix SL* eg SL1234) or blank",
                      type: "Service Destination must be a string",
                    },
                    readOnly: false,
                    popup: [
                      {
                        criteria: "^SL[A-Z0-9_-]{2,}$",
                        target: "station-list",
                      },
                    ],
                  },
                  sort: {
                    type: "integer",
                    title: "Sequence",
                    minimum: 1,
                    description: "Sequence",
                    tooltip:
                      "Number to indicate the order that the JL Items are considered when used in Fare related Action Rules",
                    uniqueItems: true,
                    readOnly: false,
                  },
                },
                anyOf: [
                  {
                    required: ["orig"],
                  },
                  {
                    required: ["dest"],
                  },
                ],
              },
            },
          },
          required: ["journey_list", "journey_list_itm"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "opt_cutoff_schema",
        title: "Ventoux Optimiser Parameter Cutoff",
        type: "array",
        items: {
          type: "object",
          properties: {
            cutoff_timestamp: {
              type: "string",
              format: "date-time",
            },
            deleted: {
              type: "boolean",
            },
          },
          required: ["cutoff_timestamp"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "profile_lean_schema",
        title: "Ventoux Lean Profile",
        type: "array",
        items: {
          type: "object",
          properties: {
            profile: {
              type: "integer",
              title: "Profile",
              description: "Profile Code",
              minimum: 1,
              maximum: 999999,
              tooltip: "Numeric code that uniquely identifies the profile",
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              title: "Route",
              description: "Route",
              tooltip:
                "A custom grouping to indicate the Route. Limited to Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
              readOnly: false,
            },
            profile_txt: {
              type: "string",
              title: "Name",
              description: "Profile Name",
              tooltip:
                "Description - typically describes the business purpose of the profile",
              readOnly: false,
            },
            ventoux_class: {
              type: "string",
              title: "Class",
              description: "Ventoux Class",
              $ref: "shared_schema#/definitions/ventoux_classes",
              tooltip: "Class as defined in Ventoux - eg STANDARD",
              readOnly: false,
            },
            prof_type: {
              type: "string",
              title: "Profile Type",
              description: "Profile Type",
              $ref: "shared_schema#/definitions/prof_types",
              tooltip:
                "A custom grouping to indicate the type of Profile. Limited to Profile Types specified by each TOC",
              readOnly: false,
            },
            strategy: {
              type: "string",
              title: "Strategy",
              description: "Profile Strategy",
              $ref: "shared_schema#/definitions/strategies",
              tooltip:
                "A custom grouping eg 'HIGH'. Limited to Strategy values specified by each TOC",
              readOnly: false,
            },
            bundle: {
              type: "string",
              title: "Bundle",
              description: "Profile Bundle",
              $ref: "shared_schema#/definitions/bundles",
              tooltip:
                "A custom grouping eg 'PEAK'. Limited to Ventoux Bundle values specified by each TOC",
              readOnly: false,
            },
            start_dtd: {
              type: "integer",
              title: "Start DTD",
              description: "Start DTD",
              tooltip:
                "DTD Start Boundary - Limit applies to DTDs less than and including this DTD",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            lean_profile_itm: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  end_dtd: {
                    type: "integer",
                    title: "End DTD",
                    description: "End DTD",
                    minimum: 0,
                    maximum: 999,
                    tooltip:
                      "DTD End Boundary - Limits apply until and including this DTD",
                    readOnly: false,
                  },
                  bucket: {
                    type: "string",
                    title: "Bucket",
                    description: "Bucket",
                    tooltip: "S3P Bucket Code",
                    readOnly: false,
                  },
                  booking_limit: {
                    type: "string",
                    pattern:
                      "^(?:|[0-9]{1,3}|[0-9]{1,3}RA_LOG|[0-9]{1,3}\\%|[0-9]{1,3}\\%RA_MIN|[0-9]{1,3}\\%RA_MAX|[0-9]{1,3}\\%RA_LOG|[0-9]{1,3}\\%CLF|[0-9]{1,3}\\%RA_MIN)$",
                    title: "Booking Limit",
                    description: "Booking Limit",
                    tooltip:
                      "eg set the limit as a % of Reservable Capacity - see Documentation for options",
                    errorMessage: {
                      pattern:
                        "Booking Limit must be a valid value - see Documentation for allowed values",
                      type: "Booking Limit must be a string",
                    },
                    readOnly: false,
                  },
                },
                required: ["end_dtd", "bucket", "booking_limit"],
              },
            },
          },
          required: [
            "profile",
            "deleted",
            "ventoux_class",
            "start_dtd",
            "lean_profile_itm",
          ],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "profile_schema",
        title: "Ventoux Profile",
        type: "array",
        items: {
          type: "object",
          properties: {
            profile: {
              type: "integer",
              title: "Profile",
              description: "Profile Code",
              minimum: 1,
              maximum: 999999,
              tooltip: "Numeric code that uniquely identifies the profile",
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              title: "Route",
              description: "Route",
              tooltip:
                "A custom grouping to indicate the Route. Limited to Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
              readOnly: false,
            },
            profile_txt: {
              type: "string",
              title: "Name",
              description: "Profile Name",
              tooltip:
                "Description - typically describes the business purpose of the profile",
              readOnly: false,
            },
            ventoux_class: {
              type: ["string"],
              title: "Class",
              description: "Ventoux Class",
              tooltip: "Class as defined in Ventoux - eg STANDARD",
              $ref: "shared_schema#/definitions/ventoux_classes",
              readOnly: false,
            },
            prof_type: {
              type: ["string"],
              title: "Profile Type",
              description: "Profile Type",
              tooltip:
                "A custom grouping to indicate the type of Profile. Limited to Profile Types specified by each TOC",
              $ref: "shared_schema#/definitions/prof_types",
              readOnly: false,
            },
            strategy: {
              type: ["string"],
              title: "Strategy",
              description: "Profile Strategy",
              tooltip:
                "A custom grouping eg 'HIGH'. Limited to Strategy values specified by each TOC",
              $ref: "shared_schema#/definitions/strategies",
              readOnly: false,
            },
            bundle: {
              type: ["string"],
              title: "Bundle",
              description: "Profile Bundle",
              tooltip:
                "A custom grouping eg 'PEAK'. Limited to Ventoux Bundle values specified by each TOC",
              $ref: "shared_schema#/definitions/bundles",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            profile_itm: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  dtd_fr: {
                    type: "integer",
                    title: "DTD From",
                    description: "DTD From",
                    minimum: 0,
                    maximum: 999,
                    tooltip:
                      "DTD Boundary - Limit applies to DTDs less than and including this DTD until the next applicable DTD boundary is hit",
                    readOnly: false,
                  },
                  limits: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        bucket: {
                          type: "string",
                          title: "Bucket",
                          description: "Bucket",
                          tooltip: "S3P Bucket Code",
                          readOnly: false,
                        },
                        display_seq: {
                          type: "integer",
                          title: "Sequence",
                          description: "Display Sequence",
                          readOnly: true,
                        },
                        booking_limit: {
                          type: "string",
                          pattern:
                            "^(?:|[0-9]{1,3}|[0-9]{1,3}RA_LOG|[0-9]{1,3}\\%|[0-9]{1,3}\\%RA_MIN|[0-9]{1,3}\\%RA_MAX|[0-9]{1,3}\\%RA_LOG|[0-9]{1,3}\\%CLF|[0-9]{1,3}\\%RA_MIN)$",
                          title: "Booking Limit",
                          description: "Booking Limit",
                          tooltip:
                            "eg set the limit as a % of Reservable Capacity - see Documentation for options",
                          errorMessage: {
                            pattern:
                              "Booking Limit must be a valid value - see Documentation for allowed values",
                            type: "Booking Limit must be a string",
                          },
                          readOnly: false,
                        },
                      },
                      required: ["bucket", "booking_limit"],
                    },
                  },
                },
                required: ["dtd_fr", "limits"],
              },
            },
          },
          required: ["profile", "deleted", "ventoux_class", "profile_itm"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "rsid_list_schema",
        title: "Ventoux RSID List",
        type: "array",
        items: {
          type: "object",
          properties: {
            rsid_list: {
              type: "string",
              pattern: "^RL[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "RSID List",
              description: "RSID List",
              readOnly: false,
              tooltip: "RSID List (Prefix RL* eg RL1234)",
              errorMessage: {
                pattern:
                  "RSID List must begin RL* (eg RL1234) with Max Length 20",
                type: "RSID List must be a string",
              },
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              readOnly: false,
              title: "Route",
              description: "Route",
              tooltip:
                "Validated against Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
            },
            rsid_list_txt: {
              type: "string",
              title: "Name",
              tooltip: "Description",
              description: "RSID List Name",
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              tooltip: "Who created or last changed",
              description: "Changed by",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            rsid_list_itm: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  rsid_fr: {
                    type: "string",
                    title: "RSID From",
                    description: "RSID From",
                    pattern: "^([A-Z]{2}[0-9]{6}|[A-Z]{2}[0-9]{4}XX)$",
                    readOnly: false,
                    tooltip: "Full RSID (eg AB123456)",
                    errorMessage: {
                      pattern:
                        "RSID From must be a full RSID code (eg AB123456) or Portion Train References (eg AB1234XX)",
                      type: "RSID must be a string",
                    },
                  },
                  rsid_to: {
                    type: "string",
                    title: "RSID To",
                    description: "RSID To",
                    pattern: "^[A-Z]{2}[0-9]{6}$",
                    readOnly: false,
                    tooltip:
                      "Full RSID (eg AB123456) - nb Portion Train References (eg AB1234XX) cannot be used in ranges",
                    errorMessage: {
                      pattern:
                        "RSID To must be a full RSID code (eg XX123456) or blank",
                      type: "RSID must be a string",
                    },
                  },
                },
                required: ["rsid_fr"],
              },
            },
          },
          required: ["rsid_list", "rsid_list_itm"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "service_grp_schema",
        title: "Ventoux Service Group",
        type: "array",
        items: {
          type: "object",
          properties: {
            service_grp: {
              type: "integer",
              minimum: 1,
              title: "Service Group",
              description: "Service Group",
              tooltip:
                "Lower number = higher priority (ie 1 is the highest priority)",
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            route: {
              type: ["string", "null"],
              title: "Route",
              description: "Route",
              tooltip:
                "Validated against Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
              readOnly: false,
            },
            sgrptxt: {
              type: "string",
              title: "Name",
              description: "Service Group Name",
              tooltip: "Description",
              readOnly: false,
            },
            active: {
              type: "boolean",
              title: "Active",
              description: "Active Flag",
              tooltip:
                "Mark as active (ie considered in the Optimiser) or inactive. (nb inactive Service Groups will NOT be removed)",
              readOnly: false,
            },
            srvdtfr: {
              type: "string",
              format: "date",
              title: "Service Date From",
              description: "Service Date From",
              tooltip: "Mandatory Service Date range",
              readOnly: false,
            },
            srvdtto: {
              type: "string",
              format: "date",
              title: "Service Date To",
              description: "Service Date To",
              tooltip: "Mandatory Service Date range",
              readOnly: false,
            },
            srvdl: {
              type: "string",
              pattern: "^DL[A-Z0-9_-]{1,}$",
              title: "Service Date List",
              description: "Service Date List",
              tooltip:
                "Date List restriction for Service Date (Prefix DL* eg DL12345)- nb works in addition to the mandatory Service Date Range",
              errorMessage: {
                pattern:
                  "Service Date List must begin with 'DL' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen)",
                type: "Service Date List must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^DL[A-Z0-9_-]{1,}$",
                  target: "date-list",
                },
              ],
            },
            dtdfr: {
              oneOf: [
                {
                  type: "integer",
                  minimum: 0,
                  maximum: 999,
                },
                {
                  type: "null",
                },
              ],
              title: "DTD From",
              description: "DTD From",
              tooltip:
                "Days To Departure range 'From' (eg 0 for services departing today)",
              readOnly: false,
            },
            dtdto: {
              oneOf: [
                {
                  type: "integer",
                  minimum: 0,
                  maximum: 999,
                },
                {
                  type: "null",
                },
              ],
              title: "DTD To",
              description: "DTD To",
              tooltip:
                "Days To Departure range 'To' (eg 1 for services departing tomorrow)",
              readOnly: false,
            },
            valfr: {
              type: "string",
              format: "date",
              title: "Valid From Date",
              description: "Valid From Date",
              tooltip: "Date range for execution date of the Optimiser 'From'",
              readOnly: false,
            },
            valto: {
              type: "string",
              format: "date",
              title: "Valid To Date",
              description: "Valid To Date",
              tooltip: "Date range for execution date of the Optimiser 'To'",
              readOnly: false,
            },
            valdl: {
              type: "string",
              pattern: "^DL[A-Z0-9_-]{1,}$",
              title: "Valid Date List",
              description: "Valid Date List",
              tooltip:
                "Date List restriction for optimiser execution date (Prefix DL* eg DL12345)- nb can use in addition to the Valid To/From or standalone",
              errorMessage: {
                pattern:
                  "Valid Date List must begin with 'DL' and can contain only A-Z (upper case), 0-9, '_' (underscore) or '-' (hyphen)",
                type: "Valid Date List must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^DL[A-Z0-9_-]{1,}$",
                  target: "date-list",
                },
              ],
            },
            srvorloc: {
              type: "string",
              maxLength: 20,
              pattern: "^([A-Z]{3}|SL[A-Z0-9_-]{2,})?$",
              title: "Service Origin",
              description: "Service Origin Location",
              tooltip:
                "CRS Code (eg PAD), Station List (Prefix SL* eg SL1234) or blank",
              errorMessage: {
                pattern:
                  "Service Origin must be a CRS Code (eg PAD), Station List (Prefix SL* eg SL1234) or blank",
                type: "Service Origin must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^SL[A-Z0-9_-]{2,}$",
                  target: "station-list",
                },
              ],
            },
            srvdeloc: {
              type: "string",
              maxLength: 20,
              pattern: "^([A-Z]{3}|SL[A-Z0-9_-]{2,})?$",
              title: "Service Destination",
              description: "Service Destination Location",
              tooltip:
                "CRS Code (eg PAD), Station List (Prefix SL* eg SL1234) or blank",
              errorMessage: {
                pattern:
                  "Service Destination must be a CRS Code (eg PAD), Station List (Prefix SL* eg SL1234) or blank",
                type: "Service Destination must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^SL[A-Z0-9_-]{2,}$",
                  target: "station-list",
                },
              ],
            },
            rsidlist: {
              type: "string",
              pattern:
                "^([A-Z]{2}[0-9]{6}|[A-Z]{2}[0-9]{4}XX|RL[A-Z0-9_-]{1,})?$",
              title: "RSID/List",
              description: "RSID or RSID List",
              tooltip:
                "RSID, RSID List (Prefix RL* eg RL12345) or Portion Ref (Prefix RL*, Suffix XX - eg AB1234XX)",
              errorMessage: {
                pattern:
                  "RSID/List must be an RSID, RSID List (Prefix RL* eg RL12345), Portion Train (Prefix RL*, Suffix XX - eg AB1234XX) or blank",
                type: "RSID/List must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^RL[A-Z0-9_-]{1,}$",
                  target: "rsid-list",
                },
              ],
            },
            srvorfr: {
              type: "string",
              format: "time",
              title: "Service Origin Time From",
              description: "Service Origin Time From",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            srvorto: {
              type: "string",
              format: "time",
              title: "Service Origin Time To",
              description: "Service Origin Time To",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            srvdefr: {
              type: "string",
              format: "time",
              title: "Service Dest Time From",
              description: "Service Destination Time From",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            srvdeto: {
              type: "string",
              format: "time",
              title: "Service Dest Time To",
              description: "Service Destination Time To",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            callloc: {
              type: "string",
              maxLength: 20,
              title: "Call Point",
              pattern: "^([A-Z]{3}|SL[A-Z0-9_-]{2,})?$",
              description: "Call Point Location",
              tooltip:
                "CRS Code (eg PAD), Station List (Prefix SL* eg SL1234) or blank",
              errorMessage: {
                pattern:
                  "Call Point must be a CRS Code (eg PAD), Station List (Prefix SL* eg SL1234) or blank",
                type: "Call Point must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^SL[A-Z0-9_-]{2,}$",
                  target: "station-list",
                },
              ],
            },
            callafr: {
              type: "string",
              format: "time",
              title: "Call Arrive Time From",
              description: "Call Arrive Time From",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            callato: {
              type: "string",
              format: "time",
              title: "Call Arrive Time To",
              description: "Call Arrive Time To",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            calldfr: {
              type: "string",
              format: "time",
              title: "Call Depart Time From",
              description: "Call Depart Time From",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            calldto: {
              type: "string",
              format: "time",
              title: "Call Depart Time To",
              description: "Call Depart Time To",
              tooltip: "HH:MM:SS (eg 13:00:00)",
              readOnly: false,
            },
            days: {
              type: "integer",
              title: "Days",
              description: "Weekdays",
              tooltip:
                "Service Weekday(s) (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
              minimum: 1,
              maximum: 1234567,
              errorMessage: {
                type: "Days must be a numeric value representing the relevant Service day(s) of the week. (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
              },
              readOnly: false,
            },
            overlay: {
              type: "boolean",
              title: "Overlay",
              description: "Overlay Flag",
              tooltip:
                "Mark as Overlay which allows override of Base Service Group - eg for a Promo on specific bucket(s)",
              readOnly: false,
            },
            allowsplit: {
              type: "boolean",
              title: "Allow ODG Split",
              description: "Allow OD Group Split Flag",
              tooltip:
                "Allow an OD Group split - if not marked, an Overlay Service Group will be rejected if the ODs do not align with the ODs in the base OD groups",
              readOnly: false,
            },
            specod: {
              type: "string",
              pattern:
                "^(([A-Z]{3}|[\\d*]|SL[A-Z0-9_-]{2,}):([A-Z]{3}|[\\d*]|SL[A-Z0-9_-]{2,})|JL[A-Z0-9_-]{1,})?$",
              title: "Specific OD Rule",
              description: "Specific OD Rule",
              tooltip:
                "Specific ODs - Format <loc>:<loc> for any combination of CRS code, * (meaning ANY)or Station List (eg PAD:SWI, PAD:*, *:SWI, SL1234:*, SL1234:SL4567). Or a Journey List (Prefix JL* eg JL0001)",
              errorMessage: {
                pattern:
                  "Specific OD Rule must be in the format <loc>:<loc> for any combination of CRS code, * (meaning ANY)or Station List (eg PAD:SWI, PAD:*, *:SWI, SL1234:*, SL1234:SL4567). Or a Journey List (Prefix JL* eg JL0001)",
                type: "Specific OD Rule must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^SL[A-Z0-9_-]{2,}$",
                  target: "station-list",
                },
                {
                  criteria: "^JL[A-Z0-9_-]{1,}$",
                  target: "journey-list",
                },
              ],
            },
            relod: {
              type: "string",
              pattern:
                "^(([A-Z]{3}|[\\d*]|SL[A-Z0-9_-]{2,}):([A-Z]{3}|[\\d*]|SL[A-Z0-9_-]{2,})|JL[A-Z0-9_-]{1,})?$",
              title: "Related OD Rule",
              tooltip:
                "Related ODs (between/within/overlapping) - Format <loc>:<loc> for any combination of CRS code, * (meaning ANY) or Station List (eg PAD:SWI, PAD:*, *:SWI, SL1234:*, SL1234:SL4567). Or a Journey List (Prefix JL* eg JL0001)",
              errorMessage: {
                pattern:
                  "Related OD Rule must be in the format <loc>:<loc> for any combination of CRS code, * (meaning ANY)or Station List (eg PAD:SWI, PAD:*, *:SWI, SL1234:*, SL1234:SL4567). Or a Journey List (Prefix JL* eg JL0001)",
                type: "Related OD Rule must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^SL[A-Z0-9_-]{2,}$",
                  target: "station-list",
                },
                {
                  criteria: "^JL[A-Z0-9_-]{1,}$",
                  target: "journey-list",
                },
              ],
            },
            withinod: {
              type: "string",
              pattern:
                "^(([A-Z]{3}|[\\d*]|SL[A-Z0-9_-]{2,}):([A-Z]{3}|[\\d*]|SL[A-Z0-9_-]{2,})|JL[A-Z0-9_-]{1,})?$",
              title: "Within OD Rule",
              description: "Within OD Rule",
              tooltip:
                "Within ODs (between/within) - Format <loc>:<loc> for any combination of CRS code, * (meaning ANY) or Station List (eg PAD:SWI, PAD:*, *:SWI, SL1234:*, SL1234:SL4567). Or a Journey List (Prefix JL* eg JL0001)",
              errorMessage: {
                pattern:
                  "Within OD Rule must be in the format <loc>:<loc> for any combination of CRS code, * (meaning ANY)or Station List (eg PAD:SWI, PAD:*, *:SWI, SL1234:*, SL1234:SL4567). Or a Journey List (Prefix JL* eg JL0001)",
                type: "Within OD Rule must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^SL[A-Z0-9_-]{2,}$",
                  target: "station-list",
                },
                {
                  criteria: "^JL[A-Z0-9_-]{1,}$",
                  target: "journey-list",
                },
              ],
            },
            odg: {
              type: "string",
              title: "OD Group",
              description: "OD Group",
              tooltip:
                "A description for internal Ventoux reference & reporting only",
              readOnly: false,
            },
            mnmxcap: {
              type: ["string", "null"],
              enum: ["MIN", "MAX", null],
              title: "Min/Max Capacity",
              description: "Min/Max Capacity",
              tooltip:
                "Use the Min or Max capacity if the specified ODs do not have consistent physical capacities (this is important, since most Profiles specify limits in terms of % of reservable capacity)",
              readOnly: false,
            },
            p1: {
              type: "integer",
              maxLength: 10,
              title: "Profile 1",
              description: "Profile 1",
              tooltip:
                "Profile 1 of up to 4 Profiles (eg 10001 for First Class)",
              readOnly: false,
              popup: [
                {
                  criteria: "^[0-9]{1,10}$",
                  target: "dictionary",
                },
              ],
              special_formatting: "profile_hover",
            },
            p2: {
              type: "integer",
              maxLength: 10,
              title: "Profile 2",
              description: "Profile 2",
              tooltip:
                "Profile 2 of up to 4 Profiles (eg 20001 for Standard Class)",
              readOnly: false,
              popup: [
                {
                  criteria: "^[0-9]{1,10}$",
                  target: "dictionary",
                },
              ],
              special_formatting: "profile_hover",
            },
            p3: {
              type: "integer",
              maxLength: 10,
              title: "Profile 3",
              description: "Profile 3",
              tooltip: "Profile 3 of up to 4 Profiles (eg 30001 for Bikes)",
              readOnly: false,
              popup: [
                {
                  criteria: "^[0-9]{1,10}$",
                  target: "dictionary",
                },
              ],
              special_formatting: "profile_hover",
            },
            p4: {
              type: "integer",
              maxLength: 10,
              title: "Profile 4",
              description: "Profile 4",
              tooltip:
                "Profile 4 of up to 4 Profiles (eg 40001 for Std Premium)",
              readOnly: false,
              popup: [
                {
                  criteria: "^[0-9]{1,10}$",
                  target: "dictionary",
                },
              ],
              special_formatting: "profile_hover",
            },
            a1: {
              type: "string",
              title: "ARG 1",
              pattern: "^ARG[A-Z0-9_-]{1,}$",
              description: "ARG 1",
              tooltip: "Action Rule Group 1 of up to 3 (Prefix ARG* eg ARG001)",
              errorMessage: {
                pattern:
                  "Action Rule Group 1 must be a valid Action Rule Group (Prefix ARG* eg ARG001)",
                type: "Action Rule Group 1 must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^ARG[A-Z0-9_-]{1,20}$",
                  target: "action-rule-group",
                },
              ],
              special_formatting: "arg_hover",
            },
            a2: {
              type: "string",
              title: "ARG 2",
              pattern: "^ARG[A-Z0-9_-]{1,}$",
              description: "ARG 2",
              tooltip: "Action Rule Group 2 of up to 3 (Prefix ARG* eg ARG002)",
              errorMessage: {
                pattern:
                  "Action Rule Group 2 must be a valid Action Rule Group (Prefix ARG* eg ARG002)",
                type: "Action Rule Group 2 must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^ARG[A-Z0-9_-]{1,20}$",
                  target: "action-rule-group",
                },
              ],
              special_formatting: "arg_hover",
            },
            a3: {
              type: "string",
              title: "ARG 3",
              pattern: "^ARG[A-Z0-9_-]{1,}$",
              description: "ARG 3",
              tooltip: "Action Rule Group 3 of up to 3 (Prefix ARG* eg ARG003)",
              errorMessage: {
                pattern:
                  "Action Rule Group 3 must be a valid Action Rule Group (Prefix ARG* eg ARG003)",
                type: "Action Rule Group 3 must be a string",
              },
              readOnly: false,
              popup: [
                {
                  criteria: "^ARG[A-Z0-9_-]{1,20}$",
                  target: "action-rule-group",
                },
              ],
              special_formatting: "arg_hover",
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
          },
          required: ["service_grp", "deleted", "srvdtfr", "srvdtto", "odg"],
        },
      },
      {
        $id: "shared_schema",
        title: "Ventoux Shared Allowed Values",
        definitions: {
          routes: {
            enum: [
              "AV",
              "ENG",
              "HQ",
              "N/A",
              "NC",
              "ND",
              "NQY",
              "SC",
              "SL",
              "SN",
              "SW",
              "SWSC",
              "WE",
              "WESW",
              "WEY",
            ],
            errorMessage: "Route must be a TOC-specified allowed value",
          },
          strategies: {
            enum: [
              "1",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "2",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "3",
              "30",
              "31",
              "32",
              "33",
              "34",
              "35",
              "36",
              "37",
              "38",
              "39",
              "4",
              "40",
              "41",
              "42",
              "43",
              "44",
              "45",
              "46",
              "47",
              "48",
              "49",
              "5",
              "50",
              "51",
              "52",
              "53",
              "54",
              "55",
              "56",
              "57",
              "58",
              "59",
              "6",
              "60",
              "61",
              "62",
              "63",
              "64",
              "65",
              "66",
              "67",
              "68",
              "69",
              "7",
              "8",
              "9",
              "HIGH",
              "LOW",
              "MED",
              "STAR",
              "SUPERLOW",
              "SUPERSTAR",
            ],
            errorMessage: "Strategy must be a TOC-specified allowed value",
          },
          bundles: {
            enum: [
              "DEFAULT",
              "GROUP",
              "OFFPEAK",
              "PEAK",
              "PROMO",
              "SUPEROFFPK",
            ],
            errorMessage: "Bundle must be a TOC-specified allowed value",
          },
          ventoux_classes: {
            enum: ["1FIRST", "2STANDARD", "3BIKES", "TWIN"],
            errorMessage: "Class must be a TOC-specified allowed value",
          },
          prof_types: {
            enum: ["ONLYZEROBL", "PROTECTED", "PROT_FIRST", null],
            errorMessage: "Profile Type must be a TOC-specified allowed value",
          },
          calendar_categories: {
            enum: [
              "Normal Business",
              "Pre Christmas 2",
              "Pre Christmas 1",
              "Christmas to NY",
              "New Year 1",
              "New Year 2",
              "Feb Half Term",
              "Easter Bank Holiday",
              "Easter Holidays",
              "Other Bank Holiday",
              "May Half Term",
              "Summer Holidays",
              "Aug Bank Holiday",
              "Oct Half Term Hol",
              "Exclude from Forecast",
              "Not Assigned",
            ],
            errorMessage:
              "Calendar category must be a TOC-specified allowed value",
          },
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "station_list_schema",
        title: "Ventoux Station List Rule",
        type: "array",
        items: {
          type: "object",
          properties: {
            station_list: {
              type: "string",
              pattern: "^SL[A-Z0-9_-]{2,}$",
              minLength: 4,
              maxLength: 20,
              title: "Station List",
              description: "Station List",
              tooltip: "Station List (Prefix SL* eg SL1234)",
              errorMessage: {
                pattern:
                  "Station List must begin SL* (eg SL1234) - Min Length 4, Max Length 20",
                type: "Station List must be a string",
              },
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Deleted Flag",
              tooltip: "Mark for deletion - nb deleted after 7 days",
            },
            route: {
              type: ["string", "null"],
              title: "Route",
              description: "Route",
              tooltip:
                "Validated against Ventoux Route codes specified by each TOC",
              $ref: "shared_schema#/definitions/routes",
            },
            station_list_txt: {
              type: "string",
              title: "Name",
              tooltip: "Description",
              description: "Station List Name",
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            station_list_itm: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  station: {
                    type: "string",
                    pattern: "^[A-Z]{3}$",
                    minLength: 3,
                    maxLength: 3,
                    title: "Station Code (CRS)",
                    description: "Station Code (CRS)",
                    tooltip: "CRS Code (eg PAD)",
                    errorMessage: {
                      pattern: "Station Code must be a CRS Code (eg PAD)",
                      type: "Station Code must be a string",
                    },
                  },
                },
                required: ["station"],
              },
            },
          },
          required: ["station_list", "station_list_itm"],
        },
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "stock_equipment_rule_schema",
        title: "Ventoux Stock Equipment Rule",
        type: "array",
        items: {
          type: "object",
          properties: {
            stock_equipment_rule: {
              type: "string",
              pattern: "^SER[A-Z0-9_-]{1,}$",
              maxLength: 20,
              title: "Stock Equipment Rule",
              description: "Stock Equipment Rule",
              tooltip: "Stock Equipment Rule (Prefix SER* eg SER001)",
              errorMessage: {
                pattern:
                  "Stock Equipment Rule must begin 'SER' with only upper case characters, underscores, hypens and/or numbers (eg SER_REF-001)",
                type: "Stock Equipment Rule must be a string",
              },
              readOnly: false,
            },
            deleted: {
              type: "boolean",
              title: "Deleted",
              description: "Stock Equipment Rule is Deleted",
              tooltip: "Mark for deletion - nb deleted after 7 days",
              readOnly: false,
            },
            original_resource_type: {
              type: "string",
              title: "Original Resource Type",
              description: "Stock Equipment Rule Resource Type",
              tooltip: "Description of Stock Rule Equipment Resource Type",
              readOnly: false,
            },
            equipment_template: {
              type: "string",
              title: "S3P Equipment Template",
              description: "S3P Equipment Template",
              tooltip: "S3P Equipment Template",
              readOnly: false,
            },
            for_service_date_from: {
              type: "string",
              format: "date",
              title: "For Service Date From",
              description: "For Service Date From",
              tooltip: "Stock Equipment Rule For Service Date From",
              readOnly: false,
            },
            for_service_date_to: {
              type: "string",
              format: "date",
              title: "For Service Date To",
              description: "Date To",
              tooltip: "Stock Equipment Rule For Service Date To",
              readOnly: false,
            },
            direction: {
              type: ["string", "null"],
              title: "Direction",
              description: "Direction",
              enum: ["East", "West", null],
              tooltip: "Ventoux Rolling Stock Direction ",
              readOnly: false,
            },
            weekdays: {
              type: "integer",
              title: "Days",
              description: "Weekdays",
              tooltip:
                "Service Weekday(s) (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
              minimum: 1,
              maximum: 1234567,
              errorMessage: {
                type: "Days must be a numeric value representing the relevant Service day(s) of the week. (nb 1=Monday, 7=Sunday) (eg 12345 = Mon-Fri)",
              },
              readOnly: false,
            },
            user_changed: {
              type: "string",
              title: "Changed by",
              description: "Changed by",
              tooltip: "Who created or last changed",
              readOnly: true,
            },
            put_timestamp: {
              type: "string",
              title: "Changed at",
              description: "Changed at",
              tooltip: "When created or last changed",
              readOnly: true,
            },
            resource_type_changes: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  sequence: {
                    type: "integer",
                    title: "Sequence",
                    description: "Sequence of the resource type",
                    tooltip: "Sequence of the resource type",
                    minimum: 1,
                    maximum: 1234567,
                    readOnly: false,
                  },
                  activity: {
                    type: ["string"],
                    enum: ["Attach", "Detach"],
                    title: "Activity",
                    description: "activity",
                    tooltip: "Activity of the resource type changes",
                    readOnly: false,
                  },
                  location: {
                    type: "string",
                    title: "Location",
                    description: "location",
                    maxLength: 3,
                    minLength: 3,
                    tooltip: "The location of the resource type changes",
                    readOnly: false,
                  },
                  resource: {
                    type: "string",
                    title: "Resource",
                    description: "resource",
                    tooltip: "The resource for change",
                    readOnly: false,
                  },
                },
                required: ["sequence", "activity", "location", "resource"],
              },
            },
          },
          required: [
            "stock_equipment_rule",
            "original_resource_type",
            "for_service_date_from",
            "for_service_date_to",
            "equipment_template",
            "weekdays",
          ],
        },
      },
    ],
    search: [
      "action_rule_grp_schema",
      "action_rule_schema",
      "auto_opt_schema",
      "bucket_schema",
      "calendar_schema",
      "competitor_rule_schema",
      "csi_rule_grp_schema",
      "csi_rule_schema",
      "csi_service_grp_schema",
      "date_list_schema",
      "fare_bucket_schema",
      "fare_route_schema",
      "fare_scrape_location_schema",
      "general_setting_schema",
      "inventory_class_schema",
      "journey_list_schema",
      "opt_cutoff_schema",
      "profile_lean_schema",
      "profile_schema",
      "rsid_list_schema",
      "service_grp_schema",
      "shared_schema",
      "station_list_schema",
      "stock_equipment_rule_schema",
    ],
  };

  const ajv = new Ajv2020({
    schemas: [
      ...S_SUCCESS.payload.filter(
        (schema) => schema.$id === "action_rule_schema"
      ),
      ...S_SUCCESS.payload.filter((schema) => schema.$id === "shared_schema"),
    ],
  });

  const validate = ajv.getSchema("action_rule_schema");
  if (validate) {
    console.log("Compiled validator function:");
    console.dir(validate, { depth: null }); // Shows the compiled function details
  }
  return <h1>Vite App</h1>;
}

export default App;
