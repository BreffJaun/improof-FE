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
import NewsCard from "./NewsCard"
import CategoriesFilter from "./CategoriesFilter.jsx";


// CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";
import UserContext from "../../context/userContext.jsx";


import { IoIosArrowBack as Back } from "react-icons/io"
import {IoIosArrowForward as Forward} from "react-icons/io"


const Newsfeed = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useState(true);
  const [isPending, setPending] = useState(true);
  const [category, setCategory] = useState("");
  const [numberSlides, setNumberSlides] = useState(undefined)

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

  const sortedProjects = projects.sort(function (a, b) {
    return (
      new Date(b.createdAt ?? b.updatedAt) -
      new Date(a.createdAt ?? a.updatedAt)
    );
  });

  return (
    <div className="mt2">
      <div className="central col">
        <CategoriesFilter category={category} setCategory={setCategory} />
      </div>
      <CarouselProvider
        interval={3000}
        naturalSlideWidth={100}
        naturalSlideHeight={40}
        totalSlides={10}
        infinite={true}
        lockOnWindowScroll={true}
      >
        <Slider>
          {category === undefined ||
          category === "others" ||
          category === "All categories"
            ? projects.map((project) => {
                <Slide index={0} key={project._id}>
                  <NewsCard
                    key={project._id}
                    user={user}
                    project={project}
                  />
                </Slide>;
              })
            : projects.map(
                (project) =>                
                  project.category === category && (
                    <Slide index={0} key={project._id}>
                      <NewsCard
                        key={project._id}
                        user={user}
                        project={project}
                      />
                    </Slide>
                  )
              )}
        </Slider>
        <div className="central">
          <ButtonBack><h3><Back/></h3></ButtonBack>
          <ButtonNext><h3><Forward/></h3></ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default Newsfeed;
