import React, { useRef } from "react";
import { useAuth } from "react-oidc-context";
import LinkButton from "../../components/common/CustomLink";
import ButtonSecondary from "../../components/common/ButtonSecondary";
import { useClickOutside } from "../../hooks/useClickOutside";

const UserDropdwon = ({ toggleDropdown }) => {
  const auth = useAuth();
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, toggleDropdown);
  function handleLogout() {
    auth.signoutRedirect();
  }

  function handleClick() {
    toggleDropdown();
  }
  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50"
    >
      <LinkButton to="profile" onClick={handleClick}>
        Profile
      </LinkButton>
      <LinkButton to="settings" onClick={handleClick}>
        Settings
      </LinkButton>
      <ButtonSecondary onClick={handleLogout}>Sign out</ButtonSecondary>
    </div>
  );
};

export default UserDropdwon;
