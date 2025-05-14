import { initialState, feedProfileSlice } from '@services/feed-profile/reducer';
import {
	onMessageProfile,
	onOpenProfile,
} from '@services/feed-profile/actions';

const testSocketData = {
	success: true,
	orders: [
		{
			ingredients: ['60d3463f7034a000269f45e9', '60d3463f7034a000269f45e7'],
			_id: '',
			status: 'done',
			number: 1,
			createdAt: '2021-06-23T20:11:01.403Z',
			updatedAt: '2021-06-23T20:11:01.406Z',
		},
		{
			ingredients: ['60d3463f7034a000269f45e9'],
			_id: '',
			status: 'done',
			number: 3,
			createdAt: '2021-06-23T20:13:23.654Z',
			updatedAt: '2021-06-23T20:13:23.657Z',
		},
	],
	total: 2,
	totalToday: 2,
};
describe('feedProfile reducer', () => {
	it('should return the initial state', () => {
		expect(feedProfileSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('should be online', () => {
		expect(
			feedProfileSlice.reducer(undefined, {
				type: onOpenProfile.type,
				payload: '',
			})
		).toEqual({
			...initialState,
			status: 'ONLINE',
		});
	});

	it('should get messages', () => {
		expect(
			feedProfileSlice.reducer(undefined, {
				type: onMessageProfile.type,
				payload: testSocketData,
			})
		).toEqual({
			...initialState,
			orders: testSocketData.orders,
		});
	});
});
