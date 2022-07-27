import MapPage from '../pages/MapPage/MapPage'
import JamListPage from './JamListPage/JamListPage';

function HomePage() {
  return (
    <div>
      <section className='section-principal'>
      <h1>Jam Sessions</h1>
      <h3>Don't be shy, come to play with us</h3>
      </section>
      <div className='container-section'>
      <div className='container-info'>
        <JamListPage/>
      </div>
      <MapPage/>
      </div>
    </div>
  );
}

export default HomePage;