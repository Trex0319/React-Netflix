import { useState, useEffect } from "react";
import axios from "axios";
import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Divider,
  Button,
} from "@mantine/core";
function Tvshow() {
  const [tvshow, setTvshow] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2000/tvshows")
      .then((response) => {
        setTvshow(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const filterTvshow = async (genre = "") => {
    try {
      const response = await axios.get(
        "http://localhost:2000/tvshows?genre=" + genre
      );
      setTvshow(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Space h="20px" />
      <Title order={3} align="center">
        TV Shows
      </Title>
      <Space h="20px" />
      <Group position="center">
        <Button
          onClick={() => {
            filterTvshow("");
          }}
        >
          All
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Drama");
          }}
        >
          Drama
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Fantasy");
          }}
        >
          Fantasy
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Action");
          }}
        >
          Action
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Crime");
          }}
        >
          Crime
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Crime");
          }}
        >
          Crime
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Adventure");
          }}
        >
          Adventure
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Adventure");
          }}
        >
          Adventure
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Biography");
          }}
        >
          Biography
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Horror");
          }}
        >
          Horror
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Sci-Fi");
          }}
        >
          Sci-Fi
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Comedy");
          }}
        >
          Comedy
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Mystery");
          }}
        >
          Mystery
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Thriller");
          }}
        >
          Thriller
        </Button>
      </Group>
      <Space h="20px" />
      <Grid>
        {tvshow
          ? tvshow.map((tvshows) => {
              return (
                <Grid.Col span={4} key={tvshows._id}>
                  <Card align="center" withBorder shadow="md" p="20px">
                    <Title order={5}>{tvshows.title}</Title>
                    <Space h="10px" />
                    <Divider />
                    <Space h="10px" />
                    <Group position="center" spacing={2}>
                      <Badge color="green">{tvshows.creator}</Badge>
                      {tvshows.genre.map((genre) => (
                        <Badge color="red" key={tvshows.genre}>
                          {genre}
                        </Badge>
                      ))}
                      <Badge>{tvshows.rating}</Badge>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}
export default Tvshow;
