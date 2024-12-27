import React, { useState, useEffect } from 'react';

function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchFeedbacks() {
      fetch("http://localhost:8080/api/feedback/laytatcafeedback")
        .then((response) => response.json())
        .then((data) => {
          setFeedbacks(data);
        });
    }

    async function fetchBooks() {
      fetch("http://localhost:8080/api/sach/getallsach")
        .then((response) => response.json())
        .then((data) => {
          setBooks(data);
        });
    }

    fetchFeedbacks();
    fetchBooks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.tenTaiKhoan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.noiDung.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBookTitleById = (id) => {
    const book = books.find(book => book.id === id);
    return book ? book.tieuDe : 'Unknown';
  };

  return (
    <div className="m-8">
      <div className="px-4">
        <h1 className="text-2xl font-medium">Quản lý phản hồi</h1>
      </div>

      <div>
        <div className="py-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </div>
            <input
              className="w-full border p-2 pl-10"
              placeholder="Tìm kiếm phản hồi"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="px-4 -mx-4 -my-5">
          <table className="min-w-full">
            <thead className="border-t">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-4"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-4"
                >
                  Tên tài khoản
                </th>
                <th
                  scope="col"
                  className="px-3 py-4"
                >
                  Sách
                </th>
                <th
                  scope="col"
                  className="px-3 py-4"
                >
                  Nội dung
                </th>
                <th
                  scope="col"
                  className="px-3 py-4"
                >
                  Số sao
                </th>
                <th
                  scope="col"
                  className="px-3 py-4"
                >
                  Ngày feedback
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredFeedbacks.map((feedback, index) => (
                <tr
                  key={index}
                  className="h-12"
                >
                  <td
                    className="px-3 py-4 text-center">
                    {feedback.id}
                  </td>
                  <td className="px-3 py-4">
                    {feedback.tenTaiKhoan}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {feedback.sachName}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {feedback.noiDung}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {feedback.soSao}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {new Date(feedback.ngayFeedback).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FeedbackManagement;
