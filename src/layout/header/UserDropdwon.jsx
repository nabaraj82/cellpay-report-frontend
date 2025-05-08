import React, { useRef } from "react";
import { useAuth } from "react-oidc-context";
import LinkButton from "../../components/common/CustomLink";
import { useClickOutside } from "../../hooks/useClickOutside";
import Badge from "../../components/common/Badge";
import { useSelector } from "react-redux";
import { FiLock, FiLogOut, FiUser } from "react-icons/fi";

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
      className="absolute right-0 mt-2 w-48 xl:w-52  bg-white dark:bg-gray-700 rounded-md shadow-lg z-50"
    >
      <div className="flex gap-2 px-2 py-1 border-b-1 border-gray-300">
        {currentUser?.userDetails?.roles.map((role) => (
          <Badge key={role.id} badge={role.name} />
        ))}
      </div>
      <LinkButton to="profile" onClick={handleClick}>
        <div className="flex justify-start items-center gap-1">
          <FiUser size={15} />
          <span>Profile</span>
        </div>
      </LinkButton>
      <LinkButton to="change-password" onClick={handleClick}>
        <div className="flex justify-start items-center gap-1">
          <FiLock size={15} />
          <span>Change Password</span>
        </div>
      </LinkButton>
      <button
        className="block w-full px-4 py-2 text-left text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={handleLogout}
      >
        <div className="flex justify-start items-center gap-1">
          <FiLogOut size={15} />
          <span>Sigin Out</span>
        </div>
      </button>
    </div>
  );
};

export default UserDropdwon;
