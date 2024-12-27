import { useState, useEffect } from "react";
function Category() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      await fetch("http://localhost:8080/api/danhmuc/getalldanhmuc")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCategory(data);
        });
    }
    fetchProducts();
  }, []);

  return (
    <div className="m-8">
      <div className="px-4 flex">
        <h1 className="text-2xl font-medium">Danh mục</h1>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <a href="/danh-muc/them" className="px-4 py-2 bg-blue-700 text-white rounded-md block w-full order-0 sm:order-1 sm:ml-3">
            Thêm danh mục
          </a>
        </div>
      </div>

      <div className="p-4">
        <div className="py-5">
          <div className="relative max-w-sm">
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
              placeholder="Tìm kiếm danh mục"
            />
          </div>
        </div>
        <div className="py-5">
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
                  Tên danh mục
                </th>
                <th
                  scope="col"
                  className="px-3 py-4"
                >
                  Số lượng sách
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">

              {category.map((category, index) => (
                <tr
                  key={index}
                  onClick={() => window.location.href = `/danh-muc/${category.id}`}
                  className=" hover:bg-sky-300 h-12"
                >
                  <td
                    className="px-3 py-4 text-center">
                    {category.id}
                  </td>
                  <td className="px-3 py-4">
                    {category.tenDanhMuc}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {category.soLuongSach}
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

export default Category;
