import React from "react";
import {
    Grid,
    Dialog,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { DialogContent, DialogTitle } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import '../../../../styles/views/_style.scss';
import '../../../../styles/utilities/_positionings.scss';
import { CustomTab } from "app/views/components/CustomTabs";
import TabEmployee from "app/views/Tab/TabEmployee";
import TabCertificate from "app/views/Tab/TabCertificate";
import TabFamily from "app/views/Tab/TabFamily";

toast.configure({
    autoClose: 3000,
    draggable: false,
    limit: 3
});

const AddEmployeeDialog = (props) => {
    const { open, setOpen, employee } = props;
    const [ id, setId ] = useState(employee?.id || 0);

    console.log(employee);

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const tabs = [
        { label: "Thông tin nhân viên", a11yPropsIndex: 0, content: <TabEmployee employee={employee} setOpen={setOpen} setId={setId} /> },
        { label: "Thông tin văn bằng", a11yPropsIndex: 1, content: <TabCertificate idEmployee={id} disabled={!id} /> },
        { label: "Thông tin gia đình", a11yPropsIndex: 2, content: <TabFamily idEmployee={id} disabled={!id} /> }
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