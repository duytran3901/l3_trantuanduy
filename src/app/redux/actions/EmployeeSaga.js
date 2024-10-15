import { put, call, takeEvery } from "redux-saga/effects";
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployees,
  searchEmployee,
} from "../reducers/EmployeeReducer";
import { toast } from "react-toastify";
import { EMPLOYEE } from "./actions";
import { delData, getData, postData, putData } from "./services";
import ConstantList from "../../appConfig";

const apiEmployeeURL = ConstantList.API_ENPOINT + "/api/employees";
const SUCCESS_CODE = 200;

function* getEmployeesSaga() {
  const allEmployeesUrl = apiEmployeeURL + `/all`;
  try {
    const result = yield call(getData, allEmployeesUrl);
    console.log(result);
    
    if (result?.code === SUCCESS_CODE) {
      yield put(getEmployees(result?.data));
    } else {
      toast.error('Không lấy được danh sách nhân viên!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách nhân viên!');
    }
  }
}

function* createEmployeeSaga(action) {
  try {
    const result = yield call(postData, apiEmployeeURL, action.payload);
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
  const editEmployeeUrl = apiEmployeeURL + `/${action.payload.id}`;
  try {
    const result = yield call(putData, editEmployeeUrl, action.payload.data);
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
  const searchEmployeesUrl = apiEmployeeURL + `/page`;
  try {
    const result = yield call(postData, searchEmployeesUrl, { keyword: action.payload });
    if (result?.code === SUCCESS_CODE) {
      yield put(searchEmployee(result?.data?.content));
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

export default function* employeeSaga() {
  yield takeEvery(EMPLOYEE.GET_EMPLOYEES, getEmployeesSaga);
  yield takeEvery(EMPLOYEE.CREATE_EMPLOYEE, createEmployeeSaga);
  yield takeEvery(EMPLOYEE.UPDATE_EMPLOYEE, editEmployeeSaga);
  yield takeEvery(EMPLOYEE.SEARCH_EMPLOYEE, searchEmployeeSaga);
  yield takeEvery(EMPLOYEE.DELETE_EMPLOYEE, deleteEmployeeSaga);
}