import React, { useContext } from 'react'
import { Context } from '../../context'
import Link from 'next/link'
import { useRouter } from 'next/router'

const TopInstructors = ({ course }) => {
  const {
    state: { user },
  } = useContext(Context)
  const { pathname } = useRouter()

  return (
    <div>
      {course && (
        <div className="feature-course-section">
          <div className="container">
            <div className="feature-course-wrap">
              {pathname !== '/' ? null : (
                <div className="section-title">
                  <h2>Our top instructor</h2>
                </div>
              )}
              <div className="course-item-5-grid">
                <div className="course-item-5">
                  <div className="course-item-5-card">
                    <Link href="/instructor/profile">
                      <a className="course-item-5-card-img team-thumb">
                        <img src="/images/team1.png" alt="" />
                      </a>
                    </Link>
                    <div className="course-item-data">
                      <h5>Devon Lane</h5>
                      <p>Senior Developer</p>
                    </div>
                    <div className="course-item-5-card-footer">
                      <p className="course-item-5-card-footer-review align-self-center">
                        <svg
                          width="14"
                          height="13"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.27569 10.9208L10.4279 12.9179C10.8308 13.1732 11.3311 12.7935 11.2115 12.3232L10.3008 8.74052C10.2752 8.64073 10.2782 8.53573 10.3096 8.4376C10.3409 8.33946 10.3994 8.25218 10.4781 8.18577L13.3049 5.83306C13.6763 5.52392 13.4846 4.90751 13.0074 4.87654L9.31588 4.63696C9.21645 4.62986 9.12109 4.59465 9.04089 4.53545C8.96069 4.47625 8.89896 4.39548 8.86289 4.30255L7.48612 0.835486C7.44869 0.736852 7.38215 0.651935 7.29532 0.592013C7.2085 0.532092 7.1055 0.5 7 0.5C6.89451 0.5 6.79151 0.532092 6.70468 0.592013C6.61786 0.651935 6.55131 0.736852 6.51389 0.835486L5.13712 4.30255C5.10104 4.39548 5.03932 4.47625 4.95912 4.53545C4.87892 4.59465 4.78355 4.62986 4.68412 4.63696L0.992627 4.87654C0.515435 4.90751 0.323731 5.52392 0.695149 5.83306L3.52186 8.18577C3.60063 8.25218 3.65907 8.33946 3.69044 8.4376C3.72181 8.53573 3.72485 8.64073 3.6992 8.74052L2.85459 12.063C2.71111 12.6274 3.31143 13.083 3.79495 12.7767L6.72431 10.9208C6.8067 10.8683 6.90234 10.8405 7 10.8405C7.09767 10.8405 7.19331 10.8683 7.27569 10.9208Z"
                            fill="#FD8E1F"
                          />
                        </svg>
                        5.0
                      </p>
                      <p className="course-item-5-card-footer-student">
                        265.7K <span>students</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="icon-bottom-btn mt-4">
                <p>
                  Thousands of students waiting for a instructor. Start teaching
                  & earning now!.
                  {user !== null ? (
                    <Link href="/user/become-instructor">
                      Become Instructor
                    </Link>
                  ) : (
                    <Link href="/how-to-become-instructor">
                      Become Instructor
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopInstructors
