import { faStore, faCartShopping, faHeart, faBagShopping, faSquarePlus, faBoxArchive} from "@fortawesome/free-solid-svg-icons";

export const menuLinks = [
    { id: 1, title: "Shop", link: "/product", icon: faStore, isAdmin: true, isUser: true },
    { id: 2, title: "Cart", link: "/cart", icon: faCartShopping, isAdmin: false, isUser: true },
    { id: 3, title: "Favourite", link: "/favorite", icon: faHeart, isAdmin: false, isUser: true },
    { id: 4, title: "Orders", link: "/orders", icon: faBagShopping, isAdmin: false, isUser: true },
]

export const menuAdminLinks = [
    { id: 1, title: "Shop", link: "/product", icon: faStore },
    { id: 2, title: "All Orders", link: "/admin/getallorder", icon: faBagShopping },
    { id: 3, title: "Orders Archive", link: "/admin/getallorderarchive", icon: faBoxArchive },
    { id: 4, title: "Add towar", link: "/admin/addtowar", icon: faSquarePlus },
]