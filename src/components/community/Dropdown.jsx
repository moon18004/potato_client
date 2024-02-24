import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Dropdown({children, visibility}) {
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);
  const [repeat, setRepeat] = useState(null);
	useEffect(() => {
		if (visibility) {
				clearTimeout(repeat);
				setRepeat(null);
				setVisibilityAnimation(true);
		} else {
				setRepeat(setTimeout(() => {
						setVisibilityAnimation(false);
				}, 100));
		}
}, [visibility]);
  return (
		<article className={`components-dropdown ${visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}`}>
				{ visibilityAnimation && children }
		</article>
)
}
