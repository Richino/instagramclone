import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { BsPlusCircle } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlinePlusCircle, AiOutlineHome, AiOutlineMessage, AiOutlineCompass, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { getId } from "../store/slice";


export default function Navbar() {
    const post = useSelector((state: RootState) => state.redux.users);
    const dispatch = useDispatch();
    const postData = useSelector((state: RootState) => state.redux.users);
    const id = useSelector((state: RootState) => state.redux.id);

    const profile = () => {
        dispatch(getId("e48f0c66-4348-48a2-80a1-800da26732fd"));
    };
    return (
        <div className="bg-white border-solid border-b border-gray-300 grid place-items-center w-full box-border sticky top-0 z-50 under:border-none">
            <div className="p-2  grid grid-cols-3 gap-5 w-[900px] under:w-full  phone:hidden">
                <Link href="/">
                    <div className="relative  w-28 h-full flex items-center justify-center hover:cursor-pointer">
                        <Image src="/instagram.png" height={28} width={112} objectFit="contain" quality={100} />
                    </div>
                </Link>
                <div>
                    <div className="flex bg-gray-100 p-2 rounded-md">
                        <IoIosSearch className="text-gray-500" size={20} />
                        <input className="bg-gray-100 h-5 w-full" />
                    </div>
                </div>
                <div className="grid grid-cols-6">
                    <Link href={"/"}>
                        <div className="px-2 grid place-items-center" onClick={profile}>
                            <AiOutlineHome size={25} className="hover:cursor-pointer" />
                        </div>
                    </Link>
                    <div className="px-2 grid place-items-center">
                        <AiOutlineMessage size={25} className="hover:cursor-pointer" />
                    </div>
                    <div className="px-2 grid place-items-center">
                        <AiOutlinePlusCircle size={25} className="hover:cursor-pointer" />
                    </div>
                    <div className="px-2 grid place-items-center">
                        <AiOutlineCompass size={25} className="hover:cursor-pointer" />
                    </div>
                    <div className="px-2 grid place-items-center">
                        <AiOutlineHeart size={25} className="hover:cursor-pointer" />
                    </div>
                    <Link href={"/profile/" + post.find((element: any) => element.id === "e48f0c66-4348-48a2-80a1-800da26732fd").username}>
                        <div className="px-2  grid place-items-center relative hover:cursor-pointer" onClick={profile}>
                            <Image
                                src={post.find((element: any) => element.id === "e48f0c66-4348-48a2-80a1-800da26732fd").userimage}
                                layout="fixed"
                                height={25}
                                width={25}
                                objectFit="cover"
                                className="rounded-full "
                                quality={100}
                            />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="p-4 w-full grid grid-cols-8 border-solid border-b border-gray-300  sm:hidden ">
                <span className="col-span-6">
                    <b>{postData.find((element: any) => element.id === id).username}</b>
                </span>
                <div className="flex items-center justify-center">
                    <AiOutlineMessage className="h-6 w-6" />
                </div>
                <div className="flex items-center justify-center">
                    <GiHamburgerMenu className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}
