import "../../styles/newsfeed.scss";
import { host } from "../../api/host.jsx";
import { useNavigate } from "react-router";
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
import NewsCard from "./NewsCard";
import CategoriesFilter from "./CategoriesFilter.jsx";

// CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";
import UserContext from "../../context/userContext.jsx";

import { IoIosArrowBack as Back } from "react-icons/io";
import { IoIosArrowForward as Forward } from "react-icons/io";

import NewsfeedCard from "./NewsfeedCard.jsx";

const Newsfeed = () => {
  const [projects, setProjects] = useState([]);
  const [starProjects, setStarProjects] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [category, setCategory] = useState(undefined);
  const [sortedList, setSortedList] = useState(projects);
  const [stoneswithProjects, setStoneswithProjects] = useState([]);
  const [screen, setScreen] = useState(undefined);
  const width = window.innerWidth
  const navigate = useNavigate();


  const color = user?.meta?.colorTheme[0];
  const bg = user?.meta?.colorTheme[1];
  // console.log(category);

  useEffect(() => {
    const sorted = projects.sort((a, b) => {
      if (a.updatedAt && b.updatedAt) {
        let x = a.updatedAt;
        let y = b.updatedAt;
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      }
      return 0;
    });
    const short = sorted.reverse().splice(0, 10);
    setSortedList(short);
  }, [projects]);

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

    const starProjectIds = user?.starProjects?.map((pro) => pro._id);
    const getStarProjects = async () => {
      fetch(`${host}/projects/news`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(starProjectIds),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const newsfeedData = [];
          for (let i = 0; i < json.data.length; i++) {
            newsfeedData.push(...json.data[i].stones);
          }

          setStoneswithProjects(
            newsfeedData.sort((a, b) => {
              if (a.createdAt && b.createdAt) {
                let x = a.createdAt;
                let y = b.createdAt;
                if (x < y) {
                  return 1;
                }
                if (x > y) {
                  return -1;
                }
                return 0;
              }
              return 0;
            })
          );
          setStarProjects(json.data);
        });
    };
    getStarProjects();
  }, []);

  // console.log(starProjects);
  // console.log(stoneswithProjects);
  return (
    <>
      <div className="">
        <CarouselProvider
          interval={5000}
          naturalSlideWidth={width * 0.75}
          naturalSlideHeight={width * 0.35}
          totalSlides={sortedList.length}
          infinite={true}
          lockOnWindowScroll={true}
          isPlaying={true}
        >
          <div className="row">
            <div className="carousel-btn-container">
              <ButtonBack className={`circle40 central ${bg}`}>
                <>
                  <Back />
                </>
              </ButtonBack>
            </div>
            <Slider className="w100d">
              {category === undefined ||
              category === "all categories" ||
              category === "" ||
              !category
                ? sortedList?.map((project, i) => {
                    return (
                      <Slide index={i} key={project._id} className="">
                        <NewsCard
                          key={project._id}
                          user={user}
                          project={project}
                        />
                      </Slide>
                    );
                  })
                : sortedList?.map((project, i) => {
                    return (
                      category === project.category && (
                        <Slide index={i} key={project._id}>
                          <NewsCard
                            key={project._id}
                            user={user}
                            project={project}
                          />
                        </Slide>
                      )
                    );
                  })}
            </Slider>
            <div className="carousel-btn-container">
              <ButtonNext className={`circle40 central ${bg}`}>
                <>
                  <Forward />
                </>
              </ButtonNext>
            </div>
          </div>
        </CarouselProvider>
      </div>

      <div className="central col">
        <p className="mb1">choose your topic</p>
        <CategoriesFilter category={category} setCategory={setCategory} />
      </div>

      <div className="bo-DARK"></div>

      <div className="maxS">
        <h1 className={`${color} center mt1`}>newsfeed</h1>
        <h5 className={`central ${color ? color : user.meta.colorTheme[0]} mt05`} >
          Stay updated on your star projects!
        </h5>
      <div className="">
        <div>
          {stoneswithProjects.map((stone) => {
            const date1 = stone.createdAt?.toString().split("T");
            const date = date1[0].split("-").reverse().join(".");
            const time1 = parseInt(date1[1].slice(0, 2)) + 1;
            const time2 = date1[1].slice(2, 5);
            const time = time1 + time2;
            let project = {};
            for (let i = 0; i < starProjects.length; i++) {
              const pro = starProjects[i].stones.find(
                (findStone) => findStone._id === stone._id && starProjects[i]
              );
              if (pro !== undefined) project = starProjects[i];
            }
            return (
              <div key={stone._id} className="newsfeed-card">
                <h5 className={`${color} mgleft`}>new {stone.kind}:</h5>
                <h2 className={`${color} mgleft`}>{project?.name}</h2>
                <p className={`${color} mt05`}><span className="fw700">{time}</span> - {date}</p>

                <div className="flex mt1">
                  {stone.team.map((member) => {
                    return member.profile.avatar ? (
                      <div key={member._id} className="head50 shadow-l mr-08">
                        <img
                          className="head-pic"
                          src={member.profile.avatar}
                          onClick={() =>
                            navigate(`/userdetails/${member._id}`)
                          }
                        />
                      </div>
                    ) : (
                      <div
                        key={member._id}
                        className={`${bg} central head50 shadow-l mr-08`}
                      >
                        <p
                          className="central c-A100"
                          onClick={() =>
                            navigate(`/userdetails/${member._id}`)
                          }
                        >
                          {member.profile.initials}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <NewsfeedCard stone={stone} projectId={project._id} />
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </>
  );
};

export default Newsfeed;
