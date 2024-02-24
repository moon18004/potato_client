import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from './Category';
import styles from '../../styles/community/slider.module.css'

export default function CategorySlider({categories, callback, selected}) {

	// const [activeTab, setActiveTab] = useState(0);

	// const handleCategory = (cat) => {
  //   setActiveTab(cat.id);

  //   setFiltered(posts.filter((item) => item.category === cat.name));
  // };

	// const categories = [
  //   { id: 0, name: 'ALL', content: 'All' },
  //   { id: 1, name: 'QUESTION', content: 'Question' },
  //   { id: 2, name: 'CHITCHAT', content: 'Chitchat' },
  //   { id: 3, name: 'SOCIAL', content: 'Social' },
  //   { id: 4, name: 'TIP', content: 'Tip' },
  //   { id: 5, name: 'ETC', content: 'Etc' },
  // ];

	const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
		slidesToScroll: 1,
    speed: 500,
		variableWidth: true
  };
	
	return (
		<Slider {...settings}>
			{categories.map((category, index) => {
          return (
            <Category
              key={category.id}
              category={category}
              callback={callback}
              selected={selected}
            />
          );
        })}
      {/* <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div> */}
		</Slider>
	);
}

