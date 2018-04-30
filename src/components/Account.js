import React from 'react';
import withAuthorization from './withAuthorization';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import SignOutButton from './SignOut';

const AccountPage = () =>
    <div>
        <div className="jc-center valign-wrapper">
            <h1>Account</h1>
        </div>
        <PasswordChangeForm />
        <SignOutButton/>
    </div>

export default withAuthorization(AccountPage);