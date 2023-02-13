import { host } from "../../api/host.jsx";
import { useContext, useEffect, useSate, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

// ELEMENTE
import { ProjectCardNewsFeed } from "./ProjectCard.jsx";
import CategoriesFilter from "./CategoriesFilter.jsx";

// CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";
import UserContext from "../../context/userContext.jsx";

const Newsfeed = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useState(true);
  const [isPending, setPending] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      fetch(`${host}/projects`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          setProjects(json);
        });
    };
    getProjects();
  }, []);

  useEffect(() => {
    setPending(true);
    const getUser = async () => {
      fetch(`${host}/users/checklogin`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setUser(json.user);
            setPending(false);
          } else {
            navigate("/login");
          }
        });
    };
  }, [user]);
  const sortedProjects = projects.sort(function (a, b) {
    return (
      new Date(b.createdAt ?? b.updatedAt) -
      new Date(a.createdAt ?? a.updatedAt)
    );
  });

  return (
    <div className="mt2">
      <p className="sl c-FAV">newsFeed</p>
      <CarouselProvider
        isPlaying={true}
        interval={3000}
        naturalSlideWidth={100}
        naturalSlideHeight={25}
        totalSlides={10}
        infinite={true}
        lockOnWindowScroll={true}
      >
        <Slider>
          {category === undefined ||
          category === "others" ||
          category === "All categories"
            ? projects.map((project) => {
                <Slide index={0}>
                  <ProjectCardNewsFeed
                    key={project._id}
                    user={user}
                    project={project}
                  />
                </Slide>;
              })
            : projects.map(
                (project) =>
                  project.category === category && (
                    <Slide index={0}>
                      <ProjectCardNewsFeed
                        key={project._id}
                        user={user}
                        project={project}
                      />
                    </Slide>
                  )
              )}
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
      <div className="central col">
        <h1 className="c-FAV mb1">filter your interest</h1>
        <CategoriesFilter setCategory={setCategory} />
      </div>
    </div>
  );
};

export default Newsfeed;
