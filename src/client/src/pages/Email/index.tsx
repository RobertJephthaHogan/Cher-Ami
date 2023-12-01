import React, { useEffect, useMemo, useState } from 'react'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'
import './styles.css'
import { Button, Modal, Space, Table, Tag } from 'antd'
import EmailCampaignBuilder from '../../components/EmailCampaignBuilder'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import emailCampaignActions from '../../redux/actions/emailCampaign'
import contactListActions from '../../redux/actions/contactList'


export default function Email() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const userEmailCampaigns = useSelector((state: any) => state.emailCampaigns?.queryResult ?? [])
    const [cnecModalOpen, setCnecModalOpen] = useState<any>()
    const [tableData, setTableData] = useState<any>([])
    
    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(emailCampaignActions.setEmailCampaigns(currentUser?._id))
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }


    useMemo(() => {
        const formattedTableData = userEmailCampaigns?.map((ec: any, i: any) => {

            return (
                {
                    key: i,
                    ...ec
                }
            )
        }) || []
        setTableData(formattedTableData)
    }, [userEmailCampaigns])

    const columns: any = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Send From Email',
            dataIndex: 'sendFromEmail',
            key: 'sendFromEmail',
        },
        // {
        //     title: 'Email Body',
        //     dataIndex: 'emailBody',
        //     key: 'emailBody',
        // },
        {
            title: 'Recipient Contact Lists',
            key: 'recipientContactLists',
            dataIndex: 'recipientContactLists',
            render: (_: any, { recipientContactLists }: any) => (
              <>
                {recipientContactLists?.map((tag: any) => {
                  let color = 'geekblue'
                  const matchingContactList = userContactLists?.find((cl: any) => cl?.id === tag)
                  return (
                    <Tag color={color} key={tag}>
                      {matchingContactList?.name ? matchingContactList?.name : tag}
                    </Tag>
                  );
                })}
              </>
            ),
        },
        {
            title: 'Frequency',
            key: 'frequency',
            render: (_: any, record: any) => (
                <Tag>
                    {record?.frequency?.frequencyType}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a>Details</a>
                    <a>Use as Template</a>
                </Space>
            ),
        },
    ];
      
    const data: any = [
        {
          key: '1',
          title: 'Mock Title',
          sendFromEmail: 'mockEmail@gmail.com',
          emailBody: 'body',
          recipientContactLists: [ 'list 1', 'list 2'],
          frequency: {
            frequencyType: 'oneTime',
            sendDate: '',
            sendInitial: true
          },
          address: 'New York No. 1 Lake Park',
        },
    ];

    return (
        <div className='email-component'>
            <div className='email-component-title-bar'>
                <span className='email-component-title'>
                    Email Campaigns
                </span>
            </div>
            <div className='email-data-bar'>
                <div className='data-bar-info-container'>
                    <div className='data-bar-info-card'>
                        <div className='dbic-left'>
                            <span>
                                <NotificationOutlined
                                    className='dbic-logo'
                                />
                            </span>
                        </div>
                        <div className='dbic-right'>
                            <div className='dbic-right-content'>
                                <span className='dbic-main-text'>
                                    Total Email Campaigns
                                </span>
                                <span className='dbic-sub-text'>
                                    14
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='data-bar-info-card'>
                        <div className='dbic-left'>
                            <span>
                                <SendOutlined
                                    className='dbic-logo'
                                />
                            </span>
                        </div>
                        <div className='dbic-right'>
                            <div className='dbic-right-content'>
                                <span className='dbic-main-text'>
                                    Emails Sent
                                </span>
                                <span className='dbic-sub-text'>
                                    124,031
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='data-bar-info-card'>
                        <div className='dbic-left'>
                            <span>
                                <MailOutlined
                                    className='dbic-logo'
                                />
                            </span>
                        </div>
                        <div className='dbic-right'>
                            <div className='dbic-right-content'>
                                <span className='dbic-main-text'>
                                    Contacts Accessible Via Email
                                </span>
                                <span className='dbic-sub-text'>
                                    18,213
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='data-bar-actions-container'>
                    <div className='data-bar-actions-card'>
                        <Button 
                            type='primary' 
                            className='cnec-btn'
                            onClick={() => setCnecModalOpen(true)}
                        >
                            Create New Email Campaign
                        </Button>
                    </div>
                </div>
            </div>

            <div className='email-component-body'>
                {/* <div>
                    <span>
                        Email Campaigns
                    </span>
                </div> */}
                <div className='email-component-table-container'>
                    <Table 
                        dataSource={tableData} 
                        columns={columns} 
                    />
                </div>
            </div>

            <Modal 
                title="Email Campaign Builder" 
                open={cnecModalOpen} 
                onOk={() => setCnecModalOpen(false)} 
                onCancel={() => setCnecModalOpen(false)}
                footer={null}
            >
                <EmailCampaignBuilder
                    closeParent={() => setCnecModalOpen(false)}
                />
            </Modal>
        </div>
    )
}