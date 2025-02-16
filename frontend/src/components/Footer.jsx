import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SmartLock Inc. All rights
          reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
