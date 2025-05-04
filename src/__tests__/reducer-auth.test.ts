import { initialState, userSlice } from '@services/auth/reducer';
import { TAuthData, TUser } from '@utils/types';
import { login } from '@services/auth/action';

const email = '123@mail.ru';
const name = 'name';

const testAuthData: TAuthData = {
	success: true,
	user: {
		email: email,
		name: name,
	},
	accessToken: 'Bearer ...',
	refreshToken: '',
};

const testUser: TUser = {
	email: email,
	name: name,
};

describe('reducer auth', () => {
	it('should return initial state', () => {
		expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should set user', () => {
		const action = userSlice.actions.setUser(testAuthData);
		expect(userSlice.reducer(undefined, action)).toEqual({
			...initialState,
			user: testUser,
		});
	});

	it('should login user', () => {
		const prevState = {
			...initialState,
			loading: true,
		};
		expect(
			userSlice.reducer(prevState, {
				type: login.fulfilled.type,
				payload: testAuthData,
			})
		).toEqual({
			...initialState,
			user: testUser,
			isAuthChecked: true,
		});
	});
});
