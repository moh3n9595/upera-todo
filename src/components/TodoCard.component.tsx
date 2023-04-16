import {memo, useEffect, useState} from 'react';

import {AxiosResponse} from 'axios';
import clsx from 'clsx';
import {AnimatePresence, motion} from 'framer-motion';
import {useMutation, useQueryClient} from 'react-query';

import {Completed, Confirm, Delete, Edit, UnCompleted} from '@upera/assets/icons';
import {Loading} from '@upera/common';
import {deleteTodo, patchTodo} from '@upera/services';
import {Todo} from '@upera/types';

/**
 * Props interface for TodoCard component.
 * @property {Todo} item - Todo item.
 */
export interface TodoCardProps {
	item: Todo;
}

/**
 * Renders a single todo card.
 * @param {TodoCardProps} param - Props object for TodoCard component.
 * @returns {JSX.Element} - TodoCard component's JSX.Element.
 */
function TodoCard({item}: TodoCardProps) {
	const [isEditMode, setIsEditMode] = useState(false);
	const queryClient = useQueryClient();
	const [title, setTitle] = useState(item.title);

	useEffect(() => {
		setTitle(item.title);
	}, [item.title]);

	const {mutate: deleteTodoMutate, isLoading: deleteTodoLoading} = useMutation({
		mutationFn: () => deleteTodo(item.id),
		onSuccess: () => {
			queryClient.setQueryData<AxiosResponse<Todo[]> | undefined>(['todos'], (data) => {
				if (!data) return data;
				return {...data, data: data?.data.filter((dataItem) => dataItem.id !== item.id)};
			});
		},
	});

	const {mutate: patchTextTodoMutate, isLoading: patchTextTodoLoading} = useMutation({
		mutationFn: () => patchTodo(item.id, {title}),
		onSuccess: (updatedItem) => {
			queryClient.setQueryData<AxiosResponse<Todo[]> | undefined>(['todos'], (data) => {
				if (!data) return data;
				return {
					...data,
					data: data?.data.map((dataItem) => (dataItem.id !== item.id ? dataItem : {...dataItem, ...updatedItem.data})),
				};
			});
			setIsEditMode(false);
		},
	});

	const {mutate: patchStatusTodoMutate, isLoading: patchStatusTodoLoading} = useMutation({
		mutationFn: (status: Todo['completed']) => patchTodo(item.id, {completed: status}),
		onSuccess: (updatedItem) => {
			queryClient.setQueryData<AxiosResponse<Todo[]> | undefined>(['todos'], (data) => {
				if (!data) return data;
				return {
					...data,
					data: data?.data.map((dataItem) => (dataItem.id !== item.id ? dataItem : {...dataItem, ...updatedItem.data})),
				};
			});
		},
	});

	return (
		<div className='py-1.5'>
			<div className='relative bg-white py-4 px-5 rounded text-black shadow-lg'>
				<div className={`absolute left-0 inset-y-0 w-1 ${item.completed ? 'bg-green-600' : 'bg-red-600'} rounded-l`} />
				<div className='flex items-center'>
					<AnimatePresence mode='wait'>
						{isEditMode ? (
							<motion.input
								key='input'
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								exit={{opacity: 0}}
								transition={{duration: 0.15}}
								className={clsx([
									'w-full focus-visible:outline-none focus-visible:border-orange border rounded px-2 py-1 me-2',
									patchTextTodoLoading && 'pointer-events-none opacity-70',
								])}
								autoFocus
								defaultValue={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						) : (
							<motion.p
								key='title'
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								exit={{opacity: 0}}
								transition={{duration: 0.15}}
								className='font-bold me-2'
							>{`#${item.id} - ${item.title}`}</motion.p>
						)}
					</AnimatePresence>

					<div className='ms-4 flex grow items-center justify-end gap-3'>
						<div
							className={clsx([
								'p-2 fill-gray-500 hover:fill-orange cursor-pointer transition-all',
								patchTextTodoLoading && 'pointer-events-none opacity-70',
							])}
							onClick={() => (isEditMode ? patchTextTodoMutate() : setIsEditMode(true))}
						>
							<AnimatePresence mode='wait'>
								{patchTextTodoLoading ? (
									<motion.span
										initial={{opacity: 0}}
										animate={{opacity: 1}}
										exit={{opacity: 0}}
										transition={{duration: 0.15}}
										key='loading'
									>
										<Loading size={20} />
									</motion.span>
								) : isEditMode ? (
									<motion.span
										initial={{opacity: 0}}
										animate={{opacity: 1}}
										exit={{opacity: 0}}
										transition={{duration: 0.15}}
										key='confirm'
									>
										<Confirm size={20} />
									</motion.span>
								) : (
									<motion.span
										initial={{opacity: 0}}
										animate={{opacity: 1}}
										exit={{opacity: 0}}
										transition={{duration: 0.15}}
										key='edit'
									>
										<Edit size={20} />
									</motion.span>
								)}
							</AnimatePresence>
						</div>
						<div
							className={clsx([
								'p-2 fill-gray-500 hover:fill-orange cursor-pointer transition-all',
								deleteTodoLoading && 'pointer-events-none opacity-70',
							])}
							onClick={() => deleteTodoMutate()}
						>
							<AnimatePresence mode='wait'>
								{deleteTodoLoading ? (
									<motion.span
										initial={{opacity: 0}}
										animate={{opacity: 1}}
										exit={{opacity: 0}}
										transition={{duration: 0.15}}
										key='loading'
									>
										<Loading size={20} />
									</motion.span>
								) : (
									<motion.span
										initial={{opacity: 0}}
										animate={{opacity: 1}}
										exit={{opacity: 0}}
										transition={{duration: 0.15}}
										key='delete'
									>
										<Delete size={20} />
									</motion.span>
								)}
							</AnimatePresence>
						</div>
						<div
							className={clsx([
								'p-2 fill-gray-500 hover:fill-orange cursor-pointer transition-all',
								patchStatusTodoLoading && 'pointer-events-none opacity-70',
							])}
							onClick={() => patchStatusTodoMutate(!item.completed)}
						>
							<AnimatePresence mode='wait'>
								{patchStatusTodoLoading ? (
									<motion.span
										initial={{opacity: 0}}
										animate={{opacity: 1}}
										exit={{opacity: 0}}
										transition={{duration: 0.15}}
										key='loading'
									>
										<Loading size={20} />
									</motion.span>
								) : item.completed ? (
									<motion.span
										initial={{opacity: 0}}
										animate={{opacity: 1}}
										exit={{opacity: 0}}
										transition={{duration: 0.15}}
									>
										<UnCompleted size={20} className='fill-red-600' />
									</motion.span>
								) : (
									<motion.span
										initial={{opacity: 0}}
										animate={{opacity: 1}}
										exit={{opacity: 0}}
										transition={{duration: 0.15}}
									>
										<Completed size={20} className='fill-green-600' />
									</motion.span>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const MemoizedTodoCard = memo(TodoCard);
export {MemoizedTodoCard as TodoCard};
