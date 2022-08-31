import type { NextPage } from "next";
import Image from "next/image";
import { AiFillFacebook } from "react-icons/ai";
import Link from "next/link";
import { useState, useEffect } from "react";

const Login: NextPage = () => {
    const [data, setData] = useState({
        text: "",
        password: "",
    });

    const [disabled, setDisableText] = useState(true);

    const input = (e: React.FormEvent<HTMLInputElement>) => {
        console.log;
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const submit = (e: any) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (data.text.length > 1 && 1 && data.password.length > 1) {
            setDisableText(false);
        } else {
            setDisableText(true);
        }
    }, [data]);
    return (
        <div className="bg-gray-50 w-screen h-screen phone_landscape:h-full  flex flex-col items-center justify-center  text-xs p-10 gap-5 phone:overflow-y-scroll phone:overflow-x-hidden text-white">
            <form className="bg-white w-80 border-solid border border-gray-300 flex flex-col p-10 gap-2 phone:bg-transparent phone:border-none">
                <div className="relative h-12 w-full mb-4">
                    <Image src="/instagram.png" layout="fill" objectFit="contain" quality={100} />
                </div>
                <input
                    className="bg-gray-50 p-2 border border-gray-300 rounded-sm text-gray-600 focus:bg-gray-50 focus:border-blue-500 transition-colors"
                    type="text"
                    name="text"
                    placeholder="Username or email"
                    onChange={input}
                    value={data.text}
                    autoComplete="off"
                />
                <input
                    className="bg-gray-50 p-2 border border-gray-300 rounded-sm text-gray-600 focus:bg-gray-50 focus:border-blue-500 transition-colors"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={input}
                    value={data.password}
                    autoComplete="off"
                />
                <button
                    onClick={submit}
                    disabled={disabled}
                    className={`${
                        disabled ? `bg-blue-200 hover:cursor-not-allowed` : `bg-blue-500 hover:cursor-pointer`
                    } p-2 rounded transition-colors`}
                >
                    Login
                </button>
                <div className="flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="p-2 rounded mt-2 mb-2 flex items-center justify-center ">
                    <div className="inline-flex items-center justify-center gap-1 w-auto hover:cursor-pointer">
                        <AiFillFacebook size={20} color="#3b83f6" />
                        <span className="text-blue-500">Login with facebook</span>
                    </div>
                </div>
                <span className="text-black text-center hover:cursor-pointer">Forgot Password?</span>
            </form>
            <div className="bg-white phone:bg-transparent phone:border-none w-80 p-6 border-solid border border-gray-300 flex justify-center">
                <span className="text-black text-center">
                    <Link href="/register">
                        <span className="text-blue-400 hover:cursor-pointer">Sign up</span>
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Login;
