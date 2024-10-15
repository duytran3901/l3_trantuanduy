import { put, call, takeEvery } from "redux-saga/effects";
import {
  getDistricts, 
  createDistrict,
  editDistrict,
  searchDistrict,
  deleteDistrict,
  getWardsByDistrictId
} from "../reducers/DistrictReducer";
import { toast } from "react-toastify";
import { DISTRICT } from "./actions";
import ConstantList from "../../appConfig";
import { delData, getData, postData, putData } from "./services";

const apiDistrictURL = ConstantList.API_ENPOINT + '/api/districts';
const SUCCESS_CODE = 200;

function* getDistrictsSaga() {
  const allDistrictsUrl = apiDistrictURL + `/all`;
  try {
    const result = yield call(getData, allDistrictsUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(getDistricts(result?.data));
    } else {
      toast.error('Không lấy được danh sách huyện!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách huyện!');
    }
  }
}

function* createDistrictSaga(action) {
  try {
    const result = yield call(postData, apiDistrictURL, action.payload);
    if (result?.code === SUCCESS_CODE) {
      yield put(createDistrict(result?.data));
      toast.success('Thêm thành công!');
    } else {
      toast.error('Thêm không thành công!');
    }
  } catch (error) {
    if (error) {
      toast.error('Thêm không thành công!');
    }
  }
}

function* editDistrictSaga(action) {
  const editDistrictUrl = apiDistrictURL + `/${action.payload.id}`;
  try {
    const result = yield call(putData, editDistrictUrl, action.payload.data);
    if (result?.code === SUCCESS_CODE) {
      yield put(editDistrict(result?.data));
      toast.success('Chỉnh sửa thành công!');
    } else {
      toast.error('Chỉnh sửa không thành công!');
    }
  } catch (error) {
    if (error) {
      toast.error('Chỉnh sửa không thành công!');
    }
  }
}

function* searchDistrictSaga(action) {
  const searchDistrictsUrl = apiDistrictURL + `/page`;
  try {
    const result = yield call(postData, searchDistrictsUrl, { keyword: action.payload });
    if (result?.code === SUCCESS_CODE) {
      yield put(searchDistrict(result?.data?.content));
    } else {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  }
}

function* deleteDistrictSaga(action) {
  const deleteDistrictUrl = apiDistrictURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteDistrictUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(deleteDistrict(action.payload));
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

function* getWardsByDistrictIdSaga(action) {
  const url = apiDistrictURL + `/${action.payload}/wards`;
  try {
    const result = yield call(getData, url);
    if (result?.code === SUCCESS_CODE) {
      yield put(getWardsByDistrictId(result?.data));
    } else {
      toast.error('Không lấy được danh sách xã!');
    }
  } catch (error) {
    if (error) toast.error('Không lấy được danh sách xã!');
  }
}

export default function* districtSaga() {
  yield takeEvery(DISTRICT.GET_DISTRICTS, getDistrictsSaga);
  yield takeEvery(DISTRICT.CREATE_DISTRICT, createDistrictSaga);
  yield takeEvery(DISTRICT.UPDATE_DISTRICT, editDistrictSaga);
  yield takeEvery(DISTRICT.SEARCH_DISTRICT, searchDistrictSaga);
  yield takeEvery(DISTRICT.DELETE_DISTRICT, deleteDistrictSaga);
  yield takeEvery(DISTRICT.GET_WARDS, getWardsByDistrictIdSaga);
}