import { Container, Title, Space, Divider } from "@mantine/core";

import Movies from "../Movies";
import Tvshows from "../Tvshows";

function Home() {
  return (
    <Container>
      <Space h="50px" />
      <Title align="center" color="red">
        Netflix
      </Title>
      <Space h="20px" />
      <Title order={2} align="center">
        Enjoy big movies, hit series and more from RM17.
      </Title>
      <Space h="30px" />
      <Divider />
      <Space h="30px" />
      {/* list all the movies here */}
      <Movies />
      <Space h="30px" />
      <Divider />
      <Space h="30px" />
      {/* list all the Tv shows here */}
      <Tvshows />
    </Container>
  );
}

export default Home;
