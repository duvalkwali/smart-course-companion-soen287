import { Link } from 'react-router-dom';

function CourseCard({ title, description, image }) {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
            <img src={image} alt={title} />
        </figure>

        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>

            <div className="card-actions justify-end">
            {/* <button className="btn btn-primary">Open</button> */}
            <Link className='btn btn-primary' to="/student/course">View Assessments</Link>

            </div>
        </div>
        </div>
    )
}

export default CourseCard