import { useState, useEffect } from "react";
import axios from "axios";
import { Title, Grid, Card, Badge, Group, Space } from "@mantine/core";

function Tvshows() {
  const [tvshows, setTvshows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/tvshows")
      .then((response) => {
        setTvshows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Title order={3} align="center">
        Tvshows
      </Title>
      <Grid>
        {tvshows
          ? tvshows.map((tvshow) => {
              return (
                <Grid.Col key={tvshow.id} span={4}>
                  <Card withBorder shadow="sm" p="20px">
                    <Title order={5}>{tvshow.title}</Title>
                    <Space h="20px" />
                    <Group position="center">
                      <Badge color="green">{tvshow.creator}</Badge>
                      <Badge color="yellow">{tvshow.genre}</Badge>
                      <Badge color="grape">{tvshow.rating}</Badge>
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

export default Tvshows;
