import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { withTranslation } from 'react-i18next';
const Employee = EgretLoadable({
  loader: () => import("./AddEmployee")
});
const ViewComponent = withTranslation()(Employee);

const EmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employee_manager/add_employee",
    exact: true,
    component: ViewComponent
  }
];

export default EmployeeRoutes;
