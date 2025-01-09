interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  yearFilter: string;
  setYearFilter: (year: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const Filters = ({
  search,
  setSearch,
  yearFilter,
  setYearFilter,
  statusFilter,
  setStatusFilter,
}: FiltersProps) => {
  // Generate year options from 2006 (SpaceX's founding) to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2005 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label className="filter-label">Search:</label>
        <input
          type="text"
          className="filter-input"
          placeholder="Search launches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Year:</label>
        <select
          className="filter-select"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Status:</label>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
    </div>
  );
};
