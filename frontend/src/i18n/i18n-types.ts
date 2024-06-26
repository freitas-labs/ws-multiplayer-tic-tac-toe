// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n';

export type BaseTranslation = BaseTranslationType;
export type BaseLocale = 'en';

export type Locales = 'en' | 'pt';

export type Translation = RootTranslation;

export type Translations = RootTranslation;

type RootTranslation = {
	todoList: {
		/**
		 * N​o​t​h​i​n​g​ ​h​e​r​e​ ​y​e​t​!​ ​W​h​a​t​'​s​ ​o​n​ ​y​o​u​r​ ​m​i​n​d​?
		 */
		empty: string;
		/**
		 * N​e​w​ ​t​o​d​o​.​.​.
		 */
		new: string;
		/**
		 * D​e​l​e​t​e​ ​a​s​d​f
		 */
		delete: string;
		/**
		 * U​p​d​a​t​e​d
		 */
		updated: string;
		alerts: {
			updateFailure: {
				/**
				 * U​p​d​a​t​e​ ​f​a​i​l​u​r​e
				 */
				title: string;
				/**
				 * C​o​u​l​d​n​'​t​ ​u​p​d​a​t​e​ ​t​h​e​ ​l​a​s​t​ ​t​o​d​o
				 */
				message: string;
			};
		};
	};
	asdf: {
		/**
		 * Y​o​u​ ​h​a​v​e​ ​f​o​u​n​d​ ​o​u​t​ ​a​ ​s​e​c​r​e​t​ ​p​a​g​e​.​.​.
		 */
		title: string;
		/**
		 * T​h​e​r​e​ ​i​s​n​'​t​ ​a​n​y​ ​c​o​o​l​ ​h​e​r​e​,​ ​b​u​t​ ​y​o​u​ ​c​a​n​ ​s​t​a​r​ ​t​h​i​s​ ​p​r​o​j​e​c​t​ ​o​n​ ​G​i​t​H​u​b​.​.​.​ ​I​t​ ​h​e​l​p​s​ ​a​ ​t​o​n​!
		 */
		description: string;
		actions: {
			/**
			 * A​b​s​o​l​u​t​e​l​y​!​ ​:​)
			 */
			visit: string;
		};
	};
};

export type TranslationFunctions = {
	todoList: {
		/**
		 * Nothing here yet! What's on your mind?
		 */
		empty: () => LocalizedString;
		/**
		 * New todo...
		 */
		new: () => LocalizedString;
		/**
		 * Delete asdf
		 */
		delete: () => LocalizedString;
		/**
		 * Updated
		 */
		updated: () => LocalizedString;
		alerts: {
			updateFailure: {
				/**
				 * Update failure
				 */
				title: () => LocalizedString;
				/**
				 * Couldn't update the last todo
				 */
				message: () => LocalizedString;
			};
		};
	};
	asdf: {
		/**
		 * You have found out a secret page...
		 */
		title: () => LocalizedString;
		/**
		 * There isn't any cool here, but you can star this project on GitHub... It helps a ton!
		 */
		description: () => LocalizedString;
		actions: {
			/**
			 * Absolutely! :)
			 */
			visit: () => LocalizedString;
		};
	};
};

export type Formatters = {};
