import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { HomeComponent } from "./components/home/home.component";
import { MessageComponent } from "./components/message/message.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ForgotpasswordComponent } from "./components/forgotpassword/forgotpassword.component";

import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/notauth.guard";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent, canActivate: [NotAuthGuard] },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
  {
    path: "forgotpassword",
    component: ForgotpasswordComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: ":username",
    component: MessageComponent,
    canActivate: [NotAuthGuard]
  },
  { path: "**", component: HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
