import React from 'react';
import {useEffect, useState} from 'react'
import {Divider, Table, Tag, Card} from "antd";
import {ColumnsType} from "antd/es/table";
import axios from "axios";

interface DataType {
    key: string;
    name: string;
    url: string;
    description: string;
    creation: Date;
    contributors_count: number;
    contributors: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },

    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        render: (text) => <a href={text} target="_blank">{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Creation',
        dataIndex: 'creation',
        key: 'creation',
        render: (text) => <Divider
            orientation={"center"}>{getDate(text).getFullYear() + '-' + getDate(text).getMonth() + '-' + getDate(text).getDay() + "    " + getDate(text).getHours() + ':' + getDate(text).getMinutes() + ':' + getDate(text).getSeconds()}</Divider>
    },
    {
        title: 'Contributors count',
        dataIndex: 'contributorsCount',
        key: 'contributors_count',
        render: (text) => <Divider orientation={"center"}>{text}</Divider>
    },
    {
        title: 'Contributors',
        key: 'contributors',
        dataIndex: 'contributors',
        render: (_, {contributors}) => (
            <>
                {contributors.map((contributor) => {
                    return (
                        <Tag>
                            {contributor}
                        </Tag>
                    );
                })}
            </>
        ),
    },
];


export const GetPost = () => {
    const [response, setResponse] = useState<DataType[]>([])
    useEffect(() => {
        axios.get('http://localhost:8080/api/repositories')
            .then(response => setResponse(response.data));
    }, []);
    return (response)
}

const getDate = (text: string) => {
    try {
        return (new Date(Date.parse(text)))
    } catch (error) {
        return (new Date(Date.parse("")))
    }
}

export const GitTable: React.FC = () => <Card title={"Сохраненные репозитории"}><Table columns={columns} dataSource={GetPost()}/></Card>;