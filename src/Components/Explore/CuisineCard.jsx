import React from "react";
import { Link } from "react-router-dom";
export default function CuisineCard({ id, src, title }) {
    return (
        <>
            <div className="relative  m-3 w-[90%]    ">
                <img
                    src={src}
                    alt=""
                    className=" opacity-70 rounded-xl hover:brightness-75 cursor-pointer duration-300 delay-300 w-full"
                />
                <Link to={`/detail/${id}`}>
                    <h1 className="absolute bg-black/80 px-7 hover:text-2xl delay-150 duration-150 py-3 bottom-0 text-xl w-full ">
                        {title}
                    </h1>
                </Link>
            </div>
        </>
    );
}
