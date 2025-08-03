import './Navbar.css';

const Navbar = () => {
    return (
        <div className="main-navigation">
            <div className="logo"></div>
            <div className="nav-buttons">
                <button className="nav-button city-finder-button">City Finder</button>
                <button className="nav-button air-pic-button">Air Pic Quiz</button>
                <button className="nav-button highscores-button">Highscores</button>
                <button className="nav-button about-button">About</button>
            </div>
        </div>
    )
}

export default Navbar