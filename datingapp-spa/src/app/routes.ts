import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AuthGuard } from './_gaurds/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_gaurds/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';


export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent,
        resolve: {users: MemberListResolver}},
      {path: 'members/:id', component: MemberDetailComponent,
        resolve: {user: MemberDetailResolver}},
      {path: 'member/edit', component: MemberEditComponent,
        resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
      {path: 'messages', component: MessagesComponent,
        resolve: {messages: MessagesResolver}},
      {path: 'lists', component: ListsComponent,
        resolve: {users: ListsResolver}},
        {path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}}
    ]
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
