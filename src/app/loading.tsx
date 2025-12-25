import React from 'react'
import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader size={50} className="animate-spin text-gray-500" />
    </div>
  );
}
