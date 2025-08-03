import './CityFinder.css';
import Instruction from './Instruction/Instruction.jsx'
import GoogleMap from './GoogleMap/GoogleMap.jsx';

const CityFinder = () => {
  return (
    <div id="city-finder">
        <Instruction />
        <GoogleMap />
    </div>
  );
}

export default CityFinder;