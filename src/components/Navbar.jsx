import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutUsers } from "../store/action/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer.users);
  const user = users?.length > 0 ? users[0] : null;

  const logout = () => {
    dispatch(asyncLogoutUsers());
  };

  return (
    <nav className="bg-gray-200 px-4 py-2 flex justify-between">
      <ul className="flex items-center">
        <li className="mr-6">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
            }
            to="/home"
          >
            Home
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
            }
            to="/products"
          >
            Products
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
            }
            to="/cart"
          >
            Cart
          </NavLink>
        </li>

        {/* Show "Create Product" only if user is logged in and isAdmin */}
        {user && user.isAdmin && (
          <li className="mr-6">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
              }
              to="/admin/create-product"
            >
              Create Product
            </NavLink>
          </li>
        )}

        {/* Show Login/Register if not logged in */}
        {!user && (
          <>
            <li className="mr-6">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500"
                    : "text-gray-800 hover:text-blue-700"
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500"
                    : "text-gray-800 hover:text-blue-700"
                }
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Show Logout if user is logged in */}
      {user && (
        <ul className="flex items-center">
          <li className="mr-6">
            <button
              onClick={logout}
              className="text-gray-800 hover:text-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
