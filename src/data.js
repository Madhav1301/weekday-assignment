import {PAGE_SIZE} from './constants';

export async function getData(setData, setResponse, setOffset, offset) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit: PAGE_SIZE,
    offset,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  return await fetch(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // Appending the new data to the existing data
      setOffset(((prevOffset) => prevOffset + 1));
      setResponse(result);
      setData((prevData) => {
        return [...prevData, ...result.jdList];
      });
    })
    .catch((error) => console.error(error));
}
