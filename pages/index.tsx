import type { NextPage } from "next";
import Image from "next/image";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsEmojiSmile, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import users from "../user.json";
import Link from "next/link";
import { getId } from "../store/slice";

const Feeds: NextPage = () => {
    const stories = useSelector((state: RootState) => state.redux.storiesTotal);
    const dispatch = useDispatch();

    const [images, setImage] = useState([
        ["/users/user_1.jpg", "marko107"],
        ["/users/user_2.jpg", " bossladysamantha"],
        ["/users/user_3.jpg", "jamilhenry"],
        ["/users/user_4.jpg", "Karenbecker500"],
        ["/users/user_5.jpg", "Luciex"],
        ["/users/user_6.jpg", "Macy16"],
        ["/users/user_7.jpg", "Lisa"],
        ["/users/user_8.jpg", "Jackhammo"],
        ["/users/user_5.jpg", "Luciex"],
        ["/users/user_6.jpg", "Macy16"],
        ["/users/user_7.jpg", "Lisa"],
        ["/users/user_8.jpg", "Jackhammo"],
    ]);
    const ref = useRef<HTMLHeadingElement>(null);
    const [post, setPost] = useState<any>(users);
    const [increment, setIncrement] = useState(0);

    const element = (num: number) => {
        if (increment < 259 && num < 0) {
            setIncrement(0);
            if (ref.current != undefined) {
                ref.current.scrollTo({
                    left: 0,
                    behavior: "smooth",
                });
            }
        } else {
            setIncrement(increment + num);
            let sum = increment + num;
            if (ref.current != undefined) {
                if (sum >= ref.current?.scrollWidth) {
                    setIncrement(ref.current?.scrollWidth - num);
                    return;
                } else {
                    ref.current.scrollTo({
                        left: sum,
                        behavior: "smooth",
                    });
                }
            }
        }
    };

    const viewPost = (key: any) => {
        console.log(key.id);
    };

    const viewProfile = (key: any) => {
        console.log(key.id);
        dispatch(getId(key.id));
    };

    return (
        <div className="p-5  flex items-center flex-col gap-5 phone:p-0 phone:pt-5 phone:pb-5 phone:overflow-scroll overflow-x-hidden">
            <div
                id="stories"
                className=" sm:border-solid sm:border sm:border-gray-300 sm:rounded-md  bg-white  sm:max-w-[500px] w-[500px] overflow-hiddenbg-white relative phone:w-full phone:bg-transparent"
            >
                <button
                    className={`phone:hidden rounded-full bg-gray-100  p-1 hover:cursor-pointer absolute left-2 top-[40%] z-40 grid place-items-center drop-shadow-lg border-solid border border-gray-300 `}
                    onClick={() => {
                        element(-360);
                    }}
                >
                    <BsChevronLeft size={15} className="text-gray-900" />
                </button>

                <button
                    className="phone:hidden rounded-full bg-gray-100  p-1 hover:cursor-pointer absolute right-2 top-[40%] z-40 grid place-items-center drop-shadow-lg border-solid border border-gray-300"
                    onClick={() => {
                        element(360);
                    }}
                >
                    <BsChevronRight size={15} className="text-gray-900" />
                </button>
                <div ref={ref} className="flex overflow-hidden h-[100px] phone:overflow-scroll">
                    {images.map((key: any, index: number) => {
                        return (
                            <div key={index} className="p-4 text-ellipsis w-[88px] ">
                                <div className="h-[60px] w-[60px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full grid place-items-center hover:cursor-pointer">
                                    <div className="relative h-[56px] w-[56px] grid place-items-center  rounded-full overflow-hidden bg-blue-500  border-2 border-gray-50 border-solid ">
                                        <Image src={key[0]} layout="fill" objectFit="cover" />
                                    </div>
                                </div>
                                <p className="text-ellipsis overflow-hidden text-center">{key[1]}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/*post container*/}
            {post
                .map((key: any) => {
                    return key.post.map((index: any) => {
                        return index;
                    });
                })
                .reduce((pre: any, curr: any) => {
                    return pre.concat(curr);
                })
                .sort((a: any, b: any) => {
                    return a.timestamp - b.timestamp;
                })
                .filter((key: any, index: any) => {
                    return index < stories;
                })
                .map((key: any, index: any) => {
                    if (key.timestamp === 99 || key.image instanceof Array) {
                        return;
                    } else {
                        return (
                            <div
                                key={index}
                                className="bg-white border-solid border border-gray-300 sm:rounded-md h-max phone:w-full overflow-hidden"
                            >
                                <div className="flex gap-5 w-full p-2">
                                    <div className="grid place-items-center">
                                        <Link
                                            href={{
                                                pathname:
                                                    "/profile/" +
                                                    post.find((res: any) => {
                                                        return res.id === key.id;
                                                    }).username,
                                            }}
                                        >
                                            <div
                                                onClick={() => viewProfile(key)}
                                                className="hover:cursor-pointer h-[44px] w-[44px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full grid place-items-center "
                                            >
                                                <div className="relative h-[40px] w-[40px] grid place-items-center  rounded-full overflow-hidden bg-blue-500  border-2 border-gray-50 border-solid ">
                                                    <Image
                                                        src={
                                                            post.find((res: any) => {
                                                                return res.id === key.id;
                                                            }).userimage
                                                        }
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="w-full flex flex-col justify-center gap-2 col-span-5">
                                        <div className="flex gap-4 justify-center">
                                            <div className="flex w-full gap-2">
                                                <span className="font-medium">
                                                    {
                                                        post.find((res: any) => {
                                                            return res.id === key.id;
                                                        }).username
                                                    }
                                                </span>
                                                <span className="font-bold">Following</span>
                                            </div>

                                            <div className="flex justify-center items-center w-16">
                                                <BiDotsHorizontalRounded />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-black h-[500px] w-[500px] relative phone:w-full phone:h-[400px]">
                                    <Image src={key.image} layout="fill" objectFit="cover" />
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
                                            <b>likes</b>
                                        </span>
                                        <span
                                            className="pl-1 text-gray-500 hover:cursor-pointer"
                                            onClick={() => viewPost(key)}
                                        >{`View all  comments`}</span>
                                        <span className="pl-1 text-gray-500">2 days ago</span>
                                    </div>
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
                        );
                    }
                })}
        </div>
    );
};

export default Feeds;
