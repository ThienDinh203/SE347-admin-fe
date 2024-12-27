import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../../context/UserContext";
function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBooks = async () => {
      console.log(user)
      const apiUrl = "http://localhost:8080/api/sach/getallsach";
      try {
        const response = await Axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setProducts([]);
      }
    }

    fetchBooks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.tieuDe.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="m-8">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <h1 className="text-2xl font-medium">Sản phẩm</h1>
        <a href="/san-pham/them-sp">
          <button className="px-4 py-2 bg-blue-700 text-white rounded-md block w-full order-0 sm:order-1 sm:ml-3">
            Thêm sản phẩm
          </button>
        </a>
      </div>

      <div className="mx-auto">
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
            className="appearance-none w-full p-2 pl-10"
            placeholder="Tìm kiếm sản phẩm"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6 -mx-4 -my-5 sm:-mx-6">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="border-t border-slate-200 bg-slate-50">
            <tr>
              <th
                scope="col"
                className="relative text-sm w-12 px-6 sm:w-16 sm:px-8"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-left text-sm tracking-wide"
              >
                Tên
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-left text-sm tracking-wide"
              >
                Tác giả
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-center text-sm tracking-wide"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="pl-3 pr-4 py-4 text-left text-sm tracking-wide sm:pr-6"
              >
                Số lượng
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredProducts.map((product, index) => (
              <tr
                key={index}
                onClick={() => window.location.href = `/san-pham/${product.id}`}
                className=" hover:bg-sky-300 h-12"
              >
                <td className="relative text-sm w-12 px-6 sm:w-16 sm:px-8">
                  {product.id}
                </td>
                <td className="px-3 py-4 text-left text-sm tracking-wide">
                  {product.tieuDe}
                </td>
                <td className="px-3 py-4 text-left text-sm tracking-wide">
                  {product.tacGiaDTO && product.tacGiaDTO.tenTacGia
                    ? product.tacGiaDTO.tenTacGia
                    : "Không có tác giả"}
                </td>
                <td className="px-3 py-4 text-center text-sm tracking-wide">
                  {product.soLuong > 0 ? "Còn hàng" : "Hết hàng"}
                </td>
                <td className="pl-3 pr-4 py-4 text-left text-sm tracking-wide sm:pr-6">
                  {product.soLuong}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
