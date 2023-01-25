import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import clsx from "clsx";

type Item = {
  id: number;
  first_name: string;
  height_feet: number | null;
  height_inches: number | null;
  last_name: string;
  position: string;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  weight_pounds: number | null;
};

type Data = {
  data: Item[];
  meta: {
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
    total_pages: number;
  };
};

const ProductsList = () => {
  const [data, setData] = useState<Data>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number[]>([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "efd44dfde2msh3962ab20283bfa5p1b57d2jsnfe849899ee29",
        "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
      },
    };
    let url = `https://free-nba.p.rapidapi.com/players?page=${page}&per_page=6`;
    if (search) {
      url += `&search=${search}`;
    }
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, [page, search]);

  const handlePages = (updatePage: number) => {
    setPage(updatePage);
    setTimeout(() => {
      setSelectedId([]);
    }, 2000);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelected = (tableRow: Item) => (): void => {
    const notContained = !isConsist(tableRow.id);
    if (notContained) {
      setSelectedId((oldRow) => [...oldRow, tableRow.id]);
    } else {
      const result = selectedId.filter((item) => item !== tableRow.id);
      setSelectedId(result);
    }
  };

  const isConsist = (id: number): boolean => {
    return selectedId.includes(id);
  };

  const totalPages: number | undefined = data?.meta.total_pages;

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="mb-3 xl:w-96">
          <input
            onChange={handleSearch}
            type="text"
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleText0"
            placeholder="Search player"
          />
        </div>
      </div>
      <table className="w-3/4 text-sm text-left text-gray-500 dark:text-gray-400 m-auto mt-[60px]">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Id</th>
            <th className="px-6 py-3">First Name</th>
            <th className="px-6 py-3">Last name</th>
            <th className="px-6 py-3">Team</th>
            <th className="px-6 py-3">Position</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((item) => {
            return (
              <tr
                onClick={handleSelected(item)}
                className={clsx("border-b", {
                  "bg-gray-200": isConsist(item.id),
                })}
                key={item.id}
              >
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.first_name}</td>
                <td className="px-6 py-4">{item.last_name}</td>
                <td className="px-6 py-4">{item.team.full_name}</td>
                <td className="px-6 py-4">{item.position}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalPages && (
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePagination={handlePages}
        />
      )}
    </>
  );
};

export default ProductsList;
