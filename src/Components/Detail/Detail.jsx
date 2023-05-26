import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Footer from "../Footer";
import Loader from "../Loader";
export default function Detail() {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: [id],
        queryFn: () => {
            return axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
                    import.meta.env.VITE_REACT_APP_API_KEY
                }`
            );
        },
        select: (data) => {
            return data.data;
        },
    });
    console.log(data);
    return (
        <>
            {isLoading && <Loader />}
            {isError && (
                <div className="absolute inset-[40%] top-[50%] left-[47%]  w-[10%] ">
                    <h1 className=" text-2xl h-full text-red-400">
                        App Crash!
                    </h1>
                </div>
            )}
            <div className="w-2/3   m-auto lg:my-6 text-white">
                <div className="flex flex-col lg:flex-row items-center lg:gap-32 gap-5 ">
                    <div className="">
                        <h1 className="text-3xl text-center my-4">
                            {data?.title}
                        </h1>
                        <img src={data?.image} alt="" className="rounded-lg " />
                    </div>
                    <div className="">
                        <h1 className="md:text-4xl  text-3xl ">
                            {" "}
                            {isLoading || isError ? "" : "Ingredients"}{" "}
                        </h1>
                        <div className="">
                            <ul className="lg:text-3xl md:text-2xl text-xl">
                                {data?.extendedIngredients.map((item) => {
                                    return (
                                        <Fragment key={item.id}>
                                            <li className="lg:my-4 my-2 list-disc text-xl ">
                                                {item.name}{" "}
                                                {item.measures.metric.amount}{" "}
                                                {item.measures.metric.unitShort}
                                            </li>
                                        </Fragment>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lg:my-4">
                    <div className="instruction lg:my-16 mt-6 md:my-8">
                        <h1 className="md:text-4xl text-2xl ">
                            {" "}
                            {isLoading || isError ? "" : "Instructions"}{" "}
                        </h1>

                        <h1
                            className="md:text-xl text-zinc-200/70  text-xl mt-4"
                            dangerouslySetInnerHTML={{
                                __html: data?.instructions,
                            }}
                        ></h1>
                    </div>
                    <div className="summary  mt-6">
                        <h1 className="md:text-4xl text-2xl ">
                            {" "}
                            {isLoading || isError ? "" : "Summary"}{" "}
                        </h1>
                        <h1
                            className="md:text-xl text-zinc-200/70  text-xl mt-4"
                            dangerouslySetInnerHTML={{ __html: data?.summary }}
                        ></h1>
                    </div>
                </div>
            </div>
        </>
    );
}
