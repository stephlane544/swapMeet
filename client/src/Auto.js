import React from "react";
import { withServices } from './ServiceProvider';
import "./ServiceComponents.css"

class Auto extends React.Component {
	constructor() {
		super()
		this.state = {
				message: false,
				filteredUsers: [],
				users: JSON.parse(localStorage.getItem('users')) || []
		}
	}
	
	toProfile = (_id) => {
		this.props.history.push(`/userprofile/${_id}`)
	}

	componentDidMount() {
		const filteredAuto = this.state.users.filter(user => {
			for(let k in user) {
				if(user[k].toString().toLowerCase().search("auto") === 0) {
					return true
				}
			}
			
			return filteredAuto
		})
		if(filteredAuto.length > 0) {
			this.setState({
				filteredUsers: filteredAuto
			}, () => { console.log(this.state.filteredUsers) }) 
		} else {
			this.setState({
				message: true
			}, () => { console.log(this.state.filteredUsers) })
		}
	}

	render() {
			return (
				<div className="autoBody">
					<div className='autoTitleContainer'>
						<div className="serviceTitle">auto</div>
					</div>
					<div className="serviceContainer">
						{this.state.filteredUsers ?
							this.state.filteredUsers.map((result, i) => 
							<div className="serviceCard" onClick={() => {this.toProfile(result._id)}} key={i}>
								<div className="serviceBisName">{result.businessName}</div>
								<div className="serviceSwapperName">{result.firstName} {result.lastName}</div>
								<div className="serviceService">{result.service}</div>
								<div className="serviceCost">${result.cost}</div>
								<div className="serviceLocation">{result.city}, {result.state}</div>
							</div>
							)
						:
							<div>no results</div>
						}
					</div>
				</div>
			)

	}
}

export default withServices(Auto);




