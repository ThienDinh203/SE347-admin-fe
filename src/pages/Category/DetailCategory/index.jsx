import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailCategory() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState();
  const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      await fetch(
        `http://localhost:8080/api/danhmuc/getdanhmucbyid/${categoryId}`
      ).then((response) => {
        return response.json();
      }).then((response) => {
        setCategory(response);
        setCategoryName(response.tenDanhMuc);
      });
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/danhmuc/update/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        }
      );
      console.log(response);
      if (response.ok) {
        alert("Cập nhật danh mục thành công");
        window.location.reload();
      } else {
        alert("Cập nhật danh mục thất bại");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    category && (
      <div className="m-8">
        <h1 className="text-2xl font-medium mb-4">{categoryName}</h1>
        <div className="grid gap-4">
          <div>
            <label className="block font-medium mb-2" htmlFor="name">
              Tên danh mục
            </label>
            <input
              className="border px-3 py-2 w-full"
              type="text"
              id="name"
              placeholder="Enter category name"
              value={category.tenDanhMuc}
              onChange={(e) =>
                setCategory({ ...category, tenDanhMuc: e.target.value })
              }
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-700 text-white rounded px-4 py-2 hover:bg-blue-800"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    )
  );

}

export default DetailCategory;
