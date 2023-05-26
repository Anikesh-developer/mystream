import React ,{useState} from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentwrapper/Contentwrapper';
import noResults from '../../assets/no-results.png';
import './style.scss';
import { useEffect } from 'react';
import SingleContent from '../../components/singleContent/SingleContent';

const Search = () => {

  const [data,setData] = useState(null);
  const [pagenum,setPageNum] = useState(1);
  const [loading ,setLoading] = useState(false);
  const {query} = useParams();

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/mystream/search/multi?query=${query}&page=${pagenum}`).then ((res)=> {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }

  // in the below code we are merging the previous data and new page data , in this case previous data can be data from page 1,2,3 etc and we are merging it with next page data i.e. 2,3,4 respectivily .

  const fetchNextPageData = () => {
    fetchDataFromApi (`/mystream/search/multi?query=${query}&page=${pagenum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,results : [...data?.results,...res.results]
        })
      } else {
        setData(res)
        // in the else we are just passing the (res) because if no previus data is there then it should whatever there in the current data inside (res)
      }
      setPageNum((prev) => prev +1 )
    })
  }
  console.log(data);
  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query])

  return (
    <div className='searchResultsPage'>
      {!loading && (
        <ContentWrapper>
          {data?.results?.length >0 ? (
            <>  
                <div className="pageTitle">
                  {`search ${data.total_results > 1 ? "results" : "result"} of '${query}'`}
                </div>
                <InfiniteScroll className='content' dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pagenum <= data?.total_pages} >
                  <div className='trending'>
                    {/* in the below code we used data.result instead of data because data.result is an function and we can parse through array using map function on the other hand data is not a function */}
                  {  
                    data.results && data?.results?.map((c) => {
                      if (c.media_type === "person") return ;
                      return (
                      <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type} vote={c?.vote_average}/>
                  )})}
                  </div>
                </InfiniteScroll>
            </>
          ) : (
            <span className="resultnotfound">
              Sorry , Result not found !
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default Search
