import React from 'react'
import { Link } from '@inertiajs/react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

export default function Pagination({
    totalPages,
    totalData,
    totalShowedData,
    dataLabel = 'data',
    queryString,
    currentPage,
}: {
    totalData: number
    totalPages: number
    totalShowedData: number
    dataLabel: string
    queryString?: string
    currentPage: number
}) {
    function getPaginationButtons() {
        const buttons = []

        if (totalPages < 2) {
            return
        }

        if (currentPage > 1) {
            buttons.push(
                <Button
                    queryString={queryString}
                    key="chevron-left"
                    page={currentPage - 1}
                >
                    <BiChevronLeft />
                </Button>
            )
        }

        const maxVisibleButtons = 5
        const halfVisibleButtons = Math.floor(maxVisibleButtons / 2)

        if (totalPages <= maxVisibleButtons) {
            for (let page = 1; page <= totalPages; page++) {
                buttons.push(
                    <Button
                        queryString={queryString}
                        key={page}
                        page={page}
                        isActive={page === currentPage}
                    >
                        {page}
                    </Button>
                )
            }
        } else {
            const startPage = Math.max(1, currentPage - halfVisibleButtons)
            const endPage = Math.min(
                totalPages,
                startPage + maxVisibleButtons - 1
            )

            if (startPage > 1) {
                buttons.push(
                    <div
                        key="ellipsis-left"
                        className="grid place-items-center w-9 aspect-square mx-1 text-gray-500"
                    >
                        ...
                    </div>
                )
            }

            for (let page = startPage; page <= endPage; page++) {
                buttons.push(
                    <Button
                        queryString={queryString}
                        key={page}
                        page={page}
                        isActive={page === currentPage}
                    >
                        {page}
                    </Button>
                )
            }

            if (endPage < totalPages) {
                buttons.push(
                    <div
                        key="ellipsis-right"
                        className="grid place-items-center w-9 aspect-square mx-1 text-gray-500"
                    >
                        ...
                    </div>
                )
            }
        }

        // Add the right chevron button
        if (currentPage < totalPages) {
            buttons.push(
                <Button
                    queryString={queryString}
                    key="chevron-right"
                    page={currentPage + 1}
                >
                    <BiChevronRight />
                </Button>
            )
        }

        return buttons
    }

    return (
        <div className="w-full h-auto px-3 py-4 flex flex-col lg:flex-row justify-between lg:items-center gap-3">
            <span className="font-medium text-xs lg:text-sm text-stone-700">
                Menampilkan {totalShowedData} dari {totalData} {dataLabel} pada
                halaman {currentPage}
            </span>
            <div className="flex w-full lg:w-fit justify-end">
                {getPaginationButtons()}
            </div>
        </div>
    )
}

function Button({
    page,
    isActive,
    children,
    queryString,
}: {
    page: number
    isActive?: boolean
    children: React.ReactNode
    queryString?: string
}) {
    const activeClass = isActive
        ? 'bg-blue-500 text-white'
        : 'bg-white text-blue-500'

    return (
        <Link
            href={`?${queryString ? `${queryString}&` : ''}page=${page}`}
            className={`w-7 lg:w-9 text-sm lg:text-base grid place-items-center aspect-square mx-1 border rounded cursor-pointer ${activeClass}`}
        >
            {children}
        </Link>
    )
}
