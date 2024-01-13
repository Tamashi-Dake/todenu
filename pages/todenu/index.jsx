import { useEffect, useState } from "react";
import { Edit, BadgePlus, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Search from "../../components/todenu/Search";
import ReactPaginate from "react-paginate";
import { formatTime } from "../../lib/timeUtils";
import { Button } from "@material-tailwind/react";
import AddModal from "../../components/todenu/AddModal";
import EditModal from "../../components/todenu/EditModal";
import DeleteModal from "../../components/todenu/DeleteModal";
export default function Todenu() {
  // Get information of user
  const { data: session, status } = useSession({ required: true });
  const [menuData, setMenuData] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [itemID, setItemID] = useState();
  const [itemName, setItemName] = useState();
  // Modal Add
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => {
    setAddOpen((cur) => !cur);
  };
  // Modal Edit
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = (id) => {
    setItemID(id);
    setEditOpen((cur) => !cur);
  };
  // Modal Delete
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = (id, name) => {
    setItemID(id);
    setItemName(name);
    setDeleteOpen((cur) => !cur);
  };
  // Pagination
  const pageSize = 10; // Số lượng mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Lấy dữ liệu từ API, nếu có tham số tìm kiếm thì thêm vào URL
        const response = searchParam
          ? await fetch(`/api/jobs?search=${searchParam}`)
          : await fetch("/api/jobs");
        const data = await response.json();
        // Lọc chỉ lấy các mục có email trùng khớp với email đang đăng nhập và tên chứa chuỗi tìm kiếm
        const filteredData = data.jobs.filter(
          (item) =>
            item.email === session.user.email && item.name.includes(searchParam)
        );
        // const countData = filteredData.length;
        setMenuData(filteredData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, [session, searchParam, addOpen, editOpen, deleteOpen]);

  // Tính toán số trang dựa trên số lượng mục và kích thước trang
  const pageCount = Math.ceil((menuData?.length || 0) / pageSize);

  // Lấy dữ liệu cho trang hiện tại
  const getCurrentPageData = () => {
    // Tính chỉ số bắt đầu = số trang hiện tại * kích thước trang
    const start = currentPage * pageSize;
    // Tính chỉ số kết thúc = chỉ số bắt đầu + kích thước trang
    const end = start + pageSize;
    return menuData?.slice(start, end) || [];
  };

  // Xử lý sự kiện thay đổi trang
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Lấy dữ liệu từ thanh tìm kiếm
  const handleSearch = (searchTerm) => {
    setSearchParam(searchTerm);
  };

  // Nếu đang tải dữ liệu thì hiển thị thông báo
  if (status === "loading")
    return (
      <>
        <div className="skeleton mx-auto">
          <h1>Loading...</h1>
        </div>
      </>
    );
  return (
    <>
      <div className="flex justify-between mx-auto my-4 p-2 w-full xl:w-[80%] lg:w-[80%] ">
        <div className="flex">
          <Search onSearch={handleSearch} />
          {/* <ComboBox /> */}
        </div>

        <Button
          color="blue"
          ripple="light"
          className="flex p-4 gap-2 items-center rounded-full"
          onClick={handleAddOpen}
        >
          <BadgePlus />
          <span
            className="
          hidden md:block
          "
          >
            Add Todenu
          </span>
        </Button>
      </div>

      <div className=" overflow-x-auto p-2 lg:w-[80%] mx-auto">
        {getCurrentPageData().length > 0 ? (
          <table className="w-full  text-sm text-left  text-gray-500 dark:text-gray-400   ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-2  lg:px-6 lg:py-3">
                  Name
                </th>
                <th scope="col" className="px-2 py-2 lg:px-6 lg:py-3">
                  Description
                </th>
                <th scope="col" className="px-2 py-2 lg:px-6 lg:py-3 text-left">
                  Time
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 lg:px-6 lg:py-3 text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b h-[60px] text-ellipsis overflow-hidden dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className=" px-2 py-2 lg:px-6 lg:py-4 break-all md:w-[200px] lg:w-[300px] text-base font-medium text-gray-900 dark:text-white"
                  >
                    {item.name}
                  </td>
                  <td className=" px-2 py-2 lg:px-6 lg:py-4 break-all ">
                    {item.description}
                  </td>
                  <td className=" px-2 py-2 lg:px-6 lg:py-4 w-2/12 text-left">
                    {formatTime(item.time)}
                  </td>
                  <td className=" px-2 py-2 lg:px-6 lg:py-4 w-1/12 md:w-1/12 text-center">
                    <div className="flex flex-col items-center md:flex-row gap-2">
                      <div
                        title="Update this todenu"
                        // href={`/todenu/editTodenu/${item._id}`}
                        onClick={() => handleEditOpen(item._id)}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        <Edit size={24} />
                      </div>
                      <button
                        title="Delete this todenu"
                        onClick={() => {
                          handleDeleteOpen(item._id, item.name);
                        }}
                        className="text-red-400"
                      >
                        <Trash size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="skeleton m-auto">
            <h1 className="text-2xl text-center font-bold text-gray-700 py-2 px-4">
              No jobs found. Select Add Todenu to getting started.
            </h1>
          </div>
        )}
      </div>
      <AddModal
        open={addOpen}
        handleAddOpen={handleAddOpen}
        session={session}
      />
      <EditModal open={editOpen} handleEditOpen={handleEditOpen} id={itemID} />
      <DeleteModal
        open={deleteOpen}
        handleDeleteOpen={handleDeleteOpen}
        id={itemID}
        name={itemName}
      />
      {/* Phân trang */}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={
            // left arrow icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ opacity: pageCount === 0 || currentPage === 0 ? 0 : 1 }} // Set opacity to 0 when pageCount is 0 or currentPage is 0
            >
              <path
                fillRule="evenodd"
                d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>
          }
          nextLabel={
            // right arrow icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform -rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{
                opacity:
                  pageCount === 0 || currentPage === pageCount - 1 ? 0 : 1,
              }} // nếu đến trang cuối thì ẩn nút next
            >
              <path
                fillRule="evenodd"
                d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>
          }
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"flex gap-2 mt-5 mx-auto"}
          pageClassName={"text-black font-bold rounded"}
          pageLinkClassName={
            " hover:bg-gray-300 p-4 text-black font-bold  border border-gray-300 rounded"
          }
          activeClassName={"bg-blue-500  text-white font-bold rounded"}
          activeLinkClassName=" bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
}
