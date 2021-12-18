import React, { Component } from "react";
import AccountLayout from "../../../components/accountLayout/AccountLayout";
import UserProfile from "../../../components/userProfile";

export default function Profile() {
  return (
    <AccountLayout>
      <UserProfile></UserProfile>
    </AccountLayout>
  );
}
