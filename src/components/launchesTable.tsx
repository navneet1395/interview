import { useState, useEffect } from "react";
import { useLaunches } from "../services/api";
import { Filters } from "./Filters";
import { TableHeaders } from "./TableHeaders";
import { LaunchRow } from "./LaunchRow";
import { Pagination } from "./Pagination";

export const LaunchesTable = () => {
  const { data: launches, isLoading } = useLaunches();
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "date" | "status">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: "16px",
          color: "#666",
        }}
      >
        Loading...
      </div>
    );
  }

  const filteredLaunches = launches
    ?.filter((launch) => {
      const matchesSearch = launch.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const launchYear = new Date(launch.date_utc).getFullYear().toString();
      const matchesYear = yearFilter ? launchYear === yearFilter : true;

      let matchesStatus = true;
      if (statusFilter) {
        if (statusFilter === "upcoming") {
          matchesStatus = launch.success === null;
        } else if (statusFilter === "success") {
          matchesStatus = launch.success === true;
        } else if (statusFilter === "failed") {
          matchesStatus = launch.success === false;
        }
      }

      return matchesSearch && matchesYear && matchesStatus;
    })
    .sort((a, b) => {
      const compareA = sortKey === "date" ? new Date(a.date_utc) : a[sortKey];
      const compareB = sortKey === "date" ? new Date(b.date_utc) : b[sortKey];
      return sortOrder === "asc"
        ? compareA > compareB
          ? 1
          : compareA < compareB
          ? -1
          : 0
        : compareA < compareB
        ? 1
        : compareA > compareB
        ? -1
        : 0;
    });

  const totalItems = filteredLaunches.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLaunches = filteredLaunches.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, yearFilter, statusFilter]);

  return (
    <div className="launches-table-container">
      <Filters
        search={search}
        setSearch={setSearch}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="table-wrapper">
        <table className="launches-table">
          <TableHeaders
            sortKey={sortKey}
            sortOrder={sortOrder}
            setSortKey={setSortKey}
            setSortOrder={setSortOrder}
          />
          <tbody>
            {paginatedLaunches.map((launch) => (
              <LaunchRow key={launch.id} launch={launch} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
