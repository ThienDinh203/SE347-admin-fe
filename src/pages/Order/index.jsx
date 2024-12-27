import React, { useState, useEffect } from 'react';

function Order() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      fetch("http://localhost:8080/api/donhang/getalldonhang")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setOrders(data);
        });
    }
    fetchOrders();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.tenNguoiNhan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="m-8">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-medium">Đơn hàng</h1>
        </div>
      </div>

      <div className="p-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm ring-1 ring-slate-200 rounded-md sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
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
                className="appearance-none w-full border border-slate-300 p-2 pl-10 rounded-md disabled:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tìm kiếm đơn hàng"
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
                    Ngày đặt
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4"
                  >
                    Tên người nhận
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4"
                  >
                    Số điện thoại
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4"
                  >
                    Địa chỉ
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4"
                  >
                    Tổng tiền
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4"
                  >
                    Đã thanh toán
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="h-12"
                  >
                    <td
                      className="px-3 py-4 text-center">
                      {order.id}
                    </td>
                    <td className="px-3 py-4">
                      {order.ngayDat}
                    </td>
                    <td className="px-3 py-4 text-center">
                      {order.tenNguoiNhan}
                    </td>
                    <td className="px-3 py-4 text-center">
                      {order.soDienThoai}
                    </td>
                    <td className="px-3 py-4 text-center">
                      {order.diaChi}
                    </td>
                    <td className="px-3 py-4 text-center">
                      {order.tongTien}
                    </td>
                    <td className="px-3 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={order.daThanhToan}
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
