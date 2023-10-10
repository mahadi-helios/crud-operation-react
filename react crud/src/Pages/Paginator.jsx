import React, { useState } from 'react';

const Paginator = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Determine the range of page numbers to display (e.g., 1 to 10)
    const startPage = Math.max(1, currentPage - 2); 
    const endPage = Math.min(totalPages, startPage + 4); 

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button className={`page-link ${i === currentPage ? 'active' : ''}`} onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={handlePrevious}>Previous</button>
      </li>
      {renderPageNumbers()}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={handleNext}>Next</button>
      </li>
    </ul>
  );
};

export default Paginator;
