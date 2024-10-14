import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import './Home.css';

function Track() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedStage, setMedStage] = useState();
    const [ID, setID] = useState();
    const [RMS, setRMS] = useState();
    const [MAN, setMAN] = useState();
    const [DIS, setDIS] = useState();
    const [RET, setRET] = useState();
    const [TrackTillSold, showTrackTillSold] = useState(false);
    const [TrackTillRetail, showTrackTillRetail] = useState(false);
    const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
    const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
    const [TrackTillRMS, showTrackTillRMS] = useState(false);
    const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };
    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            var i;
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            const rmsCtr = await supplychain.methods.rmsCtr().call();
            const rms = {};
            for (i = 0; i < rmsCtr; i++) {
                rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
            }
            setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i + 1] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (i = 0; i < retCtr; i++) {
                ret[i + 1] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )
    }
    if (TrackTillSold) {
        return (
            <div className="container-xl bg-light p-4 rounded shadow-sm items-center ">
                <article className="col-4 mb-4 grid-item">
                    <h3 className="text-dark grid-item"><b>Medicine</b></h3>
                    <img src = "https://www.pinclipart.com/picdir/big/194-1946341_pharmacology-pill-clipart.png" alt="Medicine" className="step-image mb-3 img-fluid" style={{ maxWidth: "200px", height: "auto" }}></img>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row grid-item">
                    <article className="col-3 mb-4 p-3 bg- rounded shadow-sm text-center grid-item ">
                        <h4 className="text-dark mb-4">Raw Materials Supplied by</h4>
                        <img src = "https://i.pinimg.com/originals/0f/bb/77/0fbb775d6e5964c3f03457411afcab61.gif" alt="Raw Materials Supplied by" className="step-image mb-3 img-fluid" style={{ maxWidth: "150px", height: "auto" }}></img>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm grid-item">
                        <h4 className="text-dark mb-11">Manufactured by</h4>
                        <img src = "https://www.bioagilytix.com/wp-content/uploads/2022/09/09.optimized.gif" alt="Manufactured by" className="step-image mb-10 "></img>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark mb-4">Distributed by</h4>
                        <img src = "https://s3.distributorcentral.com/uploads/2/9/29A1C6EC40FFD7C506DCB6FF7A0AD7FA.gif" alt="Distributed by" className="step-image mb-10"></img>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark">Retailed by</h4>
                        <img src = "https://i.pinimg.com/originals/17/7c/48/177c4870cfc4563a28614ed7e75de1be.gif" alt="Retailed by" className="step-image"></img>
                        <p><b>Retailer ID: </b>{RET[MED[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[MED[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[MED[ID].RETid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark">Sold</h4>
                        <img src = "https://www.typecalendar.com/wp-content/uploads/2023/09/Sold-Sign-1200x1200.jpg" ></img>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-success btn-sm mt-3">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm mt-3 ml-2"> HOME</span>
            </div >
        )
    }
    if (TrackTillRetail) {
        return (
            <div className="container-xl bg-light p-4 rounded shadow-sm grid-item">
                <article className="col-4 mb-4 grid-item">
                    <h3 className="text-dark"><b>Medicine</b></h3>
                    <img src = "https://www.pinclipart.com/picdir/big/194-1946341_pharmacology-pill-clipart.png" alt="Medicine" className="step-image mb-3 img-fluid" style={{ maxWidth: "200px", height: "auto" }}></img>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark">Raw Materials Supplied by</h4>
                        <img src = "https://i.pinimg.com/originals/0f/bb/77/0fbb775d6e5964c3f03457411afcab61.gif" alt="Raw Materials Supplied by" className="step-image mb-3 img-fluid" style={{ maxWidth: "150px", height: "auto" }}></img>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark"><u>Manufactured by:</u></h4>
                        <img src = "https://www.bioagilytix.com/wp-content/uploads/2022/09/09.optimized.gif" alt="Manufactured by" className="step-image mb-10 "></img>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark"><u>Distributed by:</u></h4>
                        <img src = "https://s3.distributorcentral.com/uploads/2/9/29A1C6EC40FFD7C506DCB6FF7A0AD7FA.gif" alt="Distributed by" className="step-image mb-10"></img>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark"><u>Retailed by:</u></h4>
                        <p><b>Retailer ID: </b>{RET[MED[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[MED[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[MED[ID].RETid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillRetail(false);
                }} className="btn btn-outline-success btn-sm mt-3">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm mt-3 ml-2"> HOME</span>
            </div >
        )
    }
    if (TrackTillDistribution) {
        return (
            <div className="container-xl bg-light p-4 rounded shadow-sm">
                <article className="col-4 mb-4">
                    <h3 className="text-primary"><b><u>Medicine:</u></b></h3>
                    <img src = "https://www.pinclipart.com/picdir/big/194-1946341_pharmacology-pill-clipart.png" alt="Medicine" className="step-image mb-3 img-fluid" style={{ maxWidth: "200px", height: "auto" }}></img>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark"><u>Raw Materials Supplied by:</u></h4>
                        <img src = "https://i.pinimg.com/originals/0f/bb/77/0fbb775d6e5964c3f03457411afcab61.gif" alt="Raw Materials Supplied by" className="step-image mb-3 img-fluid" style={{ maxWidth: "150px", height: "auto" }}></img>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark"><u>Manufactured by:</u></h4>
                        <img src = "https://www.bioagilytix.com/wp-content/uploads/2022/09/09.optimized.gif" alt="Manufactured by" className="step-image mb-10 "></img>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark"><u>Distributed by:</u></h4>
                        <img src = "https://s3.distributorcentral.com/uploads/2/9/29A1C6EC40FFD7C506DCB6FF7A0AD7FA.gif" alt="Distributed by" className="step-image mb-10"></img>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillDistribution(false);
                }} className="btn btn-outline-success btn-sm mt-3">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm mt-3 ml-2"> HOME</span>
            </div >
        )
    }
    if (TrackTillManufacture) {
        return (
            <div className="container-xl bg-light p-4 rounded shadow-sm">
                <article className="col-4 mb-4">
                    <h3 className="text-dark"><b>Medicine</b></h3>
                    <img src = "https://www.pinclipart.com/picdir/big/194-1946341_pharmacology-pill-clipart.png" alt="Medicine" className="step-image mb-3 img-fluid" style={{ maxWidth: "200px", height: "auto" }}></img>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark">Raw Materials Supplied by</h4>
                        <img src = "https://i.pinimg.com/originals/0f/bb/77/0fbb775d6e5964c3f03457411afcab61.gif" alt="Raw Materials Supplied by" className="step-image mb-3 img-fluid" style={{ maxWidth: "150px", height: "auto" }}></img>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span className="mx-2">&#10132;</span>
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark">Manufactured by</h4>
                        <img src = "https://www.bioagilytix.com/wp-content/uploads/2022/09/09.optimized.gif" alt="Manufactured by" className="step-image mb-10 "></img>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillManufacture(false);
                }} className="btn btn-outline-success btn-sm mt-3">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm mt-3 ml-2"> HOME</span>
            </div >
        )
    }
    if (TrackTillRMS) {
        return (
            <div className="container-xl bg-light p-4 rounded shadow-sm">
                <article className="col-4 mb-4">
                    <h3 className="text-primary"><b>Medicine</b></h3>
                    <img src = "https://www.pinclipart.com/picdir/big/194-1946341_pharmacology-pill-clipart.png" alt="Medicine" className="step-image mb-3 img-fluid" style={{ maxWidth: "200px", height: "auto" }}></img>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">
                    <article className="col-3 mb-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="text-dark">Raw Materials Supplied by</h4>
                        <img src = "https://i.pinimg.com/originals/0f/bb/77/0fbb775d6e5964c3f03457411afcab61.gif" alt="Raw Materials Supplied by" className="step-image mb-3 img-fluid" style={{ maxWidth: "150px", height: "auto" }}></img>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillRMS(false);
                }} className="btn btn-outline-success btn-sm mt-3">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm mt-3 ml-2"> HOME</span>
            </div >
        )
    }
    if (TrackTillOrdered) {
        return (
            <div className="container-xl bg-light p-4 rounded shadow-sm">
                <article className="col-4 mb-4">
                    <h3 className="text-dark"><b>Medicine</b></h3>
                    <img src = "https://www.pinclipart.com/picdir/big/194-1946341_pharmacology-pill-clipart.png" alt="Medicine" className="step-image mb-3 img-fluid" style={{ maxWidth: "200px", height: "auto" }}></img>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                    <hr />
                    <br />
                    <h5 className="text-warning">Medicine Not Yet Processed...</h5>
                    <button onClick={() => {
                        showTrackTillOrdered(false);
                    }} className="btn btn-outline-success btn-sm mt-3">Track Another Item</button>
                    <span onClick={() => {
                        history.push('/')
                    }} className="btn btn-outline-danger btn-sm mt-3 ml-2"> HOME</span>
                </article>
            </div>
        )
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerSubmit = async (event) => {
        event.preventDefault();
        var ctr = await SupplyChain.methods.medicineCtr().call();
        if (!((ID > 0) && (ID <= ctr)))
            alert("Invalid Medicine ID!!!");
        else {
            // eslint-disable-next-line
            if (MED[ID].stage == 5)
                showTrackTillSold(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 4)
                showTrackTillRetail(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 3)
                showTrackTillDistribution(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 2)
                showTrackTillManufacture(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 1)
                showTrackTillRMS(true);
            else
                showTrackTillOrdered(true);

        }
    }

    return (
        <div className='flex flex-col my-6' style={{ display: 'flex', justifyContent: 'center' }}>
            <h3>Track Medicines</h3>
            <h5>Enter Medicine ID to Track it</h5>
            <form onSubmit={handlerSubmit} className='flex gap-3 justify-center items-center'>
                <input className="form-control-sm border-solid border-2 shadow" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                <button className="btn btn-outline-success btn-sm my-3 shadow" onSubmit={handlerSubmit}>Track</button>
            </form>
            <table className=" table table-bordered table-striped table-hover text-lg shadow" style={{ width: '94%' }}>
                <thead className='thead-dark'>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MED).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MED[key].id}</td>
                                <td>{MED[key].name}</td>
                                <td>{MED[key].description}</td>
                                <td>
                                    {
                                        MedStage[key]
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </div>
    )
}

export default Track
