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
  const [starProjects, setStarProjects] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [category, setCategory] = useState("");
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

    const starProjectIds = user.starProjects.map(pro => pro._id)
    const getStarProjects = async () => {
      fetch(`${host}/projects/news`, {
        credentials: "include",
        method:"POST",
        body: JSON.stringify(starProjectIds),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })      
        .then((response) => response.json())
        .then((json) => {
          setStarProjects(json.data);
        });
    };
    getStarProjects();
  }, []);

  console.log(starProjects);

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

          <div>
            {/* {starProjects.map(project => 
            <div key={project._id}>
              <div>{project.team.map((member)=> <img className="circle50" src={member.profile.avatar}></img>)}</div>
              <p>{project.team.length > 1 ? "haben" : "hat"} ein neues Projekt erstellt</p>
              <NewsCard project={project._id} user={user}/>
            </div>
            )} */}
            {starProjects.map(project => {
              return project.stones.sort((a,b)=> {
                if(a.createdAt && b.createdAt){
                  let x = a.createdAt
                  let y = b.createdAt
                  if (x < y) {return 1;}
                  if (x > y) {return -1;}
                  return 0;
                }
                return 0
              }).map(stone => {
                return (
                  <div>
                    <div>
                      {stone.team.map(member =>
                      <div>
                        {/* <img className="circle50" src={member.profile.avatar}></img> */}
                        <p><img className="circle50" src={member.profile.avatar}></img>{member.profile.firstName} has created a new {stone.kind} in {project.name} at {stone.createdAt}</p>
                        <NewsCard project={project} user={user}/>
                      </div>            
                      )}
                    </div>
                  </div>
                )               
              })
            })}
         
          </div>
        </div>
      </div>

    </div>
  );
};

export default Newsfeed;
