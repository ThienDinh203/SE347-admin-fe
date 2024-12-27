import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
function Author() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchTacGia() {
      fetch("http://localhost:8080/api/tacgia/getalltacgia", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setProducts(data);
        });
    }
    fetchTacGia();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAuthors = products.filter(author =>
    author.tenTacGia.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div >
      <div className="px-6">
        <h1 className="text-2xl font-medium">Tác giả</h1>
        <a href="/tac-gia/create">
          <button className="px-4 py-2 bg-blue-700 text-white rounded-md mt-3 ">
            Thêm tác giả
          </button>
        </a>
      </div>

      <div className="p-6">
        <div className="shadow-sm ring-1">
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
              className="p-2 pl-10 rounded-md"
              placeholder="Tìm kiếm tác giả"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="px-4 py-5 -mx-4 -my-5">
          <table className="min-w-full border">
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
                  Tên
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
              {filteredAuthors.map((author, index) => (
                <tr
                  key={index}
                  onClick={() => window.location.href = `/tac-gia/${author.id}`}
                  className=" hover:bg-sky-300 h-12"
                >
                  <td
                    className="px-3 py-4 text-center">
                    {author.id}
                  </td>
                  <td className="px-3 py-4">
                    {author.tenTacGia}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {author.soLuongSach}
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

export default Author;
