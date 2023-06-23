"use client"

import { faSliders, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface SearchBarProps {
    input: {
        search: string,
        filter: string;
    }
    props: {
        value?: string;
        filter?: string;
        redirect?: string;
    }
}

const SearchBar = ({ value, filter, redirect }: SearchBarProps['props']) => {
    const router = useRouter()
    const [input, setInput] = useState<SearchBarProps['input']>({
        search: value || "",
        filter: filter || "title"
    })

    const [settings, setSettings] = useState<boolean>(false)

    const isRadioSelected = (value: string): boolean => {
        return input.filter === value
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value.toString()
        })
    }

    const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            filter: e.currentTarget.value
        })
    }

    const deleteInput = () => {
        setInput({
            ...input,
            search: ""
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        redirect ? router.push(`/${redirect}?search=${input.search}&filter=${input.filter}`)
            : router.push(`/?search=${input.search}&filter=${input.filter}`)
    }

    return (
        <form action=""
            onSubmit={handleSubmit}
            className="">
            <div className="flex gap-1 items-center align-middle bg-white border-2 drop-shadow-sm w-full px-3 rounded-lg">
                <input
                    type={'search'}
                    className="py-2 w-full focus:outline-none active:outline-none"
                    name="search"
                    id="search"
                    onChange={handleChange}
                    value={input.search}
                    placeholder="Search"
                />
                {
                    input.search.length !== 0 ?
                        <button
                            className="flex justify-center items-center align-middle w-5"
                            type={'button'}
                            onClick={deleteInput}
                        >
                            <FontAwesomeIcon className="" icon={faXmark} />
                        </button>
                        : null
                }
            </div>
            <div className="flex flex-col gap-3 border-b border-gray-300 py-3">
                <button
                    type={'button'}
                    className="flex w-min"
                    onClick={() => setSettings(!settings)}
                >
                    <div className="flex gap-2 hover:bg-gray-200 rounded-2xl cursor-pointer px-3 py-1">
                        <h1 className="font-medium">Filters</h1>
                        <div className="">
                            <FontAwesomeIcon icon={faSliders} />
                        </div>
                    </div>
                </button>
                {
                    settings ?
                        <fieldset className="flex gap-3">
                            <div className="flex gap-1">
                                <input
                                    type={'radio'}
                                    id="title"
                                    name="filter"
                                    value={'title'}
                                    checked={isRadioSelected('title')}
                                    onChange={handleRadioClick}
                                />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="flex gap-1">
                                <input
                                    type={'radio'}
                                    id="author"
                                    name="filter"
                                    value={'author'}
                                    checked={isRadioSelected('author')}
                                    onChange={handleRadioClick}
                                />
                                <label htmlFor="author">Author</label>
                            </div>
                            <div className="flex gap-1">
                                <input
                                    type={'radio'}
                                    id="year"
                                    name="filter"
                                    value={'year'}
                                    checked={isRadioSelected('year')}
                                    onChange={handleRadioClick}
                                />
                                <label htmlFor="year">Year</label>
                            </div>
                            <div className="flex gap-1">
                                <input
                                    type={'radio'}
                                    id="genre"
                                    name="filter"
                                    value={'tags'}
                                    checked={isRadioSelected('tags')}
                                    onChange={handleRadioClick}
                                />
                                <label htmlFor="genre">Genre</label>
                            </div>
                        </fieldset>
                        : null
                }
            </div>
        </form>
    )
}

export default SearchBar
