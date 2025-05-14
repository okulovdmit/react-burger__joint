import './commands';
declare global {
	namespace Cypress {
		interface Chainable {
			ingredients(): void;
			login(): void;
			order(): void;
		}
	}
}
