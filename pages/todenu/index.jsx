import { useEffect, useState } from "react";
import Link from "next/link";
import RemoveBtn from "../../components/todenu/DeleteJobBtn";
import { Edit, BadgePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import ComboBox from "../../components/todenu/ComboBox";
import Search from "../../components/todenu/Search";
import ReactPaginate from "react-paginate";

export default function Todenu({ searchParam }) {
  const pageSize = 10; // Số lượng mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const { data: session, status } = useSession({ required: true });
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        // Lọc chỉ lấy các mục có email trùng khớp với email đang đăng nhập
        const filteredData = data.jobs.filter(
          (item) => item.email === session.user.email
        );
        const countData = filteredData.length;
        console.log(countData);
        setMenuData(filteredData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, [session]);

  // Tính toán số trang dựa trên số lượng mục và kích thước trang
  const pageCount = Math.ceil((menuData?.length || 0) / pageSize);

  // Lấy dữ liệu cho trang hiện tại
  const getCurrentPageData = () => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return menuData?.slice(start, end) || [];
  };

  // Xử lý sự kiện thay đổi trang
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

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
      <div className="flex justify-between mx-auto w-full xl:w-[50%] lg:w-[80%] md:w-[80%]">
        <div className="flex">
          <Search />
          <ComboBox />
        </div>

        <Link
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 h-max rounded flex gap-1 px-2 m-2"
          href="/todenu/addTodenu"
        >
          <BadgePlus />
          Add Todenu
        </Link>
      </div>

      {getCurrentPageData().length > 0 ? (
        getCurrentPageData().map((item) => (
          <div
            key={item._id}
            className="p-4 border w-full border-slate-300 my-3 mx-auto flex justify-between gap-5 items-start xl:w-[50%] lg:w-[80%] md:w-[80%]"
          >
            <div>
              <h2 className="font-bold text-2xl">{item.name}</h2>
              <div>{item.description}</div>
              <p className="text-right font-body font-bold">
                {item.time} minutes
              </p>
            </div>

            <div className="flex gap-2">
              <Link href={`/todenu/editTodenu/${item._id}`}>
                <Edit size={24} />
              </Link>
              <RemoveBtn id={item._id} />
            </div>
          </div>
        ))
      ) : (
        <div className="skeleton m-auto">
          <h1
            className="
          text-2xl
          text-center
          font-bold
          text-gray-700
          py-2
          px-4
          
          "
          >
            No jobs found. Select Add Todenu to getting started.
          </h1>
        </div>
      )}

      {/* Phân trang */}
      {pageCount > 0 && (
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
