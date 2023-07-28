import {
  lazy
} from 'react';
import Loadable from 'app/components/Loadable';

const Register = Loadable(lazy(() => import('../../views/student/register')));
const StaffRegister = Loadable(lazy(() => import('../../views/staffs/Register')));
const Students = Loadable(lazy(() => import('../../views/student/students')));
const ViewOne = Loadable(lazy(() => import('../../views/student/viewone')));
const Staffs = Loadable(lazy(() => import('../../views/staffs/Staffs')));
const Fees = Loadable(lazy(() => import('../../views/fees_receipt/Fees')));
const Batches = Loadable(lazy(() => import('../../views/Batches/batches')));
const CreateBatch = Loadable(lazy(() => import('../../views/Batches/CreateBatch')));
const Timetable = Loadable(lazy(() => import('../../views/timetable/timetable')));
const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));

const materialRoutes = [{
    path: '/material/table',
    element: < AppTable / >
  },
  {
    path: 'student/register',
    element: < Register / >
  },
  {
    path: 'student/students',
    element: < Students / >
  },
  {
    path: 'staffs/register',
    element: < StaffRegister / >
  },
  {
    path: 'student/students/view/:id',
    element: < ViewOne / >
  },
  {
    path: 'batches',
    element: < Batches / >
  },
  {
    path: 'batches/create',
    element: < CreateBatch / >
  },
  {
    path: 'timetable',
    element: < Timetable / >
  },
  {
    path: '/material/form',
    element: < AppForm / >
  },
  {
    path: '/staffs',
    element: < Staffs / >
  },
  {
    path: '/fees',
    element: < Fees / >
  },  {
    path: '/material/buttons',
    element: < AppButton / >
  }, {
    path: '/material/icons',
    element: < AppIcon / >
  }, {
    path: '/material/progress',
    element: < AppProgress / >
  }, {
    path: '/material/menu',
    element: < AppMenu / >
  }, {
    path: '/material/checkbox',
    element: < AppCheckbox / >
  }, {
    path: '/material/switch',
    element: < AppSwitch / >
  }, {
    path: '/material/radio',
    element: < AppRadio / >
  }, {
    path: '/material/slider',
    element: < AppSlider / >
  }, {
    path: '/material/autocomplete',
    element: < AppAutoComplete / >
  }, {
    path: '/material/expansion-panel',
    element: < AppExpansionPanel / >
  }, {
    path: '/material/dialog',
    element: < AppDialog / >
  }, {
    path: '/material/snackbar',
    element: < AppSnackbar / >
  }
];

export default materialRoutes;