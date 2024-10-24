import React from "react";
import {
    Grid,
    DialogActions,
    Button,
    Dialog,
    MenuItem,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { DialogContent, DialogTitle } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import '../../../../styles/views/_style.scss';
import '../../../../styles/utilities/_positionings.scss';
import { useDispatch, useSelector } from "react-redux";
import { DISTRICT, EMPLOYEE, PROVINCE } from "app/redux/actions/actions";
import { IconButton, Icon } from '@material-ui/core';
// import CertificateDialog from "../Certificate/CertificateDialog";
import { ConfirmationDialog } from 'egret';
import { CustomTab } from "app/views/components/CustomTabs";
import TabEmployee from "app/views/Tab/TabEmployee";
import TabCertificate from "app/views/Tab/TabCertificate";
import TabFamily from "app/views/Tab/TabFamily";
import { ValidatorForm } from "react-material-ui-form-validator";

toast.configure({
    autoClose: 3000,
    draggable: false,
    limit: 3
});

const AddEmployeeDialog = (props) => {
    const { open, setOpen, employee, setEmployee } = props;
    // const provinces = useSelector(state => state.province.provinces);
    // const districts = useSelector(state => state.province.districts);
    // const wards = useSelector(state => state.district.wards);
    const dispatch = useDispatch();
    // const certificates = employee?.certificates;
    // const [isConfirmDeleteCertificateOpen, setIsConfirmDeleteCertificateOpen] = useState(false);
    // const [isEditCertificateDialogOpen, setIsEditCertificateDialogOpen] = useState(false);
    // const [certificateSelected, setCertificateSelected] = useState({});

    console.log(employee);

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleSubmitForm = () => {
        console.log(321);

    };

    // const handleOpenDialog = (rowData) => {
    //     if (rowData) {
    //         // setCertificateSelected(rowData);
    //     } else {
    //         setCertificateSelected({});
    //     }
    //     setIsEditCertificateDialogOpen(true);
    // }

    // const handleClickDelete = (rowData) => {
    //     setIsConfirmDeleteCertificateOpen(true);
    //     setCertificateSelected(rowData);
    // }

    // const handleDeleteCertificate = (id) => {
    //     const certificates = certificatesState?.filter(c => c.id !== id);
    //     toast.success('Xoá chứng chỉ thành công!');
    //     setCertificatesState(certificates);
    //     setIsConfirmDeleteCertificateOpen(false);
    //     setCertificateSelected({});
    // }

    // const getProvinceName = (provinceId) => {
    //     const province = provinces.find(p => p.id === provinceId);
    //     return province ? province.name : 'Không xác định';
    // };

    useEffect(() => {
        // dispatch({ type: PROVINCE.GET_PROVINCES });
    }, [dispatch]);

    // useEffect(() => {
    //     setEmployeeNew({
    //         ...employeeNew,
    //         certificates: certificatesState
    //     })
    // }, [certificatesState]);

    // useEffect(() => {
    //     if (employeeNew.provinceId) {
    //         dispatch({ type: PROVINCE.GET_DISTRICTS, payload: employeeNew.provinceId });
    //     }
    //     if (employeeNew.districtId) {
    //         dispatch({ type: DISTRICT.GET_WARDS, payload: employeeNew.districtId });
    //     }
    // }, [dispatch, employeeNew.provinceId, employeeNew.districtId]);
    const tabs = [
        { label: "Thông tin nhân viên", a11yPropsIndex: 0, content: <TabEmployee employee={employee} setOpen={setOpen} /> },
        { label: "Thông tin văn bằng", a11yPropsIndex: 1, content: <TabCertificate idEmployee={employee.id} /> },
        { label: "Thông tin gia đình", a11yPropsIndex: 2, content: <TabFamily idEmployee={employee.id} /> }
    ]

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            maxWidth="lg"
            fullWidth={true}
        >
            <DialogTitle className="mt-10">
                <span className="h3 text-green font-weight-bold">
                    {(!employee?.id ? "Thêm nhân viên" : "Sửa thông tin nhân viên")}
                </span>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Grid item lg={12}>
                        <CustomTab tabs={tabs}></CustomTab>
                    </Grid>
                </Grid>
            </DialogContent>
            
        </Dialog>
    )
}

export default AddEmployeeDialog;