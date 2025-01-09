export const TableHeaders = ({
  sortKey,
  sortOrder,
  setSortKey,
  setSortOrder,
}: {
  sortKey: string;
  sortOrder: string;
  setSortKey: (key: "name" | "date" | "status") => void;
  setSortOrder: (order: "asc" | "desc") => void;
}) => {
  const handleSort = (key: "name" | "date" | "status") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getHeaderClassName = (key: string) => {
    const baseClass = "header-cell";
    if (key === "details" || key === "links") {
      return `${baseClass} non-sortable`;
    }
    const sortClass = sortKey === key ? `sort-${sortOrder}` : "";
    return `${baseClass} sortable ${sortClass}`;
  };

  return (
    <thead className="table-header">
      <tr>
        <th
          className={getHeaderClassName("name")}
          onClick={() => handleSort("name")}
        >
          Mission
        </th>
        <th
          className={getHeaderClassName("date")}
          onClick={() => handleSort("date")}
        >
          Date
        </th>
        <th
          className={getHeaderClassName("status")}
          onClick={() => handleSort("status")}
        >
          Status
        </th>
        <th className={getHeaderClassName("details")}>Details</th>
        <th className={getHeaderClassName("links")}>Links</th>
      </tr>
    </thead>
  );
};
