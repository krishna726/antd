import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import axios from "axios";
const SubTable = (props) => {

    const deleteIcon = <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" /></svg>
    //Columns for first child table
    const columns = [
        {
            title: '',
            dataIndex: '',
        },
        {
            title: record => record.npi,
            dataIndex: 'npi',
            render: text => text
        },
        {
            title: '',
            dataIndex: '',
            onCell: (_, index) => ({
                colSpan: 2
            }),
        },
        {
            title: 'Recipients',
            dataIndex: 'npi',
            render: text => <button type="button">Add Additional Recipients</button>
        },
        {
            title: 'Action',
            dataIndex: 'npi',
            render: (text, record, index) => deleteIcon

        },
    ];
    // let dataFromProps = [
    //     {
    //         "9618": {
    //             "id": "3340",
    //             "npi": "1982167706",
    //             "payerproviderid": null,
    //             "status": "OK",
    //             "statusdescription": "OK",
    //             "recipients": [
    //                 {
    //                     "contactid": "806",
    //                     "firstname": "Tejaswi",
    //                     "lastname": "Bhondave",
    //                     "akaname": "aka32162803885",
    //                     "userid": "tejaswiqa001",
    //                     "userrole": "User",
    //                     "email": "Tejaswi.Bhondave@anthem.com",
    //                     "status": "OK",
    //                     "statusdescription": "OK",
    //                     "channels": [
    //                         {
    //                             "id": "4864",
    //                             "name": "Email",
    //                             "value": "Tejaswi.Bhondave@anthem.com"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "contactid": "1368",
    //                     "firstname": "Denise",
    //                     "lastname": "Bell",
    //                     "akaname": "aka10476157615",
    //                     "userid": "DeniseBell",
    //                     "userrole": "User Admin",
    //                     "email": "denise.bell@anthem.com",
    //                     "status": "OK",
    //                     "statusdescription": "OK",
    //                     "channels": [
    //                         {
    //                             "id": "6165",
    //                             "name": "Email",
    //                             "value": "denise.bell@anthem.com"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "contactid": "1369",
    //                     "firstname": "Nicole",
    //                     "lastname": "Alexander",
    //                     "akaname": "aka71553471778",
    //                     "userid": "AD42911",
    //                     "userrole": "User Admin",
    //                     "email": "nicole.alexander@anthem.com",
    //                     "status": "OK",
    //                     "statusdescription": "OK",
    //                     "channels": [
    //                         {
    //                             "id": "6171",
    //                             "name": "Email",
    //                             "value": "nicole.alexander@anthem.com"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     },
    //     {
    //         "9619": {
    //             "id": "3920",
    //             "npi": "1720412380",
    //             "payerproviderid": null,
    //             "status": "OK",
    //             "statusdescription": "OK",
    //             "recipients": [
    //                 {
    //                     "contactid": "747",
    //                     "firstname": "Ang",
    //                     "lastname": "Gabert",
    //                     "akaname": "aka40764070236",
    //                     "userid": "Sandymixed",
    //                     "userrole": "User Admin",
    //                     "email": "anggabert@yahoo.com",
    //                     "status": "OK",
    //                     "statusdescription": "OK",
    //                     "channels": [
    //                         {
    //                             "id": "6158",
    //                             "name": "Email",
    //                             "value": "anggabert@yahoo.com"
    //                         },
    //                         {
    //                             "id": "6190",
    //                             "name": "Email",
    //                             "value": "anggabert@yahoo.com"
    //                         },
    //                         {
    //                             "id": "6159",
    //                             "name": "Email",
    //                             "value": "anggabert@yahoo.com"
    //                         },
    //                         {
    //                             "id": "6160",
    //                             "name": "Email",
    //                             "value": "anggabert@yahoo.com"
    //                         },
    //                         {
    //                             "id": "6192",
    //                             "name": "Email",
    //                             "value": "anggabert@yahoo.com"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "contactid": "1246",
    //                     "firstname": "Chaitanya",
    //                     "lastname": "Nallamala",
    //                     "akaname": "aka63467644252",
    //                     "userid": "ChaitanyaN",
    //                     "userrole": "User Admin",
    //                     "email": "chaitanya.nallamala2@elevancehealth.com",
    //                     "status": "OK",
    //                     "statusdescription": "OK",
    //                     "channels": [
    //                         {
    //                             "id": "5927",
    //                             "name": "Email",
    //                             "value": "chaitanya.nallamala2@elevancehealth.com"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "contactid": "1247",
    //                     "firstname": "Karthik",
    //                     "lastname": "Nataru",
    //                     "akaname": "aka25617142043",
    //                     "userid": "AL16584",
    //                     "userrole": "User Admin",
    //                     "email": "karthik.nataru@elevancehealth.com",
    //                     "status": "OK",
    //                     "statusdescription": "OK",
    //                     "channels": [
    //                         {
    //                             "id": "5928",
    //                             "name": "Email",
    //                             "value": "karthik.nataru@elevancehealth.com"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         } 
    //     }

    // ];

    const [tableData, setTableData] = useState(props.data);
    const [tableLoading, setTableLoading] = useState(false);

    useEffect(() => {
        console.log('component reloaded', tableData)
    }, [tableData])

    const fetchData = async () => {
        setTableLoading(true)
        try {
            const response = await axios.get(`http://localhost:3001/users`);
            console.log(response.data, 'table data after fetch');
            setTableLoading(false);
            setTableData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteRecord = async () => {
        setTableLoading(true)
        try {
            const response = await axios.delete(`http://localhost:3001/users`);
            setTableLoading(false);
            setTableData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="NPI-header"><span>NPI(s)</span><span><button type="button">Setup Additional NPI(s)</button></span></div>
            <button type="button"  onClick={fetchData}>Reload Data</button>
            <div className="SubTable">
                <Table
                    loading={tableLoading}
                    rowClassName="SubTableRow"
                    size="small"
                    showHeader={false}
                    expandable={{
                        defaultExpandAllRows: true,
                        showExpandColumn: false,
                        expandedRowRender: (record) => {
                            //columns for sub child table NPI(s)
                            const childTableColumns = [
                                {
                                    title: '',
                                    dataIndex: '',
                                },
                                {
                                    title: '',
                                    dataIndex: '',
                                },
                                {
                                    title: '',
                                    dataIndex: '',
                                    render: (record) => record.firstname + ", " + record.lastname
                                },
                                {
                                    title: '',
                                    dataIndex: 'userid',
                                },
                                {
                                    title: '',
                                    dataIndex: 'userrole',
                                },
                                {
                                    title: '',
                                    dataIndex: 'email',
                                },
                                {
                                    title: '',
                                    dataIndex: '',
                                    render: (record) => <button type="button" onClick={deleteRecord} id={record.contactid} >Delete this record</button>,
                                }
                            ];
                            return <Table className="secondSubTable" rowClassName="secondSubTableRow" size="small" showHeader={false} columns={childTableColumns} dataSource={record.recipients} pagination={false} />
                        },
                    }}
                    columns={columns} dataSource={tableData} pagination={false} />
            </div>
        </>)
}

export default SubTable;