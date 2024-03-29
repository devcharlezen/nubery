import { Button, Progress, Tooltip } from 'antd'
import { useEffect } from 'react'
import { CloseCircleFilled, CloseCircleOutlined } from '@ant-design/icons'

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          autoFocus
          required
        />

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        ></textarea>

          {values.video.Location && (
            <div className="pt-2 d-flex justify-content-center">
              <video controls width="100%" controlsList="nodownload" preload="metadata">
                <source src={values.video.Location} type="video/webm" />
                <track
                  label="English"
                  kind="subtitles"
                  srclang="en"
                  src="captions/vtt/sintel-en.vtt"
                  default />
              </video>
            </div>
          )}

        <div className="d-flex justify-content-center">
          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>


          {!uploading && values.video.Location && (
            <Tooltip title="Remove">
              <span onClick={handleVideoRemove} className="pt-1 pl-3 ">
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}

        <button
          onClick={handleAddLesson}
          className="col mt-3
          text-white  focus:ring-4 
          focus:outline-none focus:ring-brightRedLight font-medium 
          rounded-lg text-sm  px-5 py-2.5 mr-1 text-center 
          items-end dark:bg-brightRed dark:hover:bg-brightRedLight 
          dark:focus:ring-brightRed
          "
          size="large"
          loading={uploading}
          shape="round"
        >
          {uploading ? 'Uploading....' : 'Save'}
        </button>
      </form>
    </div>
  )
}

export default AddLessonForm
