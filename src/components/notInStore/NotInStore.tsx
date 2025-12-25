import React from "react";

export default function NotInStore({ classification }: { classification: string }) {
  return (
    <div className="container mx-auto px-4 py-6 min-h-screen flex justify-center items-center text-[#8b959b]">
      <h1>No products found from this {classification}.</h1>
    </div>
  );
}
