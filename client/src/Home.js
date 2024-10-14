import React from 'react';
import { useHistory } from "react-router-dom";
import './Home.css';
import { FaIndustry, FaTruck, FaPills, FaSearch } from 'react-icons/fa';



function Home() {
    const history = useHistory();

    // Navigation handlers
    const redirect_to_roles = () => {
        history.push('/roles');
    };
    const redirect_to_addmed = () => {
        history.push('/addmed');
    };
    const redirect_to_supply = () => {
        history.push('/supply');
    };
    const redirect_to_track = () => {
        history.push('/track');
    };

    return (
        <div className="home-container">
            
            <h3>PHARMA</h3>
            <p className="note">(Note: Here <u>Owner</u> is the person who deployed the smart contract on the blockchain)</p>
            
            <div className="grid-container">
                {/* Register Roles Section */}
                <div className="grid-item" onClick={redirect_to_roles}>
                    <h5><FaIndustry /> Register Roles</h5>
                    <img src="https://cdn.dribbble.com/users/988448/screenshots/5240042/icon_cadastro_v5.gif" alt="Register Roles" className="step-image mb-4" />
                    <button className="btn btn-primary">Register</button>
                </div>
                
                {/* Order Medicines Section */}
                <div className="grid-item" onClick={redirect_to_addmed}>
                    <h5><FaPills /> Order Medicines</h5>
                    <img src="https://cdn.dribbble.com/users/4279575/screenshots/15172726/ezgif-5-e218fcce74d2.gif" alt="Order Medicines" className="step-image mb-3" />
                    <button className="btn btn-primary">Order Medicines</button>
                </div>
                
                {/* Control Supply Chain Section */}
                <div className="grid-item" onClick={redirect_to_supply}>
                    <h5><FaTruck /> Control Supply Chain</h5>
                    <img src="https://pro2-bar-s3-cdn-cf3.myportfolio.com/ec4657434c011e1a856a01752ef5f2f5/4660f53b1f7bff3a445995d3_rw_1200.gif?h=871b45bae2217a2953957135bcf4446a" alt="Control Supply Chain" className="step-image" />
                    <button className="btn btn-primary">Control Supply Chain</button>
                </div>
                
                {/* Track Medicines Section */}
                <div className="grid-item" onClick={redirect_to_track}>
                    <h5><FaSearch /> Track Medicines</h5>
                    <img src="https://dtlive.s3.ap-south-1.amazonaws.com/16651/Medical-Animated-GIF-Icon-Pack1-1.gif" alt="Track Medicines" className="step-image mb-5" />
                    <button className="btn btn-primary">Track Medicines</button>
                </div>
            </div>
        </div>
    );
}

export default Home;