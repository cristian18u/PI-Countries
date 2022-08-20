import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPage } from "../../redux/actions";
import c from "./Paginate.module.css";

export default function Paginate() {
  const { page, pageTotal } = useSelector((state) => state);
  const dispatch = useDispatch();

  function paginated(option) {
    if (option === "prev") dispatch(setPage(page - 1));
    else if (option === "next") dispatch(setPage(page + 1));
  }

  return (
    <div className={c.containerPaginate}>
      <div className={c.paginate}>
        <button
          disabled={page === 1 ? true : false}
          onClick={() => {
            paginated("prev");
          }}
        >
          {"<"}
        </button>
        <div className={c.num}>
          <div className={c.numActual}>{page}</div>
          <div>{`de ${pageTotal}`}</div>
        </div>
        <button
          disabled={page === pageTotal ? true : false}
          onClick={() => {
            paginated("next");
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
