import Navbar from "./navbar";
import Post from "./post";
import BottomNav from "./bottomnav";
import { useRouter } from "next/router";
import {  useRef } from "react";
import { storiesCount } from "../store/slice";
import { useDispatch } from "react-redux";

export default function Layout({ children }: any) {
    const router = useRouter();
    const ref = useRef<HTMLHeadingElement>(null);
    const dispatch = useDispatch();
    const scrolls = () => {
        if (ref.current != undefined) {
            if (ref.current?.scrollTop + ref.current?.clientHeight >= ref.current?.scrollHeight - 600) {
                dispatch(storiesCount(5));
            }
        }
    };
    if (router.pathname === "/login" || router.pathname === "/register") {
        return <>{children}</>;
    } else {
        return (
            <div className="relative h-screen bg-yellow-600 overflow-hidden overflow-x-hidden">
                <div ref={ref} className=" relative w-screen h-screen overflow-y-scroll overflow-x-hidden phone:h-[95vh]" onScroll={scrolls}>
                    <Navbar />
                    <div className="w-screen  bg-gray-100 overflow-x-hidden">{children}</div>
                </div>
                <Post />
                <BottomNav />
            </div>
        );
    }
}
