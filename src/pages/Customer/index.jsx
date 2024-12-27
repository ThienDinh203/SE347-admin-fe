import React, { useState, useEffect } from 'react';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');

  useEffect(() => {
    async function fetchCustomers() {
      fetch("http://localhost:8080/auth/getalltaikhoan")
        .then((response) => response.json())
        .then((data) => {
          const filteredCustomers = data.filter(customer => customer.roles[0].name !== 'ROLE_ADMIN');
          setCustomers(filteredCustomers);

          const filteredAdmins = data.filter(admin => admin.roles[0].name === 'ROLE_ADMIN');
          setAdmins(filteredAdmins);
        });
    }

    fetchCustomers();
  }, []);

  const handleCustomerSearchChange = (e) => {
    setCustomerSearchQuery(e.target.value);
  };

  const handleAdminSearchChange = (e) => {
    setAdminSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.username.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearchQuery.toLowerCase())
  );

  const filteredAdmins = admins.filter(admin =>
    admin.username.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(adminSearchQuery.toLowerCase())
  );


  return (
    <div className="m-8">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <h1 className="text-2xl font-medium ">Quản lý khách hàng</h1>

        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <input
            className="appearance-none w-full border border-slate-300 p-2 rounded-md disabled:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Tìm kiếm"
            value={customerSearchQuery}
            onChange={handleCustomerSearchChange}
          />
        </div>
      </div>

      <div className="p-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="shadow-sm ring-1 ring-slate-200 rounded-md sm:rounded-lg">

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
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4"
                  >
                    Giới tính
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCustomers.map((admin, index) => (
                  <tr
                    key={index}
                    className="h-12"
                  >
                    <td
                      className="px-3 py-4 text-center">
                      {admin.id}
                    </td>
                    <td className="px-3 py-4">
                      {admin.username}
                    </td>
                    <td className="px-3 py-4 text-center">
                      {admin.email}
                    </td>
                    <td className="px-3 py-4 text-center">
                      {admin.gioiTinh}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <h1 className="text-2xl font-medium h-16">Tài khoản quản trị viên</h1>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <input
            className="w-full border p-2 rounded-md disabled:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Tìm kiếm"
            value={adminSearchQuery}
            onChange={handleAdminSearchChange}
          />
        </div>
      </div>

      <div className="p-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="shadow-sm ring-1 rounded-md">

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
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4"
                  >
                    Giới tính
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAdmins.map((admin, index) => (
                  <tr
                    key={index}
                    className="h-12"
                  >
                    <td
                      className="px-3 py-4 text-center">
                      {admin.id}
                    </td>
                    <td className="px-3 py-4">
                      {admin.username}
                    </td>
                    <td className="px-3 py-4 text-center">
                      {admin.email}
                    </td>
                    <td className="px-3 py-4 text-center">
                      {admin.gioiTinh}
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

export default Customer;
