import { all, fork } from "redux-saga/effects";
import employeeSaga from "./EmployeeSaga";
import provinceSaga from "./ProvinceSaga";
import districtSaga from "./DistrictSaga";
import WardSaga from "./WardSaga";

export default function* rootSagaWatcher() {
  yield all([
    fork(employeeSaga),
    fork(provinceSaga),
    fork(districtSaga),
    fork(WardSaga),
  ]);
}
