import './Month.css'

function Month({ month, year, onPreviousMonth, onNextMonth }) {
    return (
        <div className="MonthItems">
            <ul>
                <li>
                    <button className='PreviousMonth' onClick={onPreviousMonth}>
                        LEFT
                    </button>
                </li>
                <li>
                    {month} {year}
                </li>
                <li>
                    <button className='NextMonth' onClick={onNextMonth}>
                        RIGHT
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Month;