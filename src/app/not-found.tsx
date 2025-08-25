'use client';

import {Button} from "@heroui/react";
import Link from "next/link";


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
        <div className="text-8x1 font-bold text-grey-300">404</div>

        <h1 className="text-3x1 font-bold tracking-tight">Сторінка не знайдена</h1>

        <div className="pt-6">
            <Button as={Link} href="/" color="primary" variant="shadow">
                Повернутися на головну
            </Button>
        </div>
    </div>
  )
}
