import {List} from '@upera/common';
import {TodoCard} from '@upera/components';
import {getTodos} from '@upera/services';
import {Page} from '@upera/types';

const Home: Page = () => {
	return (
		<section>
			<List
				queryProps={['todos', getTodos]}
				renderItem={(ـ, item) => <TodoCard item={item} />}
				computeItemKey={(_, item) => item.id.toString()}
			/>
		</section>
	);
};

Home.ns = 'home';
export default Home;
