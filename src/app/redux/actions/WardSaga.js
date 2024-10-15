import { put, call, takeEvery } from "redux-saga/effects";
import {
  getWards, 
  createWard,
  editWard,
  searchWard,
  deleteWard
} from "../reducers/WardReducer";
import { toast } from "react-toastify";
import { WARD } from "./actions";
import ConstantList from "../../appConfig";
import { delData, getData, postData, putData } from "./services";

const apiWardURL = ConstantList.API_ENPOINT + '/api/wards';
const SUCCESS_CODE = 200;

function* getWardsSaga() {
  const allWardsUrl = apiWardURL + `/all`;
  try {
    const result = yield call(getData, allWardsUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(getWards(result?.data));
    } else {
      toast.error('Không lấy được danh sách xã!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách xã!');
    }
  }
}

function* createWardSaga(action) {
  try {
    const result = yield call(postData, apiWardURL, action.payload);
    if (result?.code === SUCCESS_CODE) {
      yield put(createWard(result?.data));
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

function* editWardSaga(action) {
  const editWardUrl = apiWardURL + `/${action.payload.id}`;
  try {
    const result = yield call(putData, editWardUrl, action.payload.data);
    if (result?.code === SUCCESS_CODE) {
      yield put(editWard(result?.data));
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

function* searchWardSaga(action) {
  const searchWardsUrl = apiWardURL + `/page`;
  try {
    const result = yield call(postData, searchWardsUrl, { keyword: action.payload });
    if (result?.code === SUCCESS_CODE) {
      yield put(searchWard(result?.data?.content));
    } else {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  }
}

function* deleteWardSaga(action) {
  const deleteWardUrl = apiWardURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteWardUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(deleteWard(action.payload));
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

export default function* WardSaga() {
  yield takeEvery(WARD.GET_WARDS, getWardsSaga);
  yield takeEvery(WARD.CREATE_WARD, createWardSaga);
  yield takeEvery(WARD.UPDATE_WARD, editWardSaga);
  yield takeEvery(WARD.SEARCH_WARD, searchWardSaga);
  yield takeEvery(WARD.DELETE_WARD, deleteWardSaga);
}