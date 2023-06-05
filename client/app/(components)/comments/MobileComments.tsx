"use client"

import { useState } from "react"
import { CommentsProps } from "./Comments"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import AddComments from "./AddComments"
import Image from "next/image"
import Comment from "./Comment"
import UserIcon from "../user-icons/UserIcon"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function MobileComments({ comments, bookId }: CommentsProps) {
    const { user, error, isLoading } = useUser()
    const [mobileComments, setMobileComments] = useState<boolean>(false)

    return (
        <>
            {
                mobileComments ?

                    <>
                        <div
                            onClick={() => setMobileComments(false)}
                            className="fixed lg:hidden inset-0 bg-black/60 z-30"></div>
                        <div className="fixed lg:hidden bottom-0 top-[20rem] inset-x-0 bg-gray-200 z-40 flex flex-col gap-3 max-w-none lg:max-w-xl transition-all">
                            <div className='grid grid-cols-2 items-center px-3 py-5 bg-gray-100 border-b border-gray-400 text-lg'>
                                <h1 className="font-bold">
                                    Comments
                                </h1>
                                <button
                                    onClick={() => setMobileComments(false)}
                                    className="justify-self-end"
                                >
                                    <FontAwesomeIcon className="" icon={faXmark} />
                                </button>
                            </div>
                            {
                                comments ?
                                    <div className="flex flex-col gap-3 overflow-y-auto pb-20">
                                        {
                                            comments.map((comment, index) => {
                                                return (
                                                    <Comment key={`${index}-comment`} comment={comment} />
                                                )
                                            })
                                        }
                                    </div> : null
                            }
                            <div className="fixed bg-gray-100 border-t border-gray-400 bottom-0 inset-x-0 pb-3">
                                <AddComments bookId={bookId} />
                            </div>
                        </div>
                    </> :
                    <div
                        onClick={() => setMobileComments(true)}
                        className="bg-gray-200 hover:bg-gray-300 active:bg-gray-300 active:border active:border-white flex flex-col md:hidden max-w-none lg:max-w-xl rounded-lg transition-all cursor-pointer"
                    >
                        <h1 className='p-3 -mb-2 font-bold text-base'>
                            Comments <span className="font-medium">{comments?.length}</span>
                        </h1>
                        {
                            comments && comments.length !== 0 ?
                                <div className="flex md:hidden items-center gap-3 px-3 pb-3">
                                    <div className="">
                                        <Image
                                            className="w-10 rounded-full"
                                            width={200}
                                            height={200}
                                            src={comments[0].author.profilePicture}
                                            alt="User profile picture"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <p>
                                            {
                                                comments[0].comment
                                            }
                                        </p>
                                    </div>
                                </div> :
                                <div className="flex items-center gap-3 px-3 pb-3">
                                    <UserIcon auth={user ? true : false} picture={user?.picture} link={null} />
                                    <div className="w-full border-b border-black">
                                        <p>
                                            Add a comment
                                        </p>
                                    </div>
                                </div>
                        }
                    </div>
            }
        </>
    )
}