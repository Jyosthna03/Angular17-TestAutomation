import { Routes } from '@angular/router';
import { LoginComponent } from './userdata/login/login.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { loginguardGuard } from './guards/loginguard.guard';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'login', component:LoginComponent},
    {path:"registration",
        loadComponent:()=> import('./userdata/registration/registration.component').then(
            component => component.RegistrationComponent
        )
    },
    {path:"dashboard",
        loadComponent:()=> import('../app/dashboard/dashboard.component').then(
            component => component.DashboardComponent
        ),
        canActivate:[loginguardGuard]
    },
    {path:"accountDashboard",
        loadComponent:()=> import('../app/dashboard/account-details/account-dashboard/account-dashboard.component').then(
            c=> c.AccountDashboardComponent
        )
            ,canActivate:[loginguardGuard]
    },
    {path:"paymentDashboard",
        loadComponent:()=> import('../app/dashboard/payments/payment-dashboard/payment-dashboard.component').then(
            c=> c.PaymentDashboardComponent
        ),canActivate:[loginguardGuard]
    },
    {path:'transferDashboard',
        loadComponent:()=> import('../app/dashboard/fund-transfer/transfer-dashboard/transfer-dashboard.component').then(
            c => c.TransferDashboardComponent
        ),canActivate:[loginguardGuard]
    },

    {path:'transferSuccess',
        loadComponent:()=> import('../app/dashboard/fund-transfer/transfer-successfull/transfer-successfull.component').then(
            c => c.TransferSuccessfullComponent
        ),canActivate:[loginguardGuard]
    },
    {path:'paymentSuccess',
        loadComponent:()=> import('../app/dashboard/payments/payment-success/payment-success.component').then(
            c => c.PaymentSuccessComponent
        ),canActivate:[loginguardGuard]
    },

    {path:'addpayeesm',
        loadComponent:()=>import('../app/dashboard/fund-transfer/addpayeesm/addpayeesm.component').then(
            c => c.AddpayeesmComponent
        )
    },
    {path:'**',component:PageNotFoundComponent}
];
