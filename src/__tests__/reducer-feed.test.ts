import { initialState, feedSlice } from '@services/feed/reducer';
import { onMessage, onOpen } from '@services/feed/actions';

const testSocketData = {
	success: true,
	orders: [
		{
			ingredients: [
				'60d3463f7034a000269f45e7',
				'60d3463f7034a000269f45e9',
				'60d3463f7034a000269f45e8',
				'60d3463f7034a000269f45ea',
			],
			_id: '',
			status: 'done',
			number: 0,
			createdAt: '2021-06-23T14:43:22.587Z',
			updatedAt: '2021-06-23T14:43:22.603Z',
		},
	],
	total: 1,
	totalToday: 1,
};
describe('feed reducer', () => {
	it('should return the initial state', () => {
		expect(feedSlice.reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should be online', () => {
		expect(
			feedSlice.reducer(undefined, { type: onOpen.type, payload: '' })
		).toEqual({
			...initialState,
			status: 'ONLINE',
		});
	});

	it('should get messages', () => {
		expect(
			feedSlice.reducer(undefined, {
				type: onMessage.type,
				payload: testSocketData,
			})
		).toEqual({
			...initialState,
			orders: testSocketData.orders,
			total: testSocketData.total,
			totalToday: testSocketData.totalToday,
		});
	});
});
