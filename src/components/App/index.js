import React from "react";
import Filters from "../Filters";
import CardsContainer from "../CardsContainer";
import {JobListingContext} from '../../context';

const initialFilter = {
  roles: [],
  location: [],
  experience: [],
  remote: [],
  minimum_base_pay_salary: [],
  search: ""
}

function App() {
  const [filters, setFilter] = React.useState(initialFilter);

  return (
      <JobListingContext.Provider
        value={{
          filters,
          setFilter
        }}
      >
        <div>
          <Filters />
          <CardsContainer />
        </div>
      </JobListingContext.Provider>
  );
}

export default App;
