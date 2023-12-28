import { Link } from "react-router-dom";

export async function loader() {
    return null;
}
  
export default function Home() {
    return (
        <div className="flow container">
            <h2 className="flex flex-center container">Welcome to Movie App</h2>
            <div className="flow">
                <h3>Discover amazing movies, create your own collection, and more!</h3>
                <Link className=" text-blue ff-sans-normal" to="moviesdb">
                    Get Started &rarr;
                </Link>
            </div>
            <div className="flow">
                <h3 className="flex ">Explore Movies</h3>
                <em>Discover a vast collection of movies from various genres.</em>
                <Link className=" text-blue" to="moviesdb">
                Link to TMDB &rarr;
                </Link>
            </div>
            <div className="flow">
                <h3 className="flex ">Create Collections</h3>
                <em>Build and manage your personalized movie collections.</em>
                <em>Add your favorite movies to your list and access them easily.</em>
                <Link className=" text-blue" to="movies">
                Link to My Movies &rarr;
                </Link>
            </div>
            <div className="flow grid grid-items-center">
                <h3>Follow Us</h3>
                <div className="flex">
                    <a 
                        className="flex text-blue" 
                        href="https://www.facebook.com/" 
                        target="_blank" 
                        rel="noopener noreferrer">
                        <i className="fa fa-facebook"></i>
                    </a>
                <a 
                    className="flex text-blue" 
                    href="https://www.twitter.com/" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <i className="fa fa-twitter"></i>
                </a>
                <a
                    className="flex text-blue" 
                    href="https://www.instagram.com/" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <i className="fa fa-instagram"></i>
                </a>
            </div>
        </div>
    </div>
    );
}
