import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { select, selectedValue, selectedFilterId } from '../slice/filterSlice';

const Header = () => {
  const selected = useSelector(selectedValue);
  const tab = useSelector(selectedFilterId);
  const dispatch = useDispatch();

  const selectFilter = (id) => {
    dispatch(select(id))
  }

  const filters = ["Unread", "Read", "Favorites"]

  return (
    <div className="header">
      <p>Filter By:</p>
      <div className="filters">
        <ul>
          {filters?.map((filter) => {
            return <li key={filter} className={selected && tab === filter ? "selected" : ""} onClick={() => { selectFilter(filter) }}>{filter}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Header