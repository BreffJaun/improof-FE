import { useNavigate } from "react-router";
import ReactPlayer from "react-player";

const NewsfeedCard = ({stone, projectId}) => {
  const paragraphs = stone?.description?.split("\n");
  const navigate = useNavigate()

  return (
    <div className="mt1">
      <div>
        <h4 onClick={()=>navigate(`/projectdetails/${projectId}`)}>{stone.title}</h4>
        <div className="mt05">  
        {paragraphs?.map((par, i) => (
            <div key={stone._id+i}>
              <span>{par}</span>
              <br />
            </div>
          ))}
        </div>
        <div className="player" onClick={()=>navigate(`/projectdetails/${projectId}`)}>
          {!stone.media ? null : stone.contentType.includes("image") ? (
            <img className="player" src={stone.media} />
          ) : (
            <div >
              <ReactPlayer
                url={stone.media}
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