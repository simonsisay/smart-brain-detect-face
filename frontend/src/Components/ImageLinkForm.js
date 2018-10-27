import React,{Component} from 'react'
import './imageform.css'

const ImageLinkForm = ({handleChange, handleSubmit, input, detecting}) => {
	return (
		<div className="ma4 mt0">
			<p className = "f3">
				{`This magic brain will detect faces in your pictures. Give it a try`}
			</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-3">
					<input onChange={handleChange} value={input} type="text" name="input"  className="f4 pa2 w-70 center" />
					<button onClick={handleSubmit} className="pa5 tc center w-30 grow link ph3 pv2 white">Detect</button>
				</div>
			</div>
			{detecting ? <p>{detecting}</p> : ''}
		</div>

	)
}

export default ImageLinkForm