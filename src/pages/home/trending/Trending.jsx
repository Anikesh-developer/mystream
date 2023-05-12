import React from 'react';
import { useState } from 'react';
import ContentWrapper from '../../../components/contentwrapper/Contentwrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from "../../../hooks/useFetch";

const Trending = () => {

  const [endpoint,setEndPoint] = useState("day");

  const {data , loading} = useState() 

  const onTabChange = (tab) => {};

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs date={["Day" , "Week" ,"Months"]} onTabChange={onTabChange} />
            {/* here we are passing prop as array because to make it dynamic example we can create Day wise , week wise or month wise etc*/}
        </ContentWrapper>
    </div>
  )
}

export default Trending
