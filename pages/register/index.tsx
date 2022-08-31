import type { NextPage } from "next";
import Image from "next/image";
import { AiFillFacebook } from "react-icons/ai";
import Link from "next/link";
import { useState, useEffect } from "react";

const Register: NextPage = () => {
    const [data, setData] = useState({
        text: "",
        full_name: "",
        username: "",
        password: "",
    });

    const [errorText, setErrorText] = useState("hello");
    const [errorHidden, setErrorHidden] = useState(true);

    const [disabled, setDisableText] = useState(true);

    const input = (e: React.FormEvent<HTMLInputElement>) => {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const submit = (e: any) => {
        e.preventDefault();
        if (data.password.length <= 6) {
            setErrorHidden(false);
            setErrorText("Password is too weak (7 characters or more)");
        }
        if (!data.text.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/)) {
            setErrorHidden(false);
            setErrorText("The email you've entered is invalid");
        }
    };

    useEffect(() => {
        if (data.text.length > 1 && data.full_name.length > 1 && data.username.length > 1 && data.password.length > 1) {
            setDisableText(false);
        } else {
            setDisableText(true);
        }
    }, [data]);
    return (
        <div className="bg-gray-50  w-screen h-screen flex flex-col items-center lg:justify-center text-xs p-10 gap-5 phone:overflow-y-hidden overflow-x-hidden text-white">
            <form className="bg-white  w-80 border-solid border border-gray-300 flex flex-col p-10 phone:py-1 gap-2 phone:bg-transparent phone:border-none ">
                <div className="relative h-12 w-full">
                    <Image src="/instagram.png" layout="fill" objectFit="contain" quality={100} />
                </div>
                <h1 className="text-gray-400 text-center text-base font-medium">Sign up to see photos and videos from your friends</h1>
                <button className="bg-blue-500 p-2 rounded mt-2 mb-2 flex items-center justify-center gap-1">
                    <AiFillFacebook size={20} />
                    <span>Login with facebook</span>
                </button>
                <div className="flex py-2 phone:py1 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <input
                    className="bg-gray-50 p-2 border border-gray-300 rounded-sm text-gray-600 focus:bg-gray-50 focus:border-blue-500 transition-colors"
                    type="text"
                    name="text"
                    placeholder="Email"
                    onChange={input}
                    value={data.text}
                    autoComplete="off"
                />
                <input
                    className="bg-gray-50 p-2 border border-gray-300 rounded-sm text-gray-600 focus:bg-gray-50 focus:border-blue-500 transition-colors"
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    onChange={input}
                    value={data.full_name}
                    autoComplete="off"
                />
                <input
                    className="bg-gray-50 p-2 border border-gray-300 rounded-sm text-gray-600 focus:bg-gray-50 focus:border-blue-500 transition-colors"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={input}
                    value={data.username}
                    autoComplete="off"
                />
                <input
                    className="bg-gray-50 p-2 border border-gray-300 rounded-sm text-gray-600 focus:bg-gray-50 focus:border-blue-500 transition-colors"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={input}
                    value={data.password}
                    autoComplete="off"
                />
                <p className="text-gray-400 text-center p-1">
                    People who use our service may have uploaded your contact information to Instagram.{" "}
                    <span className="text-gray-500 hover:cursor-pointer">Learn More</span>
                </p>
                <p className="text-gray-400 text-center  p-1">
                    By signing up, you agree to our{" "}
                    <span className="text-gray-500 hover:cursor-pointer">Terms , Privacy Policy and Cookies Policy</span>.
                </p>
                <button
                    onClick={submit}
                    disabled={disabled}
                    className={`${
                        disabled ? `bg-blue-200 hover:cursor-not-allowed` : `bg-blue-500 hover:cursor-pointer`
                    } p-2 rounded transition-colors`}
                >
                    Sign up
                </button>
                <span className={`text-rose-400 text-center p-2 ${errorHidden ? `hidden` : `block`}`}>{errorText}</span>
            </form>
            <div className="bg-white w-80 p-6 phone:py-1 border-solid border border-gray-300 flex justify-center phone:bg-transparent phone:border-none">
                <span className="text-black text-center">
                    Have an account?{" "}
                    <Link href="/login">
                        <span className="text-blue-400 hover:cursor-pointer">Login</span>
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Register;
