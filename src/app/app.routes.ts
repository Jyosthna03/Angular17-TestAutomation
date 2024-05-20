import { Routes } from '@angular/router';
import { LoginComponent } from './userdata/login/login.component';
import { RegistrationComponent } from './userdata/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountDashboardComponent } from './dashboard/account-details/account-dashboard/account-dashboard.component';
import { AddpayeeComponent } from './dashboard/fund-transfer/addpayee/addpayee.component';
import { TransferDashboardComponent } from './dashboard/fund-transfer/transfer-dashboard/transfer-dashboard.component';
import { PaymentDashboardComponent } from './dashboard/payments/payment-dashboard/payment-dashboard.component';
import { PaymentSuccessComponent } from './dashboard/payments/payment-success/payment-success.component';
import { ForgotInfoComponent } from './userdata/forgot-info/forgot-info.component';
import { TransferSuccessfullComponent } from './dashboard/fund-transfer/transfer-successfull/transfer-successfull.component';
import { AddpayeesmComponent } from './dashboard/fund-transfer/addpayeesm/addpayeesm.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { loginguardGuard } from './guards/loginguard.guard';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path:"login", component:LoginComponent},
    {path:"forgot-info", component:ForgotInfoComponent},
    {path:"registration", component:RegistrationComponent},
    {path:"dashboard", component:DashboardComponent,canActivate:[loginguardGuard]},
    {path: "forgot-info", component: ForgotInfoComponent },
    {path:"accountDashboard",component:AccountDashboardComponent,canActivate:[loginguardGuard]},
    {path:"paymentDashboard",component:PaymentDashboardComponent,canActivate:[loginguardGuard]},
    {path:'transferDashboard',component:TransferDashboardComponent,canActivate:[loginguardGuard]},
    {path:'addpayee',component:AddpayeeComponent},
    {path:'transferSuccess',component:TransferSuccessfullComponent,canActivate:[loginguardGuard]},
    {path:'paymentSuccess',component:PaymentSuccessComponent,canActivate:[loginguardGuard]},
    {path:'addpayeesm',component:AddpayeesmComponent},
    {path:'**',component:PageNotFoundComponent}
];
