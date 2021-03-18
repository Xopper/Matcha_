import React, { useState, useEffect, useContext } from 'react';
import RangeSlider from '../assets/rangSlider';
import Rate from '../assets/controlledRating';
import HalfRating from '../assets/profileRating';
import { AuthContexts } from '../Contexts/authContext';
import _ from 'lodash';
import axios from 'axios';

const sortUsers = (users, sortBy) => {
	const sortingOrder = sortBy === 'age' || sortBy === 'location' ? 'asc' : 'desc';
	const sortedUsers = _.orderBy(users, sortBy, sortingOrder);
	return sortedUsers;
};

async function getData(token) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	console.log(token);
	const response = await instance.get('http://localhost:5000/filter/sex_prefs');
	return response;
}

function Browse() {
	const maxAge = 70;
	const maxLocation = 120;
	const maxRate = 5;

	const [filterByAge, setFilterByAge] = useState([18, 70]); // initial values will be the suggestion rage in every filter
	const [filterByLocation, setFilterByLocation] = useState([0, 60]); // same
	const [filterByTags, setFilterByTags] = useState([3, 5]); // same
	const [filterByFameRating, setFilterByFameRating] = useState(5); // same []
	const [users, setUsers] = useState({
		isSorted: false,
		sortBy: 'age',
		data: []
	});

	const { auth } = useContext(AuthContexts);
	const { token } = auth;
	console.log(auth);
	// const myData = {A
	// 	age: 36,
	// 	location: 60,
	// 	fameRating: 4.3,
	// 	commonTags: 4
	// };

	const handleSortSpecChange = ({ target: { value: sortBy } }) => {
		setUsers(users => ({ ...users, sortBy, isSorted: false }));
	};

	useEffect(() => {
		const data = async () => {
			if (token) {
				const res = await getData(token);
				console.log(res);
			}
		};

		data();

		const usersList = [
			{
				username: 'ahaloua',
				age: 80,
				location: 53,
				fameRating: 4.3,
				commonTags: 2
			},
			{
				username: 'tach',
				age: 20,
				location: 42,
				fameRating: 14,
				commonTags: 4
			},
			{
				username: 'abdox',
				age: 22,
				location: 190,
				fameRating: 4.3,
				commonTags: 3
			},
			{
				username: 'sharmota',
				age: 24,
				location: 60,
				fameRating: 1.3,
				commonTags: 2
			},
			{
				username: 'hassan',
				age: 25,
				location: 70,
				fameRating: 3.3,
				commonTags: 2
			},
			{
				username: 'tiraban',
				age: 29,
				location: 60,
				fameRating: 2.3,
				commonTags: 4
			}
		];
		setUsers(users => ({ ...users, data: usersList }));
	}, [token]);

	useEffect(() => {
		if (!users.isSorted && users.data.length) {
			setUsers(users => {
				const sortedUsers = sortUsers(users.data, users.sortBy);
				return { ...users, data: sortedUsers, isSorted: true };
			});
		}
	}, [users]);

	// console.log(users.isSorted);
	const fakeDate = {
		img:
			'data:image/png;base64,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'
	};
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
								value={filterByLocation}
								setValue={setFilterByLocation}
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
								id='location'
								name='sortHandler'
								value='location'
								onChange={handleSortSpecChange}
								checked={users.sortBy === 'location'}
							/>
							<label htmlFor='location' className='clickable'>
								<strong>Location.</strong>
							</label>
						</div>
						<div className='sort__box'>
							<input
								type='radio'
								id='fameRating'
								name='sortHandler'
								value='fameRating'
								onChange={handleSortSpecChange}
								checked={users.sortBy === 'fameRating'}
							/>
							<label htmlFor='fameRating' className='clickable'>
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
								ppl.location >= filterByLocation[0] &&
								(filterByLocation[1] === maxLocation || ppl.location < filterByLocation[1]) &&
								ppl.commonTags >= filterByTags[0] &&
								ppl.commonTags <= filterByTags[1] &&
								(filterByFameRating === maxRate || ppl.fameRating < filterByFameRating)
						)
						.map((usr, index) => (
							<div className='profile__card' key={index}>
								<div className='profile__img'>
									<img src={fakeDate.img} alt='pic' />
								</div>
								<div className='profile__info'>
									<div>
										<span className='first__profile--info'>
											{usr.username}, {usr.age}
										</span>
									</div>
									{/* <div> */}
									<HalfRating fameRating={usr.fameRating} />
									{/* </div> */}
									<div>
										<span className='last__profile--info'>{usr.location} (KM)</span>
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
