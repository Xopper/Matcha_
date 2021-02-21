import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

//[TODO] filter if not existthen add it

function TagsInput({ tagsGroup: getTagsGroup }) {
	const [ tags, setTags ] = useState([ 'tach', 'de blede' ]);
	function addTag(e) {
		const { value: tag } = e.target;
		if (tag.trim() !== '' && tag.trim().length <= 20) {
			e.target.value = '';
			setTags([ ...tags, tag.trim() ]);
			getTagsGroup([ ...tags, tag ]);
		}
		return;
	}
	function delTag(index) {
		setTags(tags.filter((val, i) => i !== index));
		getTagsGroup(tags.filter((val, i) => i !== index));
	}
	return (
		<div className="tagsContainer">
			<ul>
				{tags.map((tag, index) => (
					<li key={index}>
						<span>{tag} </span>
						<FontAwesomeIcon icon={faTimesCircle} className="clickable" onClick={() => delTag(index)} />
					</li>
				))}
			</ul>
			<input
				type="text"
				placeholder="Press enter to add tags"
				onKeyPress={(e) => {
					e.key === 'Enter' && e.preventDefault();
					e.key === 'Enter' && addTag(e);
				}}
			/>
		</div>
	);
}

export default TagsInput;
