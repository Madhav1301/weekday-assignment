import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import { useContext } from "react";
import { JobListingContext } from "../../context";
import JobCard from "../JobCard";
import theme from "../../theme";
import { Grid } from "@mui/material";
import { getData } from "../../data";
import InfiniteScroll from "react-infinite-scroll-component";
import {PAGE_SIZE} from '../../constants';

export default function CardsContainer() {
  const [response, setResponse] = React.useState({});
  const [data, setData] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const props = useContext(JobListingContext);
  const filteredData = [...data];

  React.useEffect(() => {
    getData(setData, setResponse, setOffset, offset);
  }, []);

  // Filtering the data based on the filters applied
  for (let i = 0; i < filteredData.length; i++) {
    // Filtering based on the roles
    if (props.filters.roles.length > 0) {
      let toRemove = true;
      for (let j = 0; j < props.filters.roles.length; j++) {
        if (
          filteredData[i].jobRole
            .toLowerCase()
            .includes(props.filters.roles[j].Role.toLowerCase())
        ) {
          toRemove = false;
        }
      }
      if (toRemove) {
        filteredData.splice(i, 1);
        i--;
        continue;
      }
    }

    // Filtering based on the location
    if (props.filters.location.length > 0) {
      let toRemove = true;
      for (let j = 0; j < props.filters.location.length; j++) {
        if (
          filteredData[i].location
            .toLowerCase()
            .includes(props.filters.location[j].toLowerCase())
        ) {
          toRemove = false;
        }
      }
      if (toRemove) {
        filteredData.splice(i, 1);
        i--;
        continue;
      }
    }

    // Filtering based on the experience
    if (props.filters.experience.length > 0) {
      let toRemove = true;

      for (let j = 0; j < props.filters.experience.length; j++) {
        if (
          filteredData[i].minExp <= props.filters.experience[j] &&
          filteredData[i].maxExp >= props.filters.experience[j]
        ) {
          toRemove = false;
        }
      }

      if (toRemove) {
        filteredData.splice(i, 1);
        i--;
        continue;
      }
    }

    // Filtering based on the remote/in-office
    if (props.filters.remote.length > 0) {
      if (props.filters.remote.includes("Remote")) {
        if (!filteredData[i].location.toLowerCase().includes("remote")) {
          filteredData.splice(i, 1);
          i--;
          continue;
        }
      } else if (
        props.filters.remote.includes("Hybrid") ||
        props.filters.remote.includes("In-office")
      ) {
        if (filteredData[i].location.toLowerCase().includes("remote")) {
          filteredData.splice(i, 1);
          i--;
          continue;
        }
      }
    }
    // debugger;
    // Filtering based on the minimum base pay salary
    if (props.filters.minimum_base_pay_salary.length > 0) {
      debugger;
      let toRemove = true;
      for (let j = 0; j < props.filters.minimum_base_pay_salary.length; j++) {
        const basePay = parseInt(
          props.filters.minimum_base_pay_salary[j].replace("L", ""),
          10
        );
        if (
          filteredData[i].minJdSalary !== null &&
          filteredData[i].minJdSalary >= basePay
        ) {
          toRemove = false;
        }
      }
      if (toRemove) {
        filteredData.splice(i, 1);
        i--;
        continue;
      }
    }

    if (props.filters.search !== "") {
      if (
        !filteredData[i].companyName
          .toLowerCase()
          .includes(props.filters.search.toLowerCase())
      ) {
        filteredData.splice(i, 1);
        i--;
        continue;
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <InfiniteScroll
        dataLength={data.length}
        next={() => getData(setData, setResponse, setOffset, offset)}
        hasMore={!(response?.data?.length < PAGE_SIZE)}
        loader={<h4>Loading...</h4>}
      >
        <Grid mt={2} container rowSpacing={2} columnSpacing={2}>
          {filteredData.map((job) => {
            return (
              <Grid sm={12} md={4} lg={3} sx={{ p: 2 }}>
                <JobCard
                  posted={new Intl.RelativeTimeFormat(undefined, {
                    style: "short",
                  }).format(-Math.round(Math.random() * 10), "days")}
                  {...job}
                />
              </Grid>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </ThemeProvider>
  );
}
