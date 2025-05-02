import React, { useRef } from "react";
import { useAuth } from "react-oidc-context";
import LinkButton from "../../components/common/CustomLink";
import { useClickOutside } from "../../hooks/useClickOutside";
import Badge from "../../components/common/Badge";
import { useSelector } from "react-redux";

const UserDropdwon = ({ toggleDropdown }) => {
  const auth = useAuth();
  const dropdownRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
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
      <div className="flex gap-2 px-2 py-1 border-b-1 border-gray-300">
        {currentUser?.userDetails?.roles.map((role) => (
          <Badge key={role.id} badge={role.name} />
        ))}
      </div>
      <LinkButton to="profile" onClick={handleClick}>
        Profile
      </LinkButton>
      <LinkButton to="settings" onClick={handleClick}>
        Settings
      </LinkButton>
      <button
        className="block w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={handleLogout}
      >
        Sign out
      </button>
    </div>
  );
};

export default UserDropdwon;
