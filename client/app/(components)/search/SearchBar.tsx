"use client"

import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface SearchBarProps {
    input: {
        search: string,
        filter: string;
    }
    props: {
        value?: string;
        filter?: string
    }
}

const SearchBar = ({ value, filter }: SearchBarProps['props']) => {
    const [input, setInput] = useState<SearchBarProps['input']>({
        search: value || "",
        filter: filter || "title"
    })

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
            search: "",
            filter: ""
        })
    }

    return (
        <form action=""
            className="">
            <div className="flex gap-1 items-center align-middle bg-white border-2 drop-shadow-sm w-full px-3 rounded-lg">
                <input
                    type={'search'}
                    className="py-2 w-full focus:outline-none active:outline-none"
                    name="search"
                    id="search"
                    onChange={handleChange}
                    value={input.search}
                    placeholder="Search..."
                />
                {
                    input.search.length !== 0 ?
                        <button
                            className="flex justify-center items-center align-middle w-5"
                            type={'button'}
                            onClick={deleteInput}
                        >
                            <FontAwesomeIcon className="" icon={faX} />
                        </button>
                        : null
                }
            </div>
            <fieldset className="flex gap-3">
                <div className="">
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
                <div className="">
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
                <div className="">
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
                <div className="">
                    <input
                        type={'radio'}
                        id="tags"
                        name="filter"
                        value={'tags'}
                        checked={isRadioSelected('tags')}
                        onChange={handleRadioClick}
                    />
                    <label htmlFor="tags">Tags</label>
                </div>
            </fieldset>
        </form>
    )
}

export default SearchBar
