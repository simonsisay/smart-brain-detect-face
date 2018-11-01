import React from 'react'

const Rank = (props) => {
	return(
		<div>
			<div className="white f3">
				{`${props.user.name}, your current rank is...`}
			</div>
			<div className="white f1">
				{`#${props.rank}`}
			</div>
		</div>
	)
}

export default Rank