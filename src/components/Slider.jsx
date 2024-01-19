import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Spinner from "./Spinner";

const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <p className="exploreHeading">Recommended</p>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {listing.map((listing, id) => (
          <SwiperSlide
            key={id}
            onClick={() =>
              navigate(`/category/${listing.data.type}/${listing.id}`)
            }
          >
            <div
              style={{
                backgroundImage: `url(${listing.data.imgUrls[0]})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%",
                height: "400px",
              }}
            >
              <p className="swiperSlideText">{listing.data.name}</p>
              <p className="swiperSlidePrice">
                ${listing.data.discountedPrice ?? listing.data.regularPrice}{" "}
                {listing.data.type === "rent" && "/ month"}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
