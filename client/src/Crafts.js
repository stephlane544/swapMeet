import React from "react";
import { withServices } from './ServiceProvider';

class Crafts extends React.Component {
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
		const filteredCrafts = this.state.users.filter(user => {
			for(let k in user) {
				if(user[k].toString().toLowerCase().search("crafts") === 0) {
					return true
				}
			}
			return filteredCrafts
		})
		if(filteredCrafts.length > 0) {
			this.setState({
				filteredUsers: filteredCrafts
			}) 
		} else {
			this.setState({
				message: true
			})
		}
	}

	render() {
			return (
				<div className="craftsBody">
					<div className='craftsTitleContainer'>
						<div className="serviceTitle">crafts</div>
					</div>
					<div className="serviceContainer">
						{this.state.filteredUsers ?
							this.state.filteredUsers.map((result, i) => 
							<div  className="serviceCard" onClick={() => {this.toProfile(result._id)}} key={i}>
								<div className="serviceCard" onClick={() => {this.toProfile(result._id)}} key={i}></div>
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

export default withServices(Crafts);




