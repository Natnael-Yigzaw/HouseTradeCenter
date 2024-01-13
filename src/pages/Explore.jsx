import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import saleCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

const Explore = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <Slider />
        <p className="expolreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for Rent</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={saleCategoryImage}
              alt="sale"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for Sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
