import DarkModeToggle from "@/components/dark-mode-toggle";
import { cookies } from "next/headers";

export default function Layout({ children }: { children: React.ReactNode }) {

    return <>
        <header >
            <DarkModeToggle />
        </header>
        {children}
    </>
}   