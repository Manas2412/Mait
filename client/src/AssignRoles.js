import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useHistory } from "react-router-dom";
import './Home.css';

function AssignRoles() {
    const history = useHistory();
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, []);
    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [RMSname, setRMSname] = useState("");
    const [MANname, setMANname] = useState("");
    const [DISname, setDISname] = useState("");
    const [RETname, setRETname] = useState("");
    const [RMSplace, setRMSplace] = useState("");
    const [MANplace, setMANplace] = useState("");
    const [DISplace, setDISplace] = useState("");
    const [RETplace, setRETplace] = useState("");
    const [RMSaddress, setRMSaddress] = useState("");
    const [MANaddress, setMANaddress] = useState("");
    const [DISaddress, setDISaddress] = useState("");
    const [RETaddress, setRETaddress] = useState("");
    const [RMS, setRMS] = useState({});
    const [MAN, setMAN] = useState({});
    const [DIS, setDIS] = useState({});
    const [RET, setRET] = useState({});

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
            const rmsCtr = await supplychain.methods.rmsCtr().call();
            const rms = {};
            for (let i = 0; i < rmsCtr; i++) {
                rms[i] = await supplychain.methods.RMS(i + 1).call();
            }
            setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (let i = 0; i < manCtr; i++) {
                man[i] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (let i = 0; i < disCtr; i++) {
                dis[i] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (let i = 0; i < retCtr; i++) {
                ret[i] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);
            setloader(false);
        } else {
            window.alert('The smart contract is not deployed to current network');
        }
    };

    if (loader) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );
    }

    const redirect_to_home = () => {
        history.push('/');
    };

    const handlerChangeAddressRMS = (event) => {
        setRMSaddress(event.target.value);
    };
    const handlerChangePlaceRMS = (event) => {
        setRMSplace(event.target.value);
    };
    const handlerChangeNameRMS = (event) => {
        setRMSname(event.target.value);
    };
    const handlerChangeAddressMAN = (event) => {
        setMANaddress(event.target.value);
    };
    const handlerChangePlaceMAN = (event) => {
        setMANplace(event.target.value);
    };
    const handlerChangeNameMAN = (event) => {
        setMANname(event.target.value);
    };
    const handlerChangeAddressDIS = (event) => {
        setDISaddress(event.target.value);
    };
    const handlerChangePlaceDIS = (event) => {
        setDISplace(event.target.value);
    };
    const handlerChangeNameDIS = (event) => {
        setDISname(event.target.value);
    };
    const handlerChangeAddressRET = (event) => {
        setRETaddress(event.target.value);
    };
    const handlerChangePlaceRET = (event) => {
        setRETplace(event.target.value);
    };
    const handlerChangeNameRET = (event) => {
        setRETname(event.target.value);
    };

    const handlerSubmitRMS = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addRMS(RMSaddress, RMSname, RMSplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitMAN = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addManufacturer(MANaddress, MANname, MANplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitDIS = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addDistributor(DISaddress, DISname, DISplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitRET = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addRetailer(RETaddress, RETname, RETplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto grid-container">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6 grid-item">
                    <h4 className="text-2xl font-bold mb-4">Raw Material Supplier</h4>
                    <form onSubmit={handlerSubmitRMS} className="space-y-4">
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangeAddressRMS} placeholder="Ethereum Address" required />
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangeNameRMS} placeholder="Raw Material Supplier Name" required />
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangePlaceRMS} placeholder="Based In" required />
                        <button className="w-full p-2 bg-gray-600 text-white rounded hover:bg-green-600" type="submit">Register</button>
                    </form>
                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Place</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(RMS).map((key) => (
                                <tr key={key}>
                                    <td className="border px-4 py-2">{RMS[key].id}</td>
                                    <td className="border px-4 py-2">{RMS[key].name}</td>
                                    <td className="border px-4 py-2">{RMS[key].place}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6 grid-item">
                    <h4 className="text-2xl font-bold mb-4">Manufacturer</h4>
                    <form onSubmit={handlerSubmitMAN} className="space-y-4">
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangeAddressMAN} placeholder="Ethereum Address" required />
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangeNameMAN} placeholder="Manufacturer Name" required />
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangePlaceMAN} placeholder="Based In" required />
                        <button className="w-full p-2 bg-gray-600 text-white rounded hover:bg-green-600" type="submit">Register</button>
                    </form>
                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Place</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(MAN).map((key) => (
                                <tr key={key}>
                                    <td className="border px-4 py-2">{MAN[key].id}</td>
                                    <td className="border px-4 py-2">{MAN[key].name}</td>
                                    <td className="border px-4 py-2">{MAN[key].place}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6 grid-item">
                    <h4 className="text-2xl font-bold mb-4">Distributor</h4>
                    <form onSubmit={handlerSubmitDIS} className="space-y-4">
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangeAddressDIS} placeholder="Ethereum Address" required />
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangeNameDIS} placeholder="Distributor Name" required />
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangePlaceDIS} placeholder="Based In" required />
                        <button className="w-full p-2 bg-gray-600 text-white rounded hover:bg-green-600" type="submit">Register</button>
                    </form>
                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Place</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(DIS).map((key) => (
                                <tr key={key}>
                                    <td className="border px-4 py-2">{DIS[key].id}</td>
                                    <td className="border px-4 py-2">{DIS[key].name}</td>
                                    <td className="border px-4 py-2">{DIS[key].place}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6 grid-item">
                    <h4 className="text-2xl font-bold mb-4">Retailers</h4>
                    <form onSubmit={handlerSubmitRET} className="space-y-4">
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangeAddressRET} placeholder="Ethereum Address" required />
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangeNameRET} placeholder="Retailer Name" required />
                        <input className="w-full p-2 border border-gray-300 rounded" type="text" onChange={handlerChangePlaceRET} placeholder="Based In" required />
                        <button className="w-full p-2 bg-gray-600 text-white rounded hover:bg-green-600" type="submit">Register</button>
                    </form>
                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Place</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(RET).map((key) => (
                                <tr key={key}>
                                    <td className="border px-4 py-2">{RET[key].id}</td>
                                    <td className="border px-4 py-2">{RET[key].name}</td>
                                    <td className="border px-4 py-2">{RET[key].place}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AssignRoles;
