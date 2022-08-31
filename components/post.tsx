import { AiOutlineClose } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import Image from "next/image";
import { BsEmojiSmile, BsChevronLeft } from "react-icons/bs";
import {  AiOutlineMessage,  AiOutlineHeart } from "react-icons/ai";
import { useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";

import { restore, post, image, openComments, closeComments, unmount } from "../store/slice";


export default function Post() {
    const dispatch = useDispatch();
    const ref = useRef<HTMLHeadingElement>(null);
    const userId: any = useSelector((state: RootState) => state.redux.id);
    const openPost = useSelector((state: RootState) => state.redux.openPost);
    const comments = useSelector((state: RootState) => state.redux.comments);
    const postData = useSelector((state: RootState) => state.redux.users);
    const index = useSelector((state: RootState) => state.redux.postIndex);
    const data = postData.find((element: any) => element.id === userId)

    const previousPostButton = () => {
        dispatch(restore());
        dispatch(post());
    };

    const openImg = () => {
        dispatch(image(true));
    };

    const x = () => {
        dispatch(unmount());
    };

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (ref.current === e.target) {
                dispatch(post());
                dispatch(restore());
                dispatch(image(true));
                dispatch(unmount());
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    return (
        <div className={``}>
            <div
                ref={ref}
                className={` ${
                    openPost === true ? `sm:flex phone:hidden` : `hidden`
                } absolute top-0 h-full w-full bg-black bg-opacity-70 z-[99] p-20  justify-center items-center overflow-hidden left-0 `}
            >
                <div className="bg-white box flex overflow-hidden">
                    <div className="relative  w-[60%] h-full bg-black flex items-center justify-center ">
                        {data.post[index].image instanceof Array ? (
                            <Image
                                priority
                                src={data.post[index].image[0]}
                                layout="fill"
                                objectFit="contain"
                                quality={25}
                                onLoadingComplete={openImg}
                            />
                        ) : (
                            <Image
                                priority
                                alt="/black.png"
                                src={data.post[index].image}
                                layout="fill"
                                objectFit="contain"
                                quality={25}
                                onLoadingComplete={openImg}
                            />
                        )}
                    </div>
                    <div className="w-1/2  relative ">
                        <div className="p-2 border-solid border-b border-gray-300 ">
                            <div className="flex gap-5 w-full p-2 ">
                                <div>
                                    <div className="image">
                                        <div className="h-[44px] w-[44px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full grid place-items-center ">
                                            <div className="relative h-[40px] w-[40px] grid place-items-center  rounded-full overflow-hidden bg-blue-500  border-2 border-gray-50 border-solid ">
                                                <Image src={data.userimage} layout="fill" objectFit="cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-center gap-2 col-span-5">
                                    <div className="flex gap-4 justify-center">
                                        <div className="flex w-full gap-2">
                                            <span className="font-medium">{data.username}</span>
                                            <span className="font-bold">Following</span>
                                        </div>

                                        <div className="flex justify-center items-center">
                                            <BiDotsHorizontalRounded />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4  overflow-y-scroll comments-height ">
                            {data.post[index].comments?.map((key: any, index: number) => {
                                if (index === 0) {
                                    return;
                                } else {
                                    return (
                                        <div key={index} className="gap-2 w-full user_card">
                                            <div className="image">
                                                <div className="h-[44px] w-[44px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full grid place-items-center ">
                                                    <div className="relative h-[40px] w-[40px] grid place-items-center  rounded-full overflow-hidden bg-blue-500  border-2 border-gray-50 border-solid ">
                                                        <Image src={key.userimage} layout="fill" objectFit="cover" quality={100} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className=" w-full text-left gap-2 paragraph ">
                                                <b className="mr-2">{key.username}</b>
                                                {key.comment}
                                            </p>
                                            <div className="flex justify-center items-center button  ">
                                                <AiOutlineHeart size={14} className="hover:cursor-pointer" />
                                            </div>
                                            <div className="flex   gap-2 col-span-4 text-sm text-gray-500 post">
                                                <span>{key.likes}</span>
                                                <span> likes</span>
                                                <span>Reply</span>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <div className="flex flex-col border-solid border border-gray-300 pb-0 w-full absolute bottom-0 bg-white">
                            <div className="p-3 flex flex-col">
                                <div className="flex items-center gap-2">
                                    <div className="p-1">
                                        <AiOutlineHeart size={25} className="hover:cursor-pointer" />
                                    </div>

                                    <div className="p-1 py-2">
                                        <AiOutlineMessage size={25} className="hover:cursor-pointer" />
                                    </div>

                                    <div className="p-1 py-2">
                                        <IoPaperPlaneOutline size={25} className="hover:cursor-pointer" />
                                    </div>
                                </div>
                                <span className="pl-1">
                                    <b>2,443 likes</b>
                                </span>
                                <span className="pl-1">2 days ago</span>
                            </div>
                            <div className="flex items-center border-solid border-t border-gray-300">
                                <button className="p-4  flex items-center justify-center">
                                    <BsEmojiSmile size={20} />
                                </button>
                                <div className="w-full flex items-center">
                                    <input className="h-full w-full focus:border-none" placeholder="Add comment here..." />
                                </div>
                                <button className="p-4  flex items-center text-blue-500">
                                    <b>Post</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-5">
                    <AiOutlineClose color="white" size={30} onClick={() => {}} />
                </div>
            </div>
            {/*---------------------------mobile----------------------------------*/}
            <div
                className={`${
                    openPost === true ? ` left-0 ` : `left-[-100%] `
                }absolute top-0 h-[95vh] max-h-[95vh] w-screen bg-black bg-opacity-70 z-50 overflow-hidden hidden phone:block animation `}
            >
                <div className="bg-white top w-full flex border-solid border-b border-gray-300 ">
                    <div className="w-[10vh] flex items-center justify-center">
                        <BsChevronLeft size={20} onClick={previousPostButton} />
                    </div>
                    <div className=" w-full flex items-center justify-center font-medium">Post</div>
                    <div className="w-[10vh] "></div>
                </div>
                <div className="bg-white middle w-full overflow-scroll">
                    <div className=" p-4">
                        <div className="flex gap-5 w-full">
                            <div className="grid place-items-center">
                                <div className="h-[44px] w-[44px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full grid place-items-center ">
                                    <div className="relative h-[40px] w-[40px] grid place-items-center  rounded-full overflow-hidden bg-gray-100  border-2 border-gray-50 border-solid ">
                                        <Image src={data.userimage} layout="fill" objectFit="cover" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col justify-center gap-2 col-span-5">
                                <div className="flex gap-4 justify-center">
                                    <div className="flex w-full gap-2">
                                        <span className="font-medium">{data.username}</span>
                                        <span className="font-bold">Following</span>
                                    </div>

                                    <div className="flex justify-center items-center">
                                        <BiDotsHorizontalRounded />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className=" flex bg-black relative box_mobile">
                            {data.post[index].image instanceof Array ? (
                                <Image priority={true} src={data.post[index].image[0]} layout="fill" objectFit="cover" />
                            ) : (
                                <Image priority={true} src={data.post[index].image} layout="fill" objectFit="cover" />
                            )}
                        </div>
                        <div className="p-4">
                            <div className=" flex flex-col">
                                <div className="flex items-center gap-2">
                                    <div className="p-1">
                                        <AiOutlineHeart size={25} className="hover:cursor-pointer" />
                                    </div>

                                    <div className="p-1 py-2">
                                        <AiOutlineMessage size={25} className="hover:cursor-pointer" />
                                    </div>

                                    <div className="p-1 py-2">
                                        <IoPaperPlaneOutline size={25} className="hover:cursor-pointer" />
                                    </div>
                                </div>
                                <span className="pl-1">
                                    <b>2,443 likes</b>
                                </span>
                                <span className="pl-1 text-gray-500">View all 8 comments</span>
                                <span className="pl-1 text-gray-500">2 days ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-28 ">
                        <button className="bg-blue-500 px-6 py-4  rounded text-white " onClick={() => dispatch(openComments())}>
                            View comments
                        </button>
                    </div>
                </div>
            </div>
            {/*mobile comments*/}
            <div
                className={`absolute top-0 h-[95vh]  ${
                    comments === true ? ` left-0 ` : `left-[-100%] `
                } bg-black bg-opacity-70 z-50 overflow-hidden hidden phone:block animation w-full drop-shadow-2xl`}
            >
                <div className="bg-white top w-full flex border-solid border-b border-gray-300 ">
                    <div className="w-[10vh] flex items-center justify-center">
                        <BsChevronLeft size={20} onClick={() => dispatch(closeComments())} />
                    </div>
                    <div className=" w-full flex items-center justify-center font-medium">Comments</div>
                    <div className="w-[10vh] "></div>
                </div>
                <div className="bg-white middle w-full overflow-y-scroll ">
                    <div className="">
                        <div className="p-4  overflow-y-scroll h-[90vh] overflow-hidden">
                            {data.post[index].comments?.map((key: any, index: number) => {
                                return (
                                    <div key={index} className="gap-2 w-full user_card_mobile">
                                        <div className="image">
                                            <div className="h-[44px] w-[44px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full grid place-items-center ">
                                                <div className="relative h-[40px] w-[40px] grid place-items-center  rounded-full overflow-hidden bg-blue-500  border-2 border-gray-50 border-solid ">
                                                    <Image src={key.userimage} layout="fill" objectFit="cover" priority />
                                                </div>
                                            </div>
                                        </div>
                                        <p className=" w-full text-left gap-2 paragraph ">
                                            <b className="mr-2">{key.username}</b>
                                            {key.comment}
                                        </p>
                                        <div className="flex justify-center items-center button">
                                            <AiOutlineHeart size={14} className="hover:cursor-pointer" />
                                        </div>
                                        <div className="flex   gap-2 col-span-4 text-sm text-gray-500 post">
                                            <span>{key.posted}</span>
                                            <span>{key.likes} likes</span>
                                            <span>Reply</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
