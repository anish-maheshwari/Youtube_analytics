import { Link, useRouteError } from "react-router-dom"
// import Wrapper from "../assets/wrappers/ErrorPage";
// import img from "../assets/images/not-found.svg";

import img from "/not-found-o2LH7SOx.svg";



const ErrorPage = ()=> {
    const error = useRouteError();
   if(error.status==404){
    return (
        
            <div>
               <img src={img} alt="notfound" />
                <h3>Ohhh Page Not Found</h3>
                <p>We cant seem the page you are looking for </p>
                <Link to="/landing">back home</Link>
            </div>
    
        
    )
   }
    return (
         <Wrapper>
            
            <div>
                <h3>Something Went Wrong</h3>
            </div>

         </Wrapper> 
    
    );
};
export default ErrorPage;