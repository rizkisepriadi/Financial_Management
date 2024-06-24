// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center space-x-16">
      <button
        className={`text-gray-500 ${
          currentPage === 1 ? "cursor-not-allowed" : "hover:text-black"
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt; Previous
      </button>
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`w-3 h-3 rounded-full ${
              currentPage === index + 1 ? "bg-blue-500" : "bg-gray-300"
            } focus:outline-none`}
            onClick={() => onPageChange(index + 1)}
          />
        ))}
      </div>
      <button
        className={`text-gray-500 ${
          currentPage === totalPages ? "cursor-not-allowed" : "hover:text-black"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
