import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsGrid3X3, BsBookmark } from "react-icons/bs";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { useRouter } from "next/router";

import { post, getId, unmount,imageLocation } from "../../store/slice";


const Profile: NextPage = (props: any) => {
    const postData = useSelector((state: RootState) => state.redux.users);
    const id = useSelector((state: RootState) => state.redux.profileId);
    const [images, setImages] = useState<any>();
    const { query } = useRouter();

    const dispatch = useDispatch();
    const [tabs, setTabs] = useState([
        {
            name: "POST",
            active: true,
            image: <BsGrid3X3 />,
        },
        {
            name: "SAVED",
            active: false,
            image: <BsBookmark />,
        },
        {
            name: "TAGGED",
            active: false,
            image: <CgProfile />,
        },
    ]);

    const tabClick = (button: number) => {
        let tabs = [
            {
                name: "POST",
                active: false,
                image: <BsGrid3X3 />,
            },
            {
                name: "SAVED",
                active: false,
                image: <BsBookmark />,
            },
            {
                name: "TAGGED",
                active: false,
                image: <CgProfile />,
            },
        ];

        tabs[button].active = true;
        setTabs(tabs);
    };

    const imageButton = (index: number, key: any) => {     
        dispatch(getId(key.id));
        dispatch(imageLocation(index))
        dispatch(post());
        dispatch(unmount());
    };

    return (
        <div className=" text-black flex flex-col items-center relative  w-screen phone:h-screen h-screen">
            <div className="w-[900px] under:w-full phone:w-full h-full">
                <div className="grid grid-cols-3">
                    <div className="grid place-items-center p-2">
                        <div className="h-[150px] w-[150px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full grid place-items-center phone:h-[100px] phone:w-[100px]">
                            <div className="py-6 px-6 relative h-[146px] w-[146px] grid place-items-center  rounded-full overflow-hidden bg-blue-500 phone:h-[96px] phone:w-[96px] border-2 border-gray-50 border-solid ">
                                <Image
                                    src={postData.find((element: any) => element.username === query.id).userimage}
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-8 grid  gap-4 col-span-2 phone:p-3 phone:pl-0">
                        <div className="flex gap-6 phone:hidden items-center">
                            <span>{postData.find((element: any) => element.username === query.id).username}</span>
                            <div className={`${postData.find((element: any) => element.username === query.id).id !== id? "hidden" : "flex"} gap-2 `}>
                                <button className="border-solid border border-gray-300 rounded py-[1px] px-1 text-sm">Edit Profile</button>
                                <button>
                                    <IoSettingsOutline size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-6 phone:items-center phone:gap-0">
                            <span className="flex gap-1 phone:flex-col phone:gap-0 phone:w-[80%] phone:items-center">
                                <b>38</b> Post
                            </span>
                            <span className="hover:cursor-pointer flex gap-1 phone:flex-col phone:gap-0 phone:w-full phone:items-center">
                                <b>500</b> Followers
                            </span>
                            <span className="hover:cursor-pointer flex gap-1 phone:flex-col phone:gap-0 phone:w-full phone:items-center">
                                <b>200</b> Following
                            </span>
                        </div>
                        <div className="grid grid-rows-2 phone:hidden">
                            <span>
                                <b>{postData.find((element: any) => element.username === query.id).name}</b>
                            </span>
                            <span>I like apples</span>
                        </div>
                    </div>
                </div>
                {/*buttons */}
                <div className="border-t border-gray-300 w-full flex justify-center items-center gap-10 phone:gap-0">
                    {tabs.map((key: any, index: number) => {
                        return (
                            <button
                                key={index}
                                className={`sm:border-t ${
                                    tabs[index].active ? "border-black" : "border-transparent"
                                } sm:pt-4 flex items-center gap-2 ${
                                    tabs[index].active ? "text-black" : "text-gray-400"
                                } transition-all phone:w-full phone:justify-center phone:border-b phone:p-2`}
                                onClick={() => {
                                    tabClick(index);
                                }}
                            >
                                {tabs[index].image}
                                <span className="hidden sm:block">{tabs[index].name}</span>
                            </button>
                        );
                    })}
                </div>
                {/*post*/}
                <div className="grid grid-col grid-cols-3 gap-9 py-4 phone:gap-[1px] phone:pt-0">
                    {postData
                        .find((element: any) => element.username === query.id)
                        .post.map((key: any, index: number) => {
                            if (index === 0) {
                                return;
                            } else if (key.image instanceof Array) {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center relative group hover:cursor-pointer aspect-square"
                                        onClick={() => imageButton(index, key)}
                                    >
                                        <div className="absolute   h-full w-full z-10 text-white group-hover:bg-black group-hover:bg-opacity-[35%] transition-all">
                                            <div className="flex p-2 justify-end absolute w-full">
                                                <Image src={"/ig.svg"} height={15} width={15} />
                                            </div>
                                            <div className=" h-full hidden items-center justify-center gap-7 group-hover:flex">
                                                <span className="flex gap-1 items-center">
                                                    <AiFillHeart /> <b>573</b>
                                                </span>
                                                <span className="flex gap-1 items-center justify-center">
                                                    <AiFillMessage /> <b>15</b>
                                                </span>
                                            </div>
                                        </div>
                                        <Image
                                            key={index}
                                            alt="user post"
                                            height={310}
                                            width={310}
                                            src={key.image[0]}
                                            objectFit="cover"
                                            quality={100}
                                        />
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center relative group hover:cursor-pointer aspect-square"
                                        onClick={() => imageButton(index, key)}
                                    >
                                        <div className="absolute h-full w-full z-10 text-white group-hover:bg-black group-hover:bg-opacity-[35%] transition-all">
                                            <div className=" h-full hidden items-center justify-center gap-7 group-hover:flex">
                                                <span className="flex gap-1 items-center">
                                                    <AiFillHeart /> <b>1520</b>
                                                </span>
                                                <span className="flex gap-1 items-center justify-center">
                                                    <AiFillMessage /> <b>15</b>
                                                </span>
                                            </div>
                                        </div>
                                        <Image
                                            priority
                                            key={index}
                                            alt="user post"
                                            src={key.image}
                                            height={310}
                                            width={310}
                                            objectFit="cover"
                                            quality={100}
                                        />
                                    </div>
                                );
                            }
                        })}
                </div>
            </div>
        </div>
    );
};

export default Profile;

export async function getServerSideProps(ctx: any) {
    const { query } = ctx;
    return { props: { user: query.id } };
}
