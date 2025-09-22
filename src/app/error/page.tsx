'use client'
import { useSearchParams } from "next/navigation"

export default function ErrorPage() {

    const serchParams = useSearchParams();
    const  message = serchParams.get("message") || "Невідома помилка";

  return (
    <div className="flex justify-center items-center" >
        <p className="text-red-500 text-xl">{message}</p>
    </div>
  )
}
