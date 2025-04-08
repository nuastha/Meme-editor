import React from "react";
import Button from "../buttons/Button";
// import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 container mx-auto flex justify-between items-center">
      <a href="/" className="text-3xl font-bold">
        Meme
      </a>
      <div className="flex items-center">
        <Button className="ml-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
