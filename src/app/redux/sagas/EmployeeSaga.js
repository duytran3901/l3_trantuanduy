import { put, call, takeEvery } from "redux-saga/effects";
import {
  createEmployee,
  getEmployeeById,
  deleteEmployee,
  editEmployee,
  searchEmployee,
} from "../reducers/EmployeeReducer";
import { toast } from "react-toastify";
import { EMPLOYEE } from "../actions/actions";
import { delData, getData, postData, putData } from "../../services/AxiosServices";
import ConstantList from "../../appConfig";

const apiEmployeeURL = ConstantList.API_ENPOINT + "employee/";
const SUCCESS_CODE = 200;

function* createEmployeeSaga(action) {
  console.log('create: ');
  console.log(action.payload);
  
  const formData = new FormData();
  formData.append("file", action.payload?.file);
  try {
    let image = "";
    if (action.payload.file) {
      const data = yield call(postData, apiEmployeeURL + "upload-image", formData);
      if (data.id) {
        image = data?.name
          ? ConstantList.API_ENPOINT + `public/image/${data?.name}`
          : "";
      } else {
        toast.error("Thêm ảnh thất bại");
      }
    } else {
      image = action?.payload?.image;
    }
    const result = yield call(
      postData,
      apiEmployeeURL,
      {
        ...action.payload,
        image: image,
        certificatesDto: [],
        employeeFamilyDtos: [],
      }
    );
    if (result?.code === SUCCESS_CODE) {
      yield put(createEmployee(result?.data));
      toast.success('Thêm thành công!');
    } else {
      toast.error(`Thêm không thành công! ${result?.data?.message}`);
    }
  } catch (error) {
    if (error) {
      toast.error('Thêm không thành công!');
    }
  }
}

function* editEmployeeSaga(action) {
  console.log('edit: ');
  console.log(action.payload);
  
  const editEmployeeUrl = apiEmployeeURL + `${action.payload.id}`;
  const formData = new FormData();
  formData.append("file", action.payload?.file);
  try {
    let image = "";
    if (action.payload.file) {
      const data = yield call(postData, apiEmployeeURL + "upload-image", formData);
      if (data.id) {
        image = data?.name
          ? ConstantList.API_ENPOINT + `public/image/${data?.name}`
          : "";
      } else {
        toast.error("Thêm ảnh thất bại");
      }
    } else {
      image = action?.payload?.image;
    }
    const result = yield call(
      putData,
      editEmployeeUrl,
      {
        ...action.payload.data,
        image: image,
      }
    );
    console.log(result);
    
    if (result?.code === SUCCESS_CODE) {
      yield put(editEmployee(result?.data));
      toast.success('Chỉnh sửa thành công!');
    } else {
      toast.error(`Chỉnh sửa không thành công! ${result?.data?.message}`);
    }
  } catch (error) {
    if (error) {
      toast.error('Chỉnh sửa không thành công!');
    }
  }
}

function* searchEmployeeSaga(action) {
  const searchEmployeesUrl = apiEmployeeURL + `search`;
  try {
    const result = yield call(getData, searchEmployeesUrl, action.payload);
    if (result?.code === SUCCESS_CODE) {
      yield put(searchEmployee(result));
    } else {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  }
}

function* deleteEmployeeSaga(action) {
  const deleteEmployeeUrl = apiEmployeeURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteEmployeeUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(deleteEmployee(action.payload));
      toast.success('Xóa thành công!');
    } else {
      toast.error('Xóa không thành công!');
    }
  } catch (error) {
    if (error) {
      toast.error('Xóa không thành công!');
    }
  }
}

function* getEmployeeByIdSaga(action) {
  const url = apiEmployeeURL + `${action.payload}`;
  try {
    const result = yield call(getData, url);
    console.log(result);
    
    if (result?.code === SUCCESS_CODE) {
      yield put(getEmployeeById(result));
    } else {
      toast.error('Có lỗi xảy ra!');
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra!');
    }
  }
}

export default function* employeeSaga() {
  yield takeEvery(EMPLOYEE.CREATE_EMPLOYEE, createEmployeeSaga);
  yield takeEvery(EMPLOYEE.UPDATE_EMPLOYEE, editEmployeeSaga);
  yield takeEvery(EMPLOYEE.SEARCH_EMPLOYEE, searchEmployeeSaga);
  yield takeEvery(EMPLOYEE.DELETE_EMPLOYEE, deleteEmployeeSaga);
  yield takeEvery(EMPLOYEE.GET_EMPLOYEE_BY_ID, getEmployeeByIdSaga);
}