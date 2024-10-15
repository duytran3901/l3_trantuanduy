import { put, call, takeEvery } from "redux-saga/effects";
import {
  getProvinces, 
  createProvince,
  editProvince,
  searchProvince,
  deleteProvince,
  getDistrictsByProvinceId
} from "../reducers/ProvinceReducer";
import { toast } from "react-toastify";
import { PROVINCE } from "./actions";
import ConstantList from "../../appConfig";
import { delData, getData, postData, putData } from "./services";

const apiProvinceURL = ConstantList.API_ENPOINT + '/api/provinces';
const SUCCESS_CODE = 200;

function* getProvincesSaga() {
  const allProvincesUrl = apiProvinceURL + `/all`;
  try {
    const result = yield call(getData, allProvincesUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(getProvinces(result?.data));
    } else {
      toast.error('Không lấy được danh sách tỉnh!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách tỉnh!');
    }
  }
}

function* createProvinceSaga(action) {
  try {
    const result = yield call(postData, apiProvinceURL, action.payload);
    if (result?.code === SUCCESS_CODE) {
      yield put(createProvince(result?.data));
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

function* editProvinceSaga(action) {
  const editProvinceUrl = apiProvinceURL + `/${action.payload.id}`;
  try {
    const result = yield call(putData, editProvinceUrl, action.payload.data);
    if (result?.code === SUCCESS_CODE) {
      yield put(editProvince(result?.data));
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

function* searchProvinceSaga(action) {
  const searchProvincesUrl = apiProvinceURL + `/page`;
  try {
    const result = yield call(postData, searchProvincesUrl, { keyword: action.payload });
    if (result?.code === SUCCESS_CODE) {
      yield put(searchProvince(result?.data?.content));
    } else {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  }
}

function* deleteProvinceSaga(action) {
  const deleteProvinceUrl = apiProvinceURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteProvinceUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(deleteProvince(action.payload));
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

function* getDistrictsByProvinceIdSaga(action) {
  const url = apiProvinceURL + `/${action.payload}/districts`;
  try {
    const result = yield call(getData, url);
    if (result?.code === SUCCESS_CODE) {
      yield put(getDistrictsByProvinceId(result?.data));
    } else {
      toast.error('Không lấy được danh sách huyện!');
    }
  } catch (error) {
    if (error) toast.error('Không lấy được danh sách huyện!');
  }
}

export default function* provinceSaga() {
  yield takeEvery(PROVINCE.GET_PROVINCES, getProvincesSaga);
  yield takeEvery(PROVINCE.CREATE_PROVINCE, createProvinceSaga);
  yield takeEvery(PROVINCE.UPDATE_PROVINCE, editProvinceSaga);
  yield takeEvery(PROVINCE.SEARCH_PROVINCE, searchProvinceSaga);
  yield takeEvery(PROVINCE.DELETE_PROVINCE, deleteProvinceSaga);
  yield takeEvery(PROVINCE.GET_DISTRICTS, getDistrictsByProvinceIdSaga);
}