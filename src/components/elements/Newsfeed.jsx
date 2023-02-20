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
  const [category, setCategory] = useState("");
  const [sortedList, setSortedList] = useState(projects)
  const [stoneswithProjects, setStoneswithProjects] = useState([])
  const navigate = useNavigate()

  const color = user?.meta?.colorTheme[0]
  const bg = user?.meta?.colorTheme[1]

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

    const starProjectIds = user?.starProjects?.map(pro => pro._id)
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

  console.log(starProjects);
  // console.log(stoneswithProjects);

  return (
    <div>
      <div>
        <CarouselProvider
          interval={3000}
          naturalSlideWidth={100}
          naturalSlideHeight={40}
          totalSlides={sortedList.length}
          infinite={true}
          lockOnWindowScroll={true}
          isPlaying={true}
        >
          <Slider>
            {category === undefined ||
            category === "all categories" ||
            category === "" ||
            !category
              ? sortedList?.map((project, i) => {
                  return (
                    <Slide index={i} key={project._id}>
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
          <div className="central">
            <ButtonBack className={bg}>
              <h3>
                <Back />
              </h3>
            </ButtonBack>
            <div className="central col">
              <p className="mb1">choose your topic</p>
              <CategoriesFilter category={category} setCategory={setCategory} />
            </div>
            <ButtonNext className={bg}>
              <h3>
                <Forward />
              </h3>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>

      <div className="bo-DARK"></div>
      <div>
        <h1 className={`${color} center mt1`}>newsfeed</h1>
        <div className="">
          <div>
            {stoneswithProjects.map(stone => {
                const date1 = stone.createdAt?.toString().split("T")
                const date = date1[0].split("-").reverse().join(".")
                const time = date1[1].slice(0,5) 
                let project = {}
                      for (let i = 0 ; i<starProjects.length ; i++){
                        const pro = starProjects[i].stones.find(findStone => findStone._id === stone._id && starProjects[i])
                        if(pro !== undefined)
                        project = starProjects[i]
                      }
                return (
                  <div className="mt5">
                    <div >
                      <div className="flex">
                        {stone.team.map(member =>{
                        return ( 
                          <>
                            <img className="circle50" src={member.profile.avatar} onClick={()=>navigate(`/userdetails/${member._id}`)}/>
                            {/* <p>{member.profile.firstName}</p>                                                   */}
                          </>          
                        )                         
                      }
                        )}

                      </div>
                      <h3>
                      New {stone.kind.toUpperCase()} in {project?.name} <br/>{date} {time}

                      </h3>
                      <NewsfeedCard stone={stone} projectId={project._id}/>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
