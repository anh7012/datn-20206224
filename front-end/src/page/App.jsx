import React, {useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import Nav from "../components/Nav.jsx";
import {appApi} from "../../Apis/appApi.js";
import {Select} from "antd";
import {handleSelectForm} from "../utils/handleSelectForm.js";
import {optionConfig} from "../../config/optionConfig.js";

function App(props) {
    const [data, setData] = useState([])
    const [tienAn, setTienAn] = useState({})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await appApi.getUser();
                setData(res.data)
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchData(); // Gọi hàm async ở đây
    }, []);

    function handleSelect(e) {
        setTienAn(handleSelectForm(e, optionConfig.tienan, 'tienan'))
    }
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
                <Link to={'/test'} className={'text-blue-500 underline text-2xl'}>
                    Go to hello test
                </Link>

            </h1>
            <ul className="timeline">
                <li>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="w-5 h-5">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box">First Macintosh computer</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="w-5 h-5">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box">iMac</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="w-5 h-5">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box">iPod</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="w-5 h-5">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box">iPhone</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="w-5 h-5">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box">Apple Watch</div>
                </li>
            </ul>
            <Nav/>
            <div>
                <Outlet/>
            </div>
            <div>

            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((e, i) => (
                                <tr key={i}>
                                    <th>{e.idUser}</th>
                                    <td>{e.username}</td>
                                    <td>{e.HoTen}</td>
                                    <td>{e.GioiTinh ? 'Nam' : 'Nữ'}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>

            <Select
                onSelect={handleSelect}
                showSearch
                style={{
                    width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                    {
                        value: 'yes',
                        label: 'yes',
                    },
                    {
                        value: 'no',
                        label: 'no',
                    },
                ]}
            />

        </div>

    );
}

export default App;