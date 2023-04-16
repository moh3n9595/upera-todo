import {memo} from 'react';

import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import {ComputeItemKey, ItemContent, Virtuoso} from 'react-virtuoso';

import {ErrorState} from './ErrorState.common';
import {Loading} from './Loading.common';
import {NotFound} from './NotFound.common';

/**
 * Defines the props for a generic list component that displays a collection of items.
 * @template T - The type of the items in the collection.
 * @property {Parameters<typeof useQuery<AxiosResponse<T[]>>} queryProps - The parameters for the query that retrieves the data to be displayed.
 * @property {ItemContent<T, unknown>} renderItem - The function that renders the content of each item in the list.
 * @property {ComputeItemKey<T, unknown>} [computeItemKey] - An optional function that computes a unique key for each item in the list. This is used by the Virtuoso component to optimize the rendering of large lists.
 */
export interface ListProps<T> {
	queryProps: Parameters<typeof useQuery<AxiosResponse<T[]>>>;
	renderItem: ItemContent<T, unknown>;
	computeItemKey?: ComputeItemKey<T, unknown>;
}

/**
 * A generic list component that displays a collection of items.
 * @template T - The type of the items in the collection.
 * @param {ListProps<T>} param0 - The props for the list component.
 * @returns {JSX.Element} - The list component.
 */
function List<T>({queryProps, renderItem, computeItemKey}: ListProps<T>) {
	const {isLoading, isRefetching, isError, data, refetch} = useQuery(...queryProps);

	return (
		<>
			{(isLoading || (isRefetching && isError)) && !data?.data.length && <Loading className='my-4' />}
			{!isLoading && !isError && !data?.data.length && <NotFound />}
			{data?.data.length && (
				<Virtuoso useWindowScroll data={data?.data} itemContent={renderItem} computeItemKey={computeItemKey} />
			)}
			{isError && !isRefetching && <ErrorState tryAgain={refetch} />}
		</>
	);
}

const MemoizedList = memo(List) as typeof List;
export {MemoizedList as List};
