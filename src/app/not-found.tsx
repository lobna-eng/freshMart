import React from 'react'
import { Wallet, AlertCircle } from "lucide-react"

export default function Notfound() {
  return (
    <div className="flex min-h-150 items-center justify-center  px-4">
      <div >
        <div className="flex flex-col items-center gap-6 py-12 text-center">
          {/* Illustration */}
          <div className="relative">
            <div className="flex h-24 w-32 items-center justify-center rounded-xl bg-muted">
              <Wallet className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-yellow-400 p-2 shadow">
              <AlertCircle className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h1 className="text-xl font-bold">
              We couldn't find what you were looking for
            </h1>
            <p className="text-sm text-muted-foreground font-semibold">
              We are very sorry but something has gone wrong, please try again.
            </p>
          </div>


        </div>
      </div>
    </div>
  )
}
