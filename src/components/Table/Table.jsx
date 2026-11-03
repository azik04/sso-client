import Button from "../Button/Button";
import "./style.css";

const Table = ({
    children,
    isFooter = false,
    headerText,
    hasNextPage,
    hasPrevPage,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    totalCount,
    totalPages,
    isButton,
    buttonTxt,
    buttonFunc
}) => {
    const startItem = totalCount === 0 ? 0 : (pageNumber - 1) * pageSize + 1;

    const endItem = Math.min(pageNumber * pageSize, totalCount);

    return (
        <div className="table">
            <div className="table__header">
                <h2 className="table__title">{headerText}</h2>

                {isButton && (
                    <Button text={buttonTxt} onClick={buttonFunc} />
                )}
            </div>

            {children}


            {isFooter && (
                <div className="table__footer">
                    <span className="table__count">
                        {startItem}-{endItem} of {totalCount}
                    </span>

                    <div className="table__pagination">
                        <span className="table__per-page-label">
                            Səhifə üzrə:
                        </span>

                        <select
                            className="table__per-page-select"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPageNumber(1);
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={250}>250</option>
                        </select>

                        <button
                            className="table__page-btn"
                            disabled={!hasPrevPage}
                            onClick={() => setPageNumber(prev => prev - 1)}
                            aria-label="Previous page"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>

                        <span className="table__page-current">
                            {pageNumber} / {totalPages}
                        </span>

                        <button
                            className="table__page-btn"
                            disabled={!hasNextPage}
                            onClick={() => setPageNumber(prev => prev + 1)}
                            aria-label="Next page"
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Table;