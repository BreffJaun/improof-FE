import { useNavigate } from "react-router";
import ReactPlayer from "react-player";

const NewsfeedCard = ({stone, projectId}) => {
  const navigate = useNavigate()
  return (
    <div className="mt1">
      <div className="">
        <h4 onClick={()=>navigate(`/projectdetails/${projectId}`)}>{stone.title}</h4>
        <h5>{stone.description}</h5>
        <div className="player">
          {!stone.media[0] ? null : stone.contentType.includes("image") ? (
            <img className="player" src={stone.media[0]} />
          ) : (
            <div>
              <ReactPlayer
                url={stone.media[0]}
                playing={false}
                controls={true}
                light={false}
                // playIcon={noch keine Ahnung}
                volume={null}
                muted={true}
                width="100%"
                height="100%"
                pip={true}
                stopOnUnmount={false}                             
              />
            </div>
          )}
        </div>   
      </div>  
    </div>
  );
};

export default NewsfeedCard;