import { useSelector, useDispatch } from "react-redux"
import { selectFilter } from "../reducers/filterReducer"

const VisibilityFilter = () => {
  const dispatch = useDispatch()
  const filterView = (view) => {
    dispatch(selectFilter(view))
  }
  const filter = useSelector(state => state.filter)
  return (
    <div>
            all <input type="radio" name="filter" checked={filter === "ALL"}
        onChange={() => filterView("ALL")} />
            important <input type="radio" name="filter" checked={filter === "IMPORTANT"}
        onChange={() => filterView("IMPORTANT")} />
            nonimportant <input type="radio" name="filter" checked={filter === "NONIMPORTANT"}
        onChange={() => filterView("NONIMPORTANT")} />
    </div>
  )
}

export default VisibilityFilter