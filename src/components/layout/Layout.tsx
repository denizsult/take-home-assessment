import { Outlet, NavLink } from "react-router-dom";
import { Users, Package, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Package className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">
              DataTable
            </span>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <nav className="hidden md:flex space-x-6">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-1.5 py-2 text-sm font-medium",
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                )
              }
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-1.5 py-2 text-sm font-medium",
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                )
              }
            >
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </NavLink>
          </nav>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white py-2 px-4 border-t border-gray-200">
            <NavLink
              to="/users"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 py-3 px-2 rounded-md",
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              <Users className="h-5 w-5" />
              <span className="font-medium">Users</span>
            </NavLink>
            <NavLink
              to="/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 py-3 px-2 rounded-md",
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              <Package className="h-5 w-5" />
              <span className="font-medium">Orders</span>
            </NavLink>
          </nav>
        )}
      </header>

      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
