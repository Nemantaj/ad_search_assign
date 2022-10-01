import { useState, useEffect } from "react";
import { Text, Button, Card, Input, Divider, Link } from "@nextui-org/react";

import "./App.css";

const App = () => {
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState();

  const onChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    const timeoutId = setTimeout(() => {
      setLoading(true);
      fetch(`http://localhost:3001/search-by-name?search=${query}`)
        .then((res) => {
          if (!res.ok) {
            return console.log("There was an error!");
          }
          return res.json();
        })
        .then((data) => {
          if (!data.result) {
            return console.log("There was an error!");
          }
          setSearch(data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, [query]);

  return (
    <div className="App">
      <div className="search_div">
        <Input
          type="text"
          size="sm"
          bordered
          rounded
          aria-label="Search Input"
          placeholder="Search..."
          css={{ mw: "450px", w: "100%", fontFamily: "Neon3" }}
          onChange={onChangeHandler}
        />
      </div>
      <Divider />
      <div className="search_result">
        {search.length > 0 &&
          search.map((doc) => {
            return (
              <Card variant="bordered" css={{ minHeight: "250px" }}>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image src={doc.details.image} objectFit="cover" />
                </Card.Body>
                <Card.Footer
                  className="card_footer"
                  css={{ bgBlur: "#ffffff64" }}
                >
                  <Text h4 css={{ fontFamily: "Neon2" }}>
                    {doc.name}
                  </Text>
                  <Text size="15px" css={{ fontFamily: "Neon" }}>
                    {doc.details.slogan}
                  </Text>
                  <Divider css={{ my: "5px" }} />
                  <Text size="15px" css={{ fontFamily: "Neon" }}>
                    {doc.details.headline}
                  </Text>
                  <Text size="12px" css={{ fontFamily: "Neon3" }}>
                    {doc.details.desc}
                  </Text>
                  <Link
                    href={`https://${doc.url}`}
                    css={{
                      py: "5px",
                      px: "10px",
                      bgColor: "$red100",
                      br: "20px",
                      my: "5px",
                      fontFamily: "Neon",
                      fontSize: "13px"
                    }}
                    color="error"
                  >
                    {doc.details.CTA}
                  </Link>
                </Card.Footer>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default App;
