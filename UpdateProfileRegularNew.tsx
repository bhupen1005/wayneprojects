import { Box, Dialog, DialogTitle, IconButton } from "@material-ui/core";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DynamicForm from "../DynamicForm/DynamicForm";
import DynamicFormReg from "../DynamicForm/DynamicFormRegular";
import { useSelector } from "react-redux";
import { State } from "../../state";
import useSchema from "../../hooks/useSchema";
import { useProfileRegular } from "../../contexts/ProfilesRegularContext";
import { useToastContext } from "../ReUsableComponent/Toast/ToastContext";
import BootstrapTable from "react-bootstrap-table-next";
import columnCreator from "../../helpers/columnCreatorSchema";
import {
    makeProfileRegularItemSchema,
    makeUpdateProfileRegularSchema,
} from "../../helpers/schemas";
import cellEditFactory from "react-bootstrap-table2-editor";
import _ from "lodash";
import { MdCopyAll, MdDelete } from "react-icons/md";
import {
    addPrimaryKeyColumn,
    deleteKeys,
    removeKey,
    isNumeric,
    removeKeysWithValue,
} from "../../helpers/helpers";
import { ValidationError } from "../../errors/Errors";
import CustomModal from "../ReUsableComponent/Modal/CustomModal";
import { FormatCell } from "../Profiles/formatter";
import { TagsInput } from "react-tag-input-component";
import { NoData } from "../DataIndication/DataIndication";
import ParameterTanstackTable from "../TanstackTable/ParameterTanstackTable";
import EditableCell from "../../helpers/TanstackTable/EditableCell";
import { Button } from "../ReUsableComponent/Button/Button";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && <Box padding={2}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        "aria-controls": `profile-tabpanel-${index}`,
    };
}

const DEFAULT_PROFILE = { deleted: false };

const EditableCellComp = (
    cell,
    isEditable,
    handleItemTableChange,
    primaryKey,
    currentTab = null
) => {
    const { value = cell?.getValue(), row, column, table } = cell; // Destructure the cell object
    if (isEditable) {
        return (
            <>
                <EditableCell
                    value={value}
                    row={row}
                    column={column}
                    updateData={handleItemTableChange}
                    table={table}
                    primaryKey={primaryKey}
                />
                {currentTab === 3 && (
                    <IconButton
                        aria-label="delete"
                        title="Copy Down"
                        className="copy-down-btn"
                        onClick={() => {
                            handleItemTableChange(row, column, value, table.options.data);
                        }}
                    >
                        <MdCopyAll />
                    </IconButton>
                )}
            </>
        );
    } else return cell.getValue() ?? null;
};

export default function UpdateProfileRegularNew({ onClose, profileColumnDef }) {
    const { sendToast } = useToastContext();
    const isEditable = useSelector((state: State) => state.settings.isEditable);
    const schemas = useSelector((state: State) => state.schemaDict.schema);
    const [activeTab, setActiveTab] = useState(0);
    const [dtdIndex, setDtdIndex] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [rowIndexs, setRowIndexs] = useState(null);
    const [columnsDtd, setColumnsDtd] = useState(null);
    const profileSchema = makeUpdateProfileRegularSchema(
        useSchema("profile_schema")
    );
    const profileItemSchema = makeProfileRegularItemSchema(
        useSchema("profile_schema")["items"].properties["profile_itm"]
    );
    const profileItemSchemaNested = makeProfileRegularItemSchema(
        useSchema("profile_schema")["items"].properties["profile_itm"].items
            .properties["limits"]
    );
    const [formData, setFormData] = useState({});
    const formField = profileItemSchema.fields["dtd_fr"];
    const {
        tempProfile,
        setTempProfile,
        updateProfile,
        validate,
        isBucketAlreadyExist,
        isBucketAlreadyExistMain,
        sortDTD,
        isDTDAlreadyExist,
        showDeleted,
    } = useProfileRegular();
    const handleClose = () => {
        setTempProfile(DEFAULT_PROFILE);
        onClose();
    };

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSubmit = (values: Object) => {
        let _values = deleteKeys(values, ["user_changed", "put_timestamp"]);
        _values = removeKeysWithValue(values, [""]);
        try {
            updateProfile({
                ..._values,
                profile_itm: removeKey(values["profile_itm"], "idx"),
            });
            handleClose();
        } catch (e) {
            sendToast(e.message, "error");
        }
    };

    const updateColumnProperties = (columns) => {
        const numericOptionalColumns: Set<string> = new Set([
            "start_dtd",
            "end_dtd",
        ]);
        return columns.map((column) => {
            if (numericOptionalColumns.has(column["dataField"])) {
                return { ...column, type: "string" };
            }
            return { ...column };
        });
    };

    let profileItemColumns = addPrimaryKeyColumn(
        columnCreator({
            schemaName: "profile_schema",
            nested: "profile_itm",
            schemas: schemas,
            hideDeleted: false,
        }).filter((obj) => obj.dataField !== "group")
    );
    updateColumnProperties(profileItemColumns);

    const profileItemEditHandler = cellEditFactory({
        mode: "click",
        autoSelectText: true,
        style: {
            width: "20%",
        },
        blurToSave: true,
    });

    const handleProfileItemDelete = (row) => {
        if (tempProfile["profile_itm"].length !== 1) {
            setTempProfile((prev) => {
                return {
                    ...prev,
                    profile_itm: prev["profile_itm"].filter(
                        (item) => !_.isEqual(row, item)
                    ),
                };
            });
        }
    };

    const handleProfileItemDeleteBucket = (row) => {
        setTempProfile((prev) => {
            const limit = prev["profile_itm"].map((el) => {
                if (el.limits.length !== 1) {
                    return {
                        ...el,
                        limits: el["limits"].filter(
                            (itm) => !_.isEqual(row.bucket, itm.bucket)
                        ),
                    };
                } else {
                    return el;
                }
            });
            return {
                ...prev,
                profile_itm: limit,
            };
        });
    };

    const createProfileItemDeleteButton = (cellContent, row) => {
        return (
            <div style={{ display: "flex", gap: "5px" }}>
                <MdDelete
                    title="Delete"
                    size={15}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        handleProfileItemDelete(row);
                    }}
                />
            </div>
        );
    };
    const actionColumns = {
        dataField: "actions",
        text: "",
        isDummyField: true,
        csvExport: false,
        editable: false,
        headerAlign: "center",
        formatter: createProfileItemDeleteButton,
    };

    const createProfileItemDeleteBucketButton = (cellContent, row) => {
        return (
            <div style={{ display: "flex", gap: "5px" }}>
                <MdDelete
                    title="Delete"
                    size={15}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        handleProfileItemDeleteBucket(row);
                    }}
                />
            </div>
        );
    };
    const actionBucketColumns = {
        dataField: "actions",
        text: "",
        isDummyField: true,
        csvExport: false,
        editable: false,
        headerAlign: "center",
        formatter: createProfileItemDeleteBucketButton,
    };

    const handleProfileItemSubmit = (values: object) => {
        const seperatedBuckets = values["bucket"];
        try {
            if (!seperatedBuckets || seperatedBuckets?.length == 0) {
                throw new ValidationError(
                    "Please make sure to press enter, tab or comma before clicking on Add"
                );
            }
            const checkBucketDuplicates = isBucketAlreadyExist(values);
            checkBucketDuplicates.map((el) => {
                if (el === true) {
                    throw new ValidationError("'Bucket' should be a unique value");
                }
            });
            values["idx"] = crypto.randomUUID();
            setTempProfile((prev) => {
                const display = prev["profile_itm"][0]["limits"].length;
                const filterBuckets = seperatedBuckets.filter(
                    (el) => !_.isEqual(el, " ")
                );
                const buck = filterBuckets.map((e, i) => {
                    return {
                        booking_limit: "0%",
                        bucket: e,
                        display_seq: display + i + 1,
                    };
                });
                const profileItems = prev["profile_itm"].map((el) => {
                    return { ...el, limits: [...el.limits, ...buck] };
                });
                return {
                    ...prev,
                    profile_itm: [...profileItems],
                };
            });
        } catch (e) {
            sendToast(e.message, "error");
        }
    };

    const validateDtdValues = (seperatedDtd) => {
        seperatedDtd?.map((el) => {
            if (!isNumeric(el)) {
                throw new ValidationError("'DTD From' must be an integer");
            }
            if (isDTDAlreadyExist(el, tempProfile)) {
                throw new ValidationError("'DTD From' must not be duplicate");
            }
            if (!_.inRange(el, 0, 1000)) {
                throw new ValidationError("'DTD From' should be >=0 and <=999");
            }
        });
    };

    const handleDTD = (values) => {
        const seperatedDtd = values["dtd_fr"];
        try {
            if (!seperatedDtd || seperatedDtd?.length == 0) {
                throw new ValidationError(
                    "Please make sure to press enter, tab or comma before clicking on Add"
                );
            }

            validateDtdValues(seperatedDtd);

            setTempProfile((prev) => {
                const profileItems = prev.profile_itm || [];
                const copyDTD = profileItems.filter((itm) => {
                    if (dtdIndex == itm.dtd_fr) {
                        return itm;
                    }
                });
                const newItemLimits = profileItems[0]?.limits?.map((el) => {
                    return {
                        booking_limit: "0%",
                        bucket: el.bucket,
                        display_seq: el.display_seq,
                    };
                });
                const newDTDLimits =
                    profileItems[0]?.limits?.length >= 1 ? newItemLimits : [];
                const filterDTD = seperatedDtd?.filter((el) => !_.isEqual(el, " "));
                const dtd = filterDTD?.map((el) => {
                    return {
                        dtd_fr: Number(el),
                        limits:
                            copyDTD.length !== 0 ? [...copyDTD[0].limits] : [...newDTDLimits],
                    };
                });
                return {
                    ...prev,
                    profile_itm: [...profileItems, ...dtd],
                };
            });
        } catch (e) {
            sendToast(e.message, "error");
        }
    };

    const handleTagDTD = (e: React.FormEvent) => {
        e.preventDefault();
        const filteredDict = {};
        for (const key in formData) {
            if (formData[key] !== "") {
                filteredDict[key] = formData[key];
            }
        }
        handleDTD(filteredDict);
        setDtdIndex("default");
    };

    const handleUniqueValueSequenceError = ({
        oldValue,
        newValue,
        checkBucketAlreadyExist,
    }) => {
        try {
            if (oldValue !== newValue && checkBucketAlreadyExist) {
                throw new ValidationError("'bucket' should be a unique value");
            }
        } catch (e) {
            sendToast(e.message, "error");
        }
    };

    const handleBookingLimitAndBucket = (newProfileItems, item, idx, i) => {
        if (!newProfileItems[i]["bucket"]) {
            throw new ValidationError("must have required property 'Bucket'");
        }
        return {
            booking_limit: newProfileItems[idx]?.dtd_fr
                ? newProfileItems[idx]["limits"][i]["booking_limit"]
                : newProfileItems[i][item["dtd_fr"]],
            bucket: newProfileItems[idx]?.dtd_fr
                ? newProfileItems[idx]["limits"][i]["bucket"]
                : newProfileItems[i].bucket,
            display_seq: i + 1,
        };
    };

    const handleTableChange = (row, column, value, updatedTableData) => {
        type Limit = {
            bucket: string;
            booking_limit: string;
            display_seq: number;
        };

        type ColumnData = {
            dtd_fr: number;
            limits: Limit[];
        };

        function updateBookingLimitBelow(data: ColumnData[], dtd_fr_to_update: number, bucket_to_start: string, new_limit: string): ColumnData[] {
            return data.map((col) => {
                if (col.dtd_fr != dtd_fr_to_update) return col;

                const startSeq = col.limits.find((l) => l.bucket === bucket_to_start)?.display_seq ?? Infinity;

                return {
                    ...col,
                    limits: col.limits.map((limit) => ({
                        ...limit,
                        booking_limit: limit.display_seq >= startSeq ? new_limit : limit.booking_limit
                    }))
                };
            });
        }

        const updatedProfile_Items = updateBookingLimitBelow(tempProfile?.profile_itm, column?.id, row?.original?.primary_key, value);

        setTempProfile((prev) => ({
            ...prev,
            profile_itm: updatedProfile_Items
        }));

        // Take reference from handleTableChange in UpdateJourneyNew.tsx
        // const newState = updatedTableData;
        // const data = newState["data"];
        // const { newValue, dataField, rowId } = newState["cellEdit"];
        // const newProfileItems = _.map(data, (item) => {
        //   const _item = deleteKeys(item, [dataField.toString()]);
        //   if (item["primary_key"] === rowId && newValue == "") {
        //     return { ..._item };
        //   } else if (item["primary_key"] === rowId) {
        //     const checkBucketAlreadyExist = dataField === "bucket" && isBucketAlreadyExistMain({ ...item, [dataField]: newValue }, tempProfile["profile_itm"]);
        //     handleUniqueValueSequenceError({
        //       oldValue: item.bucket,
        //       newValue: newValue,
        //       checkBucketAlreadyExist: checkBucketAlreadyExist
        //     });

        //     const bucketValue = checkBucketAlreadyExist ? item.bucket : newValue;
        //     return { ...item, [dataField]: bucketValue };
        //   } else {
        //     return { ...item };
        //   }
        // });

        // try {
        //   const newProfile = tempProfile["profile_itm"].map((item, idx) => {
        //     let newLimits = item.limits.map((lim, i) => handleBookingLimitAndBucket(newProfileItems, item, idx, i));
        //     return {
        //       dtd_fr: item.dtd_fr,
        //       limits: newLimits
        //     };
        //   });
        //   const updatedProfile = { ...tempProfile, profile_itm: newProfile };
        //   validate(updatedProfile);
        //   setTempProfile(updatedProfile);
        // } catch (e) {
        //   sendToast(e.message, "error");
        // }
    };

    const expandedData = [];
    const limits =
        tempProfile.profile_itm.length > 0
            ? tempProfile.profile_itm[0]["limits"]
            : [];
    limits.forEach((limit) => {
        expandedData.push({
            bucket: limit.bucket,
            primary_key: limit.bucket,
            profile: tempProfile.profile,
        });
    });

    let expandedColumns = [];

    expandedColumns.push(
        {
            accessorKey: "display_seq",
            header: <>Display Seq</>,
            desc1: "display sequence",
            sortable: true,
            hidden: true,
        },
        {
            accessorKey: "bucket",
            header: <>Bucket</>,
            desc1: "Bucket",
            sortable: true,
            hidden: false,
        },
        {
            accessorKey: "booking_limit",
            header: <>Booking Limit</>,
            desc1: "booking limit",
            sortable: true,
            hidden: true,
        }
    );

    const handleFormatCellClick = (
        cellContent,
        row,
        rowIndex,
        formatExtraData
    ) => {
        setOpenModal(true);
        setRowIndexs(formatExtraData["dtd"]);
        setColumnsDtd(row);
    };

    const handleCellFormatter = (cellContent, row, rowIndex, formatExtraData) => (
        <FormatCell
            cellContent={cellContent}
            onClick={() =>
                handleFormatCellClick(cellContent, row, rowIndex, formatExtraData)
            }
        />
    );

    const sortedProfileItm = sortDTD(tempProfile.profile_itm);

    for (const profileItem of sortedProfileItm) {
        expandedColumns.push({
            accessorKey: `${profileItem["dtd_fr"]}`,
            header: <>{profileItem["dtd_fr"]}</>,
            desc1: `${profileItem["dtd_fr"]}`,
            sortable: true,
            cell: (cell) =>
                EditableCellComp(cell, isEditable, handleTableChange, "primary_key", activeTab),
            // formatter: handleCellFormatter,
            // formatExtraData: {
            //   dtd: profileItem["dtd_fr"],
            // },
        });
        for (let i = 0; i < profileItem.limits.length; i++) {
            const el = profileItem.limits[i];
            expandedData[i][profileItem.dtd_fr] = el.booking_limit;
        }
    }

    let dtdColumns = [];

    dtdColumns.push({
        accessorKey: "dtd_fr",
        header: <>DTD From</>,
        desc1: "DTD From",
        sortable: true,
        cell: (cell) =>
            EditableCellComp(cell, isEditable, handleTableChange, "primary_key"),
    });

    let bucketColumns = [];

    bucketColumns.push({
        accessorKey: "bucket",
        header: <>Bucket</>,
        desc1: "Bucket",
        sortable: true,
        cell: (cell) =>
            EditableCellComp(cell, isEditable, handleTableChange, "primary_key"),
    });

    const handleSetDtd = (e) => {
        setDtdIndex(e.target.value);
    };

    const handleModalOkayButton = () => {
        setTempProfile((prev) => {
            const dtd = tempProfile?.profile_itm?.filter(
                (el) => el.dtd_fr == rowIndexs
            );
            const bucket = dtd[0]?.["limits"].filter(
                (el, i) => el.bucket === columnsDtd["bucket"]
            );
            const copiedDTDs = dtd[0]["limits"].map((el) => {
                if (el["display_seq"] > bucket[0]["display_seq"]) {
                    return { ...el, booking_limit: columnsDtd[rowIndexs] };
                }
                return el;
            });
            let profileitm = prev.profile_itm || [];
            let newLimitItems = profileitm.map((el) => {
                if (_.isEqual(el, dtd[0])) {
                    return { ...el, limits: [...copiedDTDs] };
                }
                return el;
            });
            return {
                ...prev,
                profile_itm: [...newLimitItems],
            };
        });
        setOpenModal(false);
    };

    const handleModalCancelButton = () => {
        setOpenModal(false);
    };

    const handleRowItemClasses = (row: any): string => {
        return "";
    };

    const handleDeleteDtdFrom = (rowToDelete) => {
        if (tempProfile["profile_itm"].length !== 1) {
            setTempProfile((prev) => {
                return {
                    ...prev,
                    profile_itm: prev["profile_itm"].filter(
                        (item) => !_.isEqual(rowToDelete, item)
                    ),
                };
            });
        }
    };

    const handleDeleteBucket = (rowToDelete) => {
        setTempProfile((prev) => {
            const limit = prev["profile_itm"].map((el) => {
                if (el.limits.length !== 1) {
                    return {
                        ...el,
                        limits: el["limits"].filter(
                            (itm) => !_.isEqual(rowToDelete.bucket, itm.bucket)
                        ),
                    };
                } else {
                    return el;
                }
            });
            return {
                ...prev,
                profile_itm: limit,
            };
        });
    };

    return (
        <Dialog onClose={handleClose} open={true} className="regular-view-dialog">
            <DialogTitle>Edit Profile {tempProfile.profile}</DialogTitle>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleChange}
                        aria-label="add-profile"
                    >
                        <Tab label="Edit Profile" {...a11yProps(0)} />
                        <Tab label="Add DTD" {...a11yProps(1)} />
                        <Tab label="Add Buckets" {...a11yProps(2)} />
                        <Tab label="Edit Items" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={activeTab} index={0}>
                    <DynamicForm
                        schema={profileSchema}
                        values={tempProfile}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            handleClose();
                        }}
                        onChange={(values) => {
                            setTempProfile(values);
                        }}
                        submitText="Confirm"
                    ></DynamicForm>
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <div className="select">
                        <label className="regular-view-dialog__copy-from-label">
                            {" "}
                            Copy from
                        </label>
                        <select
                            value={dtdIndex}
                            className="selectdtd"
                            onChange={handleSetDtd}
                        >
                            <option value="default">Select DTD</option>
                            {tempProfile["profile_itm"].map((el) => {
                                return (
                                    <option value={el.dtd_fr} key={el.idx}>
                                        {" "}
                                        {el.dtd_fr}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <form className="tableForm dynamic-form" onSubmit={handleTagDTD}>
                        <div className="form-content">
                            <div>
                                <label>
                                    {formField.title}
                                    {formField.isRequired ? (
                                        <span style={{ color: "red", paddingInline: "2px" }}>
                                            *
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </label>
                                <TagsInput
                                    value={formData["dtd_fr"]}
                                    onChange={(value: any) => {
                                        setFormData({ ...formData, ["dtd_fr"]: value });
                                    }}
                                    separators={["Enter", ",", ".", " ", "Tab"]}
                                    placeHolder="press Enter"
                                />
                            </div>
                        </div>
                        <div className="form-message">
                            <i>Press enter, tab or comma to add new tag</i>
                        </div>
                        <div className="form-footer">
                            <Button
                                onClick={() => {
                                    handleClose();
                                }}
                                name="Cancel"
                                variant="outline-info"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" name={"Add"} variant="info">
                                Add
                            </Button>
                        </div>
                    </form>
                    <div className="over-table">
                        <ParameterTanstackTable
                            columns={dtdColumns}
                            tableData={tempProfile["profile_itm"]}
                            keyField="dtd_fr"
                            isFilterOn={true}
                            getRowClassname={handleRowItemClasses}
                            editMode={isEditable}
                            isPaginationRequired={false}
                            defaultPageSize={100}
                            isDeleteRowBinRequired={true}
                            handleRowBinDelete={handleDeleteDtdFrom}
                        />
                    </div>
                    <div className="form-footer">
                        <Button
                            onClick={() => {
                                handleClose();
                            }}
                            name="Cancel"
                            variant="outline-info"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setActiveTab(2);
                            }}
                            name={"Next"}
                            variant="info"
                        >
                            Next
                        </Button>
                    </div>
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                    <DynamicFormReg
                        schema={profileItemSchemaNested}
                        //schema2={}
                        values={{}}
                        onSubmit={handleProfileItemSubmit}
                        onCancel={() => {
                            onClose();
                        }}
                        onChange={() => {
                            // This is intentional
                        }}
                        submitText="Add"
                    ></DynamicFormReg>
                    <div className="over-table">
                        <ParameterTanstackTable
                            columns={bucketColumns}
                            tableData={tempProfile["profile_itm"][0].limits}
                            handleTableEdit={handleTableChange}
                            isFilterOn={false}
                            keyField="dtd_fr"
                            getRowClassname={handleRowItemClasses}
                            editMode={isEditable}
                            isPaginationRequired={false}
                            isDeleteRowBinRequired={true}
                            handleRowBinDelete={handleDeleteBucket}
                        />
                        {/* <BootstrapTable
              keyField="dtd_fr"
              //onTableChange={{}}
              remote={{
                filter: false,
                pagination: false,
                sort: false,
                cellEdit: true,
              }}
              data={tempProfile["profile_itm"][0].limits}
              columns={[actionBucketColumns, ...bucketColumns]}
              noDataIndication={<NoData />}
              //cellEdit={profileItemEditHandler}
            /> */}
                    </div>
                    <div className="form-footer">
                        <Button
                            onClick={() => {
                                handleClose();
                            }}
                            name="Cancel"
                            variant="outline-info"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setActiveTab(3);
                            }}
                            name={"Next"}
                            variant="info"
                        >
                            Next
                        </Button>
                    </div>
                </TabPanel>
                <TabPanel value={activeTab} index={3}>
                    <div className="over-table">
                        {tempProfile.profile_itm[0] ? (
                            <>
                                <div className={"expanded-header"}>
                                    <h5>
                                        {tempProfile.profile_txt} - Profile {tempProfile.profile}
                                    </h5>
                                    <h6>{"(Less Than or equal to)"}</h6>
                                </div>
                                <ParameterTanstackTable
                                    columns={expandedColumns}
                                    tableData={expandedData}
                                    keyField="dtd_fr"
                                    isFilterOn={true}
                                    getRowClassname={handleRowItemClasses}
                                    editMode={isEditable}
                                    isPaginationRequired={false}
                                    defaultPageSize={100}
                                    isDeleteRowBinRequired={true}
                                    handleRowBinDelete={handleDeleteBucket}
                                    handleTableEdit={handleTableChange}
                                    hiddenColumnsData={{ display_seq: false, booking_limit: false } as any}
                                />
                                {/* <BootstrapTable
                  keyField="primary_key"
                  onTableChange={handleTableChange}
                  remote={{
                    filter: false,
                    pagination: false,
                    sort: false,
                    cellEdit: true,
                  }}
                  data={expandedData}
                  columns={[...expandedColumns]}
                  cellEdit={profileItemEditHandler}
                  noDataIndication={<NoData />}
                /> */}
                            </>
                        ) : (
                            <div>NO DATA</div>
                        )}
                    </div>
                    <div className="form-footer">
                        <Button
                            onClick={() => {
                                handleClose();
                            }}
                            name="Cancel"
                            variant="outline-info"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                handleSubmit(tempProfile);
                            }}
                            name={"Confirm"}
                            variant="info"
                        >
                            Confirm
                        </Button>
                    </div>
                </TabPanel>
            </Box>
            {
                <CustomModal
                    open={openModal}
                    title=""
                    description="Do you want to copy booking limit value?"
                    primaryCTA="Yes"
                    secondaryCTA="No"
                    handlePrimaryCTA={handleModalOkayButton}
                    handleSecondaryCTA={handleModalCancelButton}
                />
            }
        </Dialog>
    );
}
