const fetchData = async () => {
  await fetch("./data.json")
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const data = fetchData();

