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
  const [sortedList, setSortedList] = useState(projects)

  const color = user.meta.colorTheme[0]
  const bg = user.meta.colorTheme[1]


  useEffect(()=>{
    const sorted = projects.sort((a,b)=> {
      if(a.updatedAt && b.updatedAt){
        let x = a.updatedAt
        let y = b.updatedAt
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      }
      return 0
    })
    const short = sorted.reverse().splice(0,10)
    console.log("SHORT", short);
    console.log("SORTED", sorted);
    setSortedList(short)
  },[projects])

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
      <div>
        <CarouselProvider
          interval={3000}
          naturalSlideWidth={100}
          naturalSlideHeight={40}
          totalSlides={sortedList.length}
          infinite={true}
          lockOnWindowScroll={true}
        >
          <Slider>
            {category === undefined ||
            category === "all categories" ||
            category === "" || !category
              ? sortedList?.map((project,i) => {
                  return(
                  <Slide index={i} key={project._id}>
                    <NewsCard
                      key={project._id}
                      user={user}
                      project={project}
                    />
                  </Slide>
                  )
                })
              : sortedList?.map((project,i) =>{            
                return category === project.category &&            
                  <Slide index={i} key={project._id}>
                    <NewsCard
                      key={project._id}
                      user={user}
                      project={project}
                      />
                  </Slide>
              
                

              }                
                )}
          </Slider>
          <div className="central">
            <ButtonBack className={bg}><h3><Back /></h3></ButtonBack>
            <div className="central col">
              <p className="mb1">choose your topic</p>
              <CategoriesFilter category={category} setCategory={setCategory} />
            </div>
            <ButtonNext className={bg}><h3><Forward/></h3></ButtonNext>
          </div>
        </CarouselProvider>
      </div>
      <div>
        <h1 className={`${color} center mt1`}>newsfeed</h1>
        <div className="">
          {/* HIER MUSS EINE KARTE ERSTELLT WERDEN FÜR DEN NEWSFEED */}
          <div>
            <p>Name hat am updatedAt diesen Stone angelegt!</p>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
