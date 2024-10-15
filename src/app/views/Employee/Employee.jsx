import React, { useCallback, useState } from "react";
import { Grid, Button, IconButton, Icon, InputAdornment, Input } from '@material-ui/core';
import MaterialTable from 'material-table'
import { Helmet } from 'react-helmet';
import { Breadcrumb, ConfirmationDialog } from 'egret';
import EmployeeDialog from './EmployeeDialog';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from "react-redux";
import { EMPLOYEE } from "../../redux/actions/actions";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const Employee = () => {
    const [isConfirmDeleteEmployeeOpen, setIsConfirmDeleteEmployeeOpen] = useState(false);
    const [isEditEmployeeDialogOpen, setIsEditEmployeeDialogOpen] = useState(false);
    const [employeeSelected, setEmployeeSelected] = useState({});
    const [searchKeyword, setSearchKeyword] = useState('');
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employee.employees);
    const dataTable = employees?.map((employee) => ({ ...employee }));

    const handleOpenDialog = (rowData) => {
        if (rowData) {
            setEmployeeSelected(rowData);
        } else {
            setEmployeeSelected({});
        }
        setIsEditEmployeeDialogOpen(true);
    }

    const handleClickDelete = (rowData) => {
        setIsConfirmDeleteEmployeeOpen(true);
        setEmployeeSelected(rowData);
    }

    const handleDeleteEmployee = (id) => {
        dispatch({ type: EMPLOYEE.DELETE_EMPLOYEE, payload: id })
        setIsConfirmDeleteEmployeeOpen(false);
        setEmployeeSelected({});
    }

    const handleSearch = (keyword) => {
        dispatch({ type: EMPLOYEE.SEARCH_EMPLOYEE, payload: keyword });
    }

    const debouncedSearch = useCallback(debounce((keyword) => {
        handleSearch(keyword);
    }, 300), []);

    useEffect(() => {
        if (searchKeyword) {
            debouncedSearch(searchKeyword);
        } else {
            dispatch({ type: EMPLOYEE.GET_EMPLOYEES });
        }
    
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchKeyword, debouncedSearch]);

    const renderActions = (rowData) => {
        return (
            <div>
                <IconButton size="small" onClick={() => handleOpenDialog(rowData)}>
                    <Icon fontSize="small" color="primary">edit</Icon>
                </IconButton>
                <IconButton size="small" onClick={() => handleClickDelete(rowData)}>
                    <Icon fontSize="small" color="error">delete</Icon>
                </IconButton>
            </div>
        )
    };

    const columns = [
        {
            title: 'STT',
            cellStyle: {
                width: '5%',
                padding: '0',
                minWidth: '55px',
            },
            headerStyle: {
                width: '5%',
                padding: '0',
                minWidth: '55px',
            },
            align: 'center',
            sorting: false,
            render: (rowData) => rowData.tableData.id + 1
        },
        {
            title: 'Thao tác',
            field: 'custom',
            cellStyle: {
                width: '8%',
                padding: '0',
                minWidth: '80px',
            },
            headerStyle: {
                width: '8%',
                padding: '0',
                minWidth: '80px',
            },
            align: 'center',
            sorting: false,
            render: renderActions,
        },
        {
            title: 'Mã nhân viên',
            field: 'code',
            cellStyle: {
                width: '12%',
                paddingLeft: '24px',
                minWidth: '100px',
                paddingRight: '0'
            },
            headerStyle: {
                width: '12%',
                minWidth: '100px',
                paddingRight: '0'
            },
        },
        {
            title: 'Tên nhân viên',
            field: 'name',
            cellStyle: {
                width: '20%',
                minWidth: '150px',
                paddingRight: '0'
            },
            headerStyle: {
                width: '20%',
                minWidth: '150px',
                paddingRight: '0'
            },
        },
        {
            title: 'Tuổi',
            field: 'age',
            cellStyle: {
                width: '10%',
                paddingLeft: '0px',
                paddingRight: '28px',
                minWidth: '90px',
            },
            headerStyle: {
                width: '10%',
                padding: '0',
                minWidth: '90px',
            },
            align: 'center'
        },
        {
            title: 'Email',
            field: 'email',
            cellStyle: {
                width: '20%',
                minWidth: '200px',
                paddingLeft: '0px',
            },
            headerStyle: {
                width: '20%',
                minWidth: '200px',
                paddingLeft: '0px',
            },
        },
        {
            title: 'Số điện thoại',
            field: 'phone',
            cellStyle: {
                width: '15%',
                minWidth: '160px',
                paddingRight: '0'
            },
            headerStyle: {
                width: '15%',
                minWidth: '160px',
                paddingRight: '0'
            },
        },
    ];

    const handleExportExcel = () => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(dataTable);
        const wb = { Sheets: { data: ws }, SheetNames: ["Employees"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, 'Employees' + fileExtension);
        toast.success("Xuất file excel thành công!");
    }

    return (
        <div className="m-30">
            <Helmet>
                <title>Nhân viên</title>
            </Helmet>
            <div className="mb-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Quản lý', path: "/directory/apartment" },
                        { name: 'Nhân viên', path: "/list/employee" }
                    ]}
                />
            </div>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item lg={5} md={5} sm={5} xs={12}>
                    <Button
                        variant="contained"
                        className="mb-8 mr-16 align-bottom"
                        color="primary"
                        onClick={() => handleOpenDialog({})}
                    >
                        Thêm
                    </Button>
                    <Button
                        className="mb-8 mr-16 align-bottom"
                        variant="contained"
                        color="primary"
                        onClick={() => handleExportExcel()}
                    >
                        Xuất Excel
                    </Button>
                </Grid>
                <Grid item lg={2} md={3} sm={3} xs={12}>
                    <Input
                        type="text"
                        name="keyword"
                        onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
                        className="w-100 mb-8 mr-10"
                        id="search_box"
                        placeholder='Nhập từ khóa tìm kiếm'
                        startAdornment={
                            <InputAdornment >
                                <Link to="#">
                                    <SearchIcon />
                                </Link>
                            </InputAdornment>
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <MaterialTable
                        columns={columns}
                        data={dataTable}
                        options={{
                            actionsColumnIndex: -1,
                            search: true,
                            rowStyle: (rowData, index) => ({
                                backgroundColor: (index % 2 === 1) ? '#EEE' : '#FFF',
                            }),
                            maxBodyHeight: 'calc(100vh - 362px)',
                            minBodyHeight: 'calc(100vh - 362px)',
                            headerStyle: {
                                backgroundColor: '#358600',
                                color: '#fff',
                            },
                            padding: 'dense',
                            toolbar: false
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'Không có nhân viên nào',
                            },
                            pagination: {
                                labelDisplayedRows: '{from}-{to} trong {count}',
                                labelRowsSelect: 'người',
                                firstTooltip: 'Trang đầu tiên',
                                previousTooltip: 'Trang trước',
                                nextTooltip: 'Trang tiếp',
                                lastTooltip: 'Trang cuối',
                            }
                        }}
                    />
                </Grid>
            </Grid>
            {isEditEmployeeDialogOpen && (
                <EmployeeDialog
                    open={isEditEmployeeDialogOpen}
                    setOpen={setIsEditEmployeeDialogOpen}
                    employee={employeeSelected}
                    renderActions={renderActions}
                />
            )}
            {isConfirmDeleteEmployeeOpen && (
                <ConfirmationDialog
                    title='Bạn có chắc chắn muốn xóa nhân viên này không?'
                    open={isConfirmDeleteEmployeeOpen}
                    onConfirmDialogClose={() => setIsConfirmDeleteEmployeeOpen(false)}
                    onYesClick={() => handleDeleteEmployee(employeeSelected.id)}
                    Yes='Có'
                    No='Không'
                />
            )}
        </div>
    )
}

export default Employee;