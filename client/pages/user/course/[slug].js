import React, { useState, useEffect, createElement, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import UserRoute from '../../../components/routes/UserRoute'
import { Button, Menu, Avatar } from 'antd'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from '@ant-design/icons'

const { Item } = Menu

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1)
  const [collapsed, setCollapsed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState({ lessons: [] })
  const [completedLessons, setCompletedLessons] = useState([])
  // force state update
  const [updateState, setUpdateState] = useState(false)

  // router
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    if (slug) loadCourse()
  }, [slug])

  useEffect(() => {
    window.localStorage.removeItem('stripe-success-id')
    if (course) loadCompletedLessons()
  }, [course])

  const loadCourse = async () => {
    const { data } = await axios.get(
      `/api/user/course/${slug}`,
    )
    setCourse(data)
  }

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(
      `/api/list-completed`,
      {
        courseId: course._id,
      },
    )
    console.log('COMPLETED LESSONS => ', data)
    setCompletedLessons(data)
  }

  const markCompleted = async () => {
    const { data } = await axios.post(
      `/api/mark-completed`,
      {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      },
    )
    console.log(data)
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id])
  }

  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(
        `/api/mark-incomplete`,
        {
          courseId: course._id,
          lessonId: course.lessons[clicked]._id,
        },
      )
      console.log(data)
      const all = completedLessons
      console.log('ALL => ', all)
      const index = all.indexOf(course.lessons[clicked]._id)
      if (index > -1) {
        all.splice(index, 1)
        console.log('ALL WITHOUT REMOVED => ', all)
        setCompletedLessons(all)
        setUpdateState(!updateState)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <UserRoute>
      <div className="row pb-5">
        <div
          style={{
            maxWidth: '700px',
            paddingLeft: '50px',
            paddingRight: '50px',
          }}
        >
          <Button
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary mt-1 btn-block mb-2"
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{' '}
            {!collapsed && 'Lessons'}
          </Button>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{
              overflowX: 'hidden',
              overflowY: 'visible',
              height: '300px',
            }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                onClick={() => setClicked(index)}
                key={index}
                icon={<Avatar>{index + 1}</Avatar>}
              >
                {lesson.title.substring(0, 30)}{' '}
                {completedLessons.includes(lesson._id) ? (
                  <CheckCircleFilled
                    className="float-right text-success ml-2"
                    style={{ marginTop: '13px', fontSize: '20px' }}
                  />
                ) : (
                  <MinusCircleFilled
                    className="float-right text-danger ml-2"
                    style={{ marginTop: '13px', fontSize: '20px' }}
                  />
                )}
              </Item>
            ))}
          </Menu>
        </div>

        <div className="col">
          {clicked !== -1 ? (
            <>
              <div>
                <div
                  className="col alert square mt-5 pb-5"
                  style={{ margin: '10px' }}
                >
                  {completedLessons.includes(course.lessons[clicked]._id) ? (
                    <button
                      className="btn btn-danger float-right pointer -mt-2"
                      onClick={markIncompleted}
                    >
                      Mark as incomplete
                    </button>
                  ) : (
                    <button
                      className="btn btn-success float-right pointer -mt-2"
                      onClick={markCompleted}
                    >
                      Mark as completed
                    </button>
                  )}
                </div>
              </div>

              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div className="wrapper">
                      <ReactPlayer
                        className="player"
                        url={course.lessons[clicked].video.Location}
                        width="100%"
                        config={{
                          file: {
                            attributes: { controlsList: 'nodownload' },
                          },
                        }}
                        height="100%"
                        controls
                        onEnded={() => markCompleted()}
                      />
                    </div>
                  </>
                )}

              <ReactMarkdown
                source={course.lessons[clicked].content}
                className="single-post"
              />
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="text-primary display-1 p-5" />
                <p className="lead">Click on the lessons to start learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </UserRoute>
  )
}

export default SingleCourse
