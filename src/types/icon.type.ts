import {HTMLAttributes} from 'react';

export interface IconProps extends HTMLAttributes<SVGElement> {
	/**
	 * The size of the icon, either as a CSS size value or a number of pixels
	 */
	size?: string | number;
	/**
	 * The color to fill the icon with, as a CSS color value
	 */
	fill?: string;
}
