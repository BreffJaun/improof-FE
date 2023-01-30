const TALENT = {
  profile:{
    firstName: "*", 
    lastName: "*", 
    email: "*", 
    password: "*", 
    confirmPass: "only FE-check", 
    isTalent: false, 
    isRecruiter: false, 
    colorSchema: "",
    description: "",
    goal: "",
    position:"",
    toolsAndSkills: "",
  },
  location:{
    street:"*",
    zip:"*",
    city:"*"
  },    
  contact: {
    mobile: "",
    website: "",
    online1:"",
    online2:"",
    online3:""
  }
}


const RECRUITER = {
  profile:{
    firstName: "*", 
    lastName: "*", 
    email: "*", 
    password: "*", 
    confirmPw: "only FE-check", 
    isTalent: false, 
    isRecruiter: false, 
    colorSchema: "",
    description: ""
  }, 
  contact: {
    mobile: "",
    website: "",
    company: ""
  }
}

const PROJECT = {
  name: "*",
  description:"*",
  thumbnail:"",
  color:"",
  category:"selection [Webdevelopment, Onlinemarketing, Social-Media-Management, Electrical Engeneering, Metalwork, Woodwork, Handwork, Gardening, Gastronomy, Pedegogy, Sciene, Kunst, whatever ]",
  team: ["Object.Id"],
  private:Boolean
}

const STONE = {
  kind: "*",
  title: "*",
  description:"",
  media: "",
  contributors:["", ""],

}

const SEARCH = { // ONE IS required
  searchName: "",
  position: "",
  toolsAndSkills: "",
  zip: "",
  searchRadius: Number,
  werHatGesucht: "Object.ID"
}

const CONVERSATION = {
  participantT:"Object.ID",
  participantR:"Object.ID",
  message:"Object.ID"
}

const MESSAGE = {
  from: "Object.ID",
  text: ""
}

const NOTIFICATION = {
  receiverT: "Object.ID",
  receiverR: "Object.ID",
  text: ""
}