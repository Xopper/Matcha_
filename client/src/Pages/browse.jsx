import React, { useState, useEffect, useContext } from 'react';
import RangeSlider from '../assets/rangSlider';
import Rate from '../assets/controlledRating';
import HalfRating from '../assets/profileRating';
import { AuthContexts } from '../Contexts/authContext';
import _ from 'lodash';
import axios from 'axios';
import { getAge, computeDistance, capitalizeFirstLetter, getCommonElms } from '../helpers/helpers';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const sortUsers = (users, sortBy = 'age') => {
	const sortingOrder = sortBy === 'age' || sortBy === 'distance' ? 'asc' : 'desc';
	const sortedUsers = _.orderBy(users, sortBy, sortingOrder);
	return sortedUsers;
};

async function getLoggedData(token) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	// console.log(token);
	const response = await instance.get('http://localhost:5000/browsedata/getBrowseLogedData');
	return response;
}

async function getData(token) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	// console.log(token);
	const response = await instance.get('http://localhost:5000/filter/sex_prefs');
	return response;
}

function Browse() {
	const maxAge = 70;
	const maxDistance = 120;
	const maxRate = 5;

	const [loggedUser, setLoggedUser] = useState({
		lat: null,
		lng: null,
		tags: []
	});

	const [filterByAge, setFilterByAge] = useState([18, 30]); // initial values will be the suggestion rage in every filter
	const [filterByDistance, setFilterByDistance] = useState([0, 120]); // same
	const [filterByTags, setFilterByTags] = useState([3, 5]); // same
	const [filterByFameRating, setFilterByFameRating] = useState(4); // same []

	const [users, setUsers] = useState({
		isSorted: false,
		sortBy: 'age',
		data: []
	});

	const { auth } = useContext(AuthContexts);
	const { token } = auth;

	const handleSortSpecChange = ({ target: { value: sortBy } }) => {
		setUsers(users => ({ ...users, sortBy, isSorted: false }));
	};

	/**
	 * get logged user Data
	 */
	useEffect(() => {
		const userData = async () => {
			if (token) {
				const res = await getLoggedData(token);
				console.log(res);
				const { data } = res;
				if (data.status === 0) {
					console.log(data.tags);
					setLoggedUser(oldVals => ({
						...oldVals,
						lat: data.localisation.latitude,
						lng: data.localisation.longitude,
						tags: data.tags
					}));
				}
			}
		};
		userData();
		console.log('TIMES');
	}, [token]);

	/**
	 * Get all qualified users
	 */
	useEffect(() => {
		const data = async () => {
			if (token) {
				const { data } = await getData(token);
				if (data.status === 0) {
					// console.log(data.filtredUsers);
					const cleanData = data.filtredUsers.map(elm => {
						const newElm = {};
						newElm.username = elm.user_name; // for the url
						newElm.avatar = elm.profile_img; // for the user profile img
						newElm.distance = parseInt(
							computeDistance([loggedUser.lat, loggedUser.lng], [elm.latitude, elm.longitude])
						); // for the sort
						newElm.fullName = capitalizeFirstLetter(`${elm.last_name} ${elm.first_name}`); // for the user Card
						newElm.age = getAge(elm.birthdate); // for the sort && user card
						newElm.rate = elm.public_famerating.toFixed(1); // for the sort and user card
						newElm.commonTags =
							elm.allTags && elm.allTags.length
								? getCommonElms(loggedUser.tags, elm.allTags.split('|'))
								: 4;
						return newElm;
					});
					const sortedData = sortUsers(cleanData);
					setUsers(oldVals => ({
						...oldVals,
						data: sortedData
					}));
				}
			}
		};

		data();
		// setUsers(users => ({ ...users, data: usersList }));
	}, [token, loggedUser.lat, loggedUser.lng, loggedUser.tags]);

	useEffect(() => {
		if (!users.isSorted && users.data.length) {
			setUsers(users => {
				const sortedUsers = sortUsers(users.data, users.sortBy);
				return { ...users, data: sortedUsers, isSorted: true };
			});
		}
	}, [users]);

	if (!token) return null;
	return (
		<div className='browse__container'>
			<div className='browse__wrapper'>
				<div className='browse__content'>
					<div className='browse__search'>
						<div className='search__specs'>
							<p>Fame Rating.</p>
							<Rate value={filterByFameRating} setValue={setFilterByFameRating} />
						</div>
						<div className='search__specs'>
							<p>Age.</p>
							<RangeSlider minRange={18} maxRange={70} value={filterByAge} setValue={setFilterByAge} />
						</div>
						<div className='search__specs'>
							<p>Location (KM).</p>
							<RangeSlider
								minRange={0}
								maxRange={120}
								value={filterByDistance}
								setValue={setFilterByDistance}
							/>
						</div>
						<div className='search__specs'>
							<p>Common Instersts tags.</p>
							<RangeSlider minRange={0} maxRange={5} value={filterByTags} setValue={setFilterByTags} />
						</div>
					</div>
					<div className='sort__specs'>
						<div className='sort__box'>
							<input
								type='radio'
								id='age'
								name='sortHandler'
								value='age'
								onChange={handleSortSpecChange}
								checked={users.sortBy === 'age'}
							/>
							<label htmlFor='age' className='clickable'>
								<strong>Age.</strong>
							</label>
						</div>
						<div className='sort__box'>
							<input
								type='radio'
								id='distance'
								name='sortHandler'
								value='distance'
								onChange={handleSortSpecChange}
								checked={users.sortBy === 'distance'}
							/>
							<label htmlFor='distance' className='clickable'>
								<strong>Location.</strong>
							</label>
						</div>
						<div className='sort__box'>
							<input
								type='radio'
								id='rate'
								name='sortHandler'
								value='rate'
								onChange={handleSortSpecChange}
								checked={users.sortBy === 'rate'}
							/>
							<label htmlFor='rate' className='clickable'>
								<strong>Fame Rating.</strong>
							</label>
						</div>
						<div className='sort__box'>
							<input
								type='radio'
								id='commonTags'
								name='sortHandler'
								value='commonTags'
								onChange={handleSortSpecChange}
								checked={users.sortBy === 'commonTags'}
							/>
							<label htmlFor='commonTags' className='clickable'>
								<strong>Common Tags.</strong>
							</label>
						</div>
					</div>
				</div>
				<div className='profiles'>
					{/**Profile Card */}
					{users.data
						?.filter(
							ppl =>
								ppl.age >= filterByAge[0] &&
								(filterByAge[1] === maxAge || ppl.age < filterByAge[1]) &&
								ppl.distance >= filterByDistance[0] &&
								((filterByDistance[1] === maxDistance && ppl.distance < 5000) ||
									ppl.distance < filterByDistance[1]) &&
								ppl.commonTags >= filterByTags[0] &&
								ppl.commonTags <= filterByTags[1] &&
								(filterByFameRating === maxRate || ppl.rate < filterByFameRating)
						)
						.map((usr, index) => (
							<div className='profile__card' key={index}>
								<div className='profile__img'>
									<Link to={`/u/${usr.username}`} key={index}>
										<img src={usr.avatar} alt='pic' />
									</Link>
								</div>
								<div className='profile__info'>
									<div>
										<span className='first__profile--info'>
											{usr.fullName}, {usr.age}
										</span>
									</div>
									{/* <div> */}
									<HalfRating fameRating={usr.rate} />
									{/* </div> */}
									<div>
										<span className='last__profile--info'>{usr.distance} (KM)</span>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default Browse;
