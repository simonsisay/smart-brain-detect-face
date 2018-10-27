import React from 'react'

const FaceRecognition = ({link, box}) => {
	return (
		<div className="center ma image-detect">
		 <div className="absolute mt2">
			<img id="inputImage" src = {link}  height="auto"/>
		 	<div 
			 	className="bounding-box" 
			 	style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol }}>
		 	</div>
		 </div>
		</div>
	)
}

export default FaceRecognition