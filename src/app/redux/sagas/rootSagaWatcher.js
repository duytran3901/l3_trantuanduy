import { all, fork } from "redux-saga/effects";
import employeeSaga from "./EmployeeSaga";
import certificateSaga from "./CertificateSaga";
import familySaga from "./FamilySaga";

export default function* rootSagaWatcher() {
  yield all([
    fork(employeeSaga),
    fork(certificateSaga),
    fork(familySaga),
  ]);
}
