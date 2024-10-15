import React from "react";
import {
  Grid,
  DialogActions,
  Button,
  Dialog,
  MenuItem,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { DialogContent, DialogTitle } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import '../../../../styles/views/_style.scss';
import '../../../../styles/utilities/_positionings.scss';
import { useDispatch, useSelector } from "react-redux";
import { PROVINCE } from "app/redux/actions/actions";

toast.configure({
  autoClose: 1500,
  draggable: false,
  limit: 3
});

ValidatorForm.addValidationRule('isExpirationDateValid', (expirationDate, certificate) => {
  const effectiveDate = new Date(certificate?.effectiveDate);
    const expDate = new Date(expirationDate);
    return expDate > effectiveDate; 
});

const CertificateDialog = (props) => {
  const { open, setOpen, certificate, certificatesState, setCertificatesState } = props;
  const [certificateNew, setCertificateNew] = useState(certificate || '');
  const provinces = useSelector(state => state.province.provinces);
  const dispatch = useDispatch();

  console.log(certificate);
  

  ValidatorForm.addValidationRule('isExpirationDateValid', (expirationDate) => {
    const effectiveDate = new Date(certificate?.effectiveDate);
      const expDate = new Date(expirationDate);
      return expDate > effectiveDate; 
  });

  const handleCloseDialog = () => {
    setOpen(false);
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCertificateNew({
      ...certificateNew,
      [name]: value
    })
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    setCertificateNew({
      ...certificateNew,
      [name]: inputValue
    })
  };

  const handleSubmitForm = () => {
    let certificates = [...certificatesState];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expirationDate = new Date(certificateNew.expirationDate);
    expirationDate.setHours(0, 0, 0, 0);
    if (expirationDate.getTime() > today.getTime()) {
      if (certificate.id) {
        certificates = certificates.map(c => c.id === certificate.id ? certificateNew : c);
        toast.success("Sửa chứng chỉ thành công");
      } else {
        certificates.push(certificateNew);
        toast.success("Thêm chứng chỉ thành công");
      }
    } else {
      toast.error("Có lỗi! Ngày hết hạn chứng chỉ phải sau ngày hôm nay");
    }

    setCertificatesState(certificates);
    setOpen(false);
  };

  const handleChangeAddress = (e) => {
    const valueSelect = e.target.value;
    setCertificateNew({
      ...certificateNew,
      provinceId: valueSelect,
    });
  };

  useEffect(() => {
    dispatch({ type: PROVINCE.GET_PROVINCES });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle className="mt-10 pb-10">
        <span className="h3 text-green font-weight-bold">
          {(!certificate?.id ? "Thêm chứng chỉ" : "Sửa thông tin chứng chỉ")}
        </span>
      </DialogTitle>
      <ValidatorForm onSubmit={handleSubmitForm}>
        <DialogContent>
          <Grid container spacing={2} className="pb-20">
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                size="small"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Tên chứng chỉ
                  </span>
                }
                variant="outlined"
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                name="name"
                value={certificateNew.name}
                placeholder="Tên chứng chỉ"
                validators={[
                  "required",
                  "matchRegexp:^[^!@#\$%\^\&*\)\(+=._-]+$"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Tên không chứa các ký tự đặc biệt"
                ]}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Mã chứng chỉ
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                size="small"
                name="code"
                variant="outlined"
                value={certificateNew.code}
                placeholder="Mã chứng chỉ"
                validators={[
                  "required",
                  "matchRegexp:(?!\\s)([a-zA-Z0-9]{5,10})+$",
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Mã chứng chỉ sai định dạng (5-10 ký tự, không chứa dấu cách và các ký tự đặc biệt)"
                ]}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font pr-10">
                    <span className="span-required"> * </span>
                    Ngày cấp
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="date"
                name="effectiveDate"
                size="small"
                variant="outlined"
                value={certificateNew.effectiveDate}
                validators={["required"]}
                errorMessages={["Trường này bắt buộc nhập"]}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Ngày hết hạn
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="date"
                name="expirationDate"
                size="small"
                variant="outlined"
                value={certificateNew.expirationDate}
                validators={["required", "isExpirationDateValid"]}
                errorMessages={["Trường này bắt buộc nhập", "Ngày hết hạn phải sau lớn hơn ngày cấp"]}
              />
            </Grid>
            <Grid item sm={4} xs={4}>
              <SelectValidator
                className="w-100"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Nơi cấp
                  </span>
                }
                onChange={e => handleChangeAddress(e)}
                type="text"
                name="province"
                size="small"
                variant="outlined"
                value={certificateNew.provinceId}
                validators={["required"]}
                errorMessages={["Trường này bắt buộc chọn"]}
              >
                {provinces?.map(province => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.name}
                  </MenuItem>
                ))}
              </SelectValidator>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="mb-20 flex-center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseDialog}
            className="mr-12"
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="mr-12"
          >
            Lưu
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  )
}

export default CertificateDialog;