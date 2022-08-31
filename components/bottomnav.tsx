import Image from "next/image";
import { AiOutlinePlusCircle, AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { getId, closeComments, closePost } from "../store/slice";
import { useRouter } from "next/router";

export default function BottomNav() {
    const router = useRouter();
    const post = useSelector((state: RootState) => state.redux.users);
    const profileId = useSelector((state: RootState) => state.redux.profileId);
    const dispatch = useDispatch();
    const profile = () => {
        dispatch(getId(profileId));
        dispatch(closeComments());
        dispatch(closePost());
        router.push("/");
    };
    return (
        <div className="bg-white bottom w-full border-solid border-t border-gray-300  grid-cols-5 absolute bottom-0 hidden phone:grid z-50">
            <div className="px-2 grid place-items-center" onClick={profile}>
                <AiOutlineHome size={25} className="hover:cursor-pointer" />
            </div>
            <div className="px-2 grid place-items-center">
                <IoIosSearch size={25} className="hover:cursor-pointer" />
            </div>
            <div className="px-2 grid place-items-center">
                <AiOutlinePlusCircle size={25} className="hover:cursor-pointer" />
            </div>
            <div className="px-2 grid place-items-center">
                <AiOutlineHeart size={25} className="hover:cursor-pointer" />
            </div>
            <div className="grid place-items-center p-2">
                <Link href={"/profile/" + post.find((element: any) => element.id === "e48f0c66-4348-48a2-80a1-800da26732fd").username}>
                    <div
                        className="h-[25px] w-[25px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full grid place-items-center"
                        onClick={profile}
                    >
                        <div className="relative h-[21px] w-[21px] grid place-items-center  rounded-full overflow-hidden bg-blue-500  border-2 border-gray-50 border-solid ">
                            <Image
                                src={post.find((element: any) => element.id === "e48f0c66-4348-48a2-80a1-800da26732fd").userimage}
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
