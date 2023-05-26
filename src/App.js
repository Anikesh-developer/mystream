import { useEffect } from "react";
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import {fetchDataFromApi} from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import {getApiConfiguration} from './store/homeSlice';
import {Movie , Home , Search , Details, TV} from './pages';
import {Footer , Header} from  './components';

function App() {

  const dispatch = useDispatch();

  const {url} = useSelector((state) => state.home)

  useEffect(() => {
    fetchApiConfig();
  },[]);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
    .then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      }

      dispatch(getApiConfiguration(url));
    })
  }

  return (
    // <div className="App">
    //   {url?.total_pages}
    //   {/* here we using ? after url because url will take time to load and will through error which will break the application to prevent it from breaking we use ? */}
    // </div> this was only for testing api
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/mystream" element={<Home />} ></Route>
      <Route path="/mystream:media_type/:id" element={<Details />} ></Route>
      <Route path="/mystream/search/:query" element={<Search />} />
      <Route path="/mystream/movie" element={<Movie />} />
      <Route path="/mystream/tv" element={<TV />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;