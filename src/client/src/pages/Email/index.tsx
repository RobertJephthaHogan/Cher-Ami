import React, { useEffect, useMemo, useState } from 'react'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import './styles.css'
import { Button, Modal, Space, Table, Tag } from 'antd'
import EmailCampaignBuilder from '../../components/EmailCampaignBuilder'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import emailCampaignActions from '../../redux/actions/emailCampaign'
import contactListActions from '../../redux/actions/contactList'
import EmailDetails from '../../components/EmailDetails'


export default function Email() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const userEmailCampaigns = useSelector((state: any) => state.emailCampaigns?.queryResult ?? [])
    const [cnecModalOpen, setCnecModalOpen] = useState<any>()
    const [tableData, setTableData] = useState<any>([])
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
    const [selectedDetails, setSelectedDetails] = useState<any>()

    
    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(emailCampaignActions.setEmailCampaigns(currentUser?._id))
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }

    useEffect(() => {
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

    function viewEmailDetails(emailDetails: any) {
        setIsDetailsModalOpen(true)
        setSelectedDetails(emailDetails)
    }

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
            title: 'Subject',
            dataIndex: 'emailSubject',
            key: 'emailSubject',
        },
        {
            title: 'Send From Email',
            dataIndex: 'sendFromEmail',
            key: 'sendFromEmail',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, record: any) => {

                const tagMap : any = {
                    'pending': 'default',
                    'in-progress': 'yellow',
                    'sent': 'green',
                    'complete': 'green',
                    'active': 'blue',
                    'scheduled': 'yellow',
                    'error': 'red',
                }

                return (
                    <Tag color={tagMap[record?.status?.title]}>
                        {record?.status?.title}
                    </Tag>
                )
            },
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
                    <a onClick={() => viewEmailDetails(record)}>Details</a>
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

                    <div className='dbi-card'>
                        <div className='dbic-top'>
                            <div className='dbic-top-l'>
                                <div className='dbic-top-hero'>
                                    <span className='dbic-top-hero-text'>
                                        {userEmailCampaigns?.length}
                                    </span>
                                </div>
                                <div className='dbic-top-sub'>
                                    <span className='dbic-top-sub-text'>
                                        Total Email Campaigns
                                    </span>
                                </div>
                            </div>
                            <div className='dbic-top-r'>
                                <div className='dbic-r-container'>
                                    <MailOutlined
                                        className='dbic-r-logo'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='dbic-bottom'>
                            <div className='dbic-b-l'>
                                <span className='dbic-b-l-text'>
                                    See More
                                </span>
                            </div>
                            <div className='dbic-b-r'>
                                <div className='dbic-b-r-chip'>
                                    <RightOutlined
                                        className='dbic-b-r-ar'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='dbi-card'>
                        <div className='dbic-top'>
                            <div className='dbic-top-l'>
                                <div className='dbic-top-hero'>
                                    <span className='dbic-top-hero-text'>
                                        124,031
                                    </span>
                                </div>
                                <div className='dbic-top-sub'>
                                    <span className='dbic-top-sub-text'>
                                        Total Emails Sent
                                    </span>
                                </div>
                            </div>
                            <div className='dbic-top-r'>
                                <div className='dbic-r-container'>
                                    <SendOutlined
                                        className='dbic-r-logo'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='dbic-bottom'>
                            <div className='dbic-b-l'>
                                <span className='dbic-b-l-text'>
                                    See More
                                </span>
                            </div>
                            <div className='dbic-b-r'>
                                <div className='dbic-b-r-chip'>
                                    <RightOutlined
                                        className='dbic-b-r-ar'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='dbi-card'>
                        <div className='dbic-top'>
                            <div className='dbic-top-l'>
                                <div className='dbic-top-hero'>
                                    <span className='dbic-top-hero-text'>
                                        18,213
                                    </span>
                                </div>
                                <div className='dbic-top-sub'>
                                    <span className='dbic-top-sub-text'>
                                        Contacts Accessible Via Email
                                    </span>
                                </div>
                            </div>
                            <div className='dbic-top-r'>
                                <div className='dbic-r-container'>
                                    <UserOutlined
                                        className='dbic-r-logo'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='dbic-bottom'>
                            <div className='dbic-b-l'>
                                <span className='dbic-b-l-text'>
                                    See More
                                </span>
                            </div>
                            <div className='dbic-b-r'>
                                <div className='dbic-b-r-chip'>
                                    <RightOutlined
                                        className='dbic-b-r-ar'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='data-bar-info-card'>
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
                                    {userEmailCampaigns?.length}
                                </span>
                            </div>
                        </div>
                    </div> */}


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

            <Modal
                open={isDetailsModalOpen}
                onCancel={() => setIsDetailsModalOpen(false)}
                width={750}
                wrapClassName="no-padding-modal"
                footer={null}
                //height={500}
            >
                <EmailDetails
                    emailData={selectedDetails}
                />
            </Modal>

        </div>
    )
}