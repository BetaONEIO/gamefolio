"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const navigationRoutes = ["home", "about", "pricing", "contact"];

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="nav_container">
      {navigationRoutes?.map((singleRoute) => {
        return (
          <NavigationLink
            key={singleRoute}
            href={`/${singleRoute}`}
            text={singleRoute}
            router={router}
          />
        );
      })}
    </nav>
  );
}

function NavigationLink({ href, text, router }: any) {
  const isActive = router.asPath === (href === "/home" ? "/" : href);
  return (
    <Link href={href === "/home" ? "/" : href} passHref>
      <Link
        href={href === "/home" ? "/" : href}
        className={`${isActive && "nav_item_active"} nav_item`}
      >
        <span className="text-white">{text}</span>
      </Link>
    </Link>
  );
}
