'use client';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {redirect, usePathname} from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import RegistrationMogal from "./modals/registration.mogal";
import Login from "./modals/login.modal";
import { useState } from "react";
import { SignOutFunc } from "@/actions/sign.out";


export const Logo = () => {
  return (
    <Image src='/logo.png' alt="logo" width={26} height={26} priority />
  );
};


export default function Header() {
    const pathName = usePathname();

    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);


    const handleSignOut = async () => {
      await SignOutFunc();
    }

    const getNavItems = () => {
        return siteConfig.navItems.map((el) => {
            const isActive = pathName === el.href;

            return <NavbarItem key={el.href} >
                <Link color="foreground" href={el.href} className={`px-3 py-1 ${isActive ? 'text-blue-500' : 'text-foreground'} hover:border hover:border-blue-300 hover:rounded-md`} >
                    {el.label}
                </Link>
            </NavbarItem>
        })
        
    }

  return (
    <Navbar className={`h-[${layoutConfig.headerhight}]`} >
      <NavbarBrand>
        <Link href='/' className="flex gap-1" >
            <Logo />
            <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
        
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        { getNavItems() }
      </NavbarContent>

      <NavbarContent justify="end">


        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="secondary" href="#" variant="flat" onPress={handleSignOut} >
            Logout
          </Button>
        </NavbarItem>
        
        <NavbarItem className="hidden lg:flex">
          
          <Button as={Link} color="secondary" href="#" variant="flat" onPress={() => {setIsLoginOpen(true)}} >
            Login
          </Button>

        </NavbarItem>
        <NavbarItem>

          <Button as={Link} color="primary" href="#" variant="flat" onPress={() => {setIsRegistrationOpen(true)}} >
            Sign Up
          </Button>

        </NavbarItem>
      </NavbarContent>

      <RegistrationMogal isOpen={isRegistrationOpen} onClose={() => {setIsRegistrationOpen(false)}} />
      <Login isOpen={isLoginOpen} onClose={() => {setIsLoginOpen(false)}} />

    </Navbar>
  );
}
