import React from 'react'

const PrevButton = ({ page, setPage, totalPages }) => {
  return (
  <div className="flex justify-center items-center gap-4 mt-6">
  <button
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
    className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 transition duration-200"
  >
    Prev
  </button>

  <span className="text-gray-700 font-medium">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
    className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 transition duration-200"
  >
    Next
  </button>
</div>

  )
}

export default PrevButton
